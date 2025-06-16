import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'src/posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author: string
  tags: string[]
  readingTime: string
  coverImage?: string
  fixedUrl?: string // Optional fixed URL for the post
  series?: {
    name: string
    order: number
    total: number
    prev: string | null
    next: string | null
  }
}

export interface LearningPath {
  name: string
  description: string
  posts: Post[]
  totalPosts: number
  estimatedTime: string
  tags: string[]
  latestUpdate: string
}

// Helper function to segregate posts into independent posts and series
export function segregatePosts(posts: Post[]): {
  independentPosts: Post[]
  seriesPosts: Post[]
  learningPaths: LearningPath[]
} {
  const independentPosts: Post[] = []
  const seriesPosts: Post[] = []
  const seriesMap = new Map<string, Post[]>()

  posts.forEach(post => {
    if (post.series) {
      // Only include the first part of a series in the main series listing
      // Series parts (order > 1) should only be accessible through navigation
      if (post.series.order === 1) {
        seriesPosts.push(post)
      }
      
      // Add all parts to the series map for learning path creation
      const seriesName = post.series.name
      if (!seriesMap.has(seriesName)) {
        seriesMap.set(seriesName, [])
      }
      seriesMap.get(seriesName)!.push(post)
    } else {
      independentPosts.push(post)
    }
  })

  // Create learning series from series
  const learningPaths: LearningPath[] = Array.from(seriesMap.entries()).map(([seriesName, seriesPosts]) => {
    // Sort posts by order
    const sortedPosts = seriesPosts.sort((a, b) => (a.series?.order || 0) - (b.series?.order || 0))
    
    // Calculate total estimated reading time
    const totalMinutes = sortedPosts.reduce((total, post) => {
      const minutes = parseInt(post.readingTime.split(' ')[0]) || 0
      return total + minutes
    }, 0)
    
    const estimatedTime = totalMinutes > 60 
      ? `${Math.round(totalMinutes / 60)} hours` 
      : `${totalMinutes} minutes`

    // Get all unique tags from series posts
    const allTags = new Set<string>()
    sortedPosts.forEach(post => post.tags.forEach(tag => allTags.add(tag)))

    // Get latest update date
    const latestUpdate = sortedPosts
      .map(post => new Date(post.date))
      .sort((a, b) => b.getTime() - a.getTime())[0]
      .toISOString()

    return {
      name: seriesName,
      description: sortedPosts[0]?.excerpt || '',
      posts: sortedPosts,
      totalPosts: sortedPosts.length,
      estimatedTime,
      tags: Array.from(allTags),
      latestUpdate
    }
  })

  return {
    independentPosts: independentPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    seriesPosts,
    learningPaths: learningPaths.sort((a, b) => new Date(b.latestUpdate).getTime() - new Date(a.latestUpdate).getTime())
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Posts directory does not exist:', postsDirectory)
      return []
    }

    const postDirs = fs.readdirSync(postsDirectory)
    const posts: Post[] = []

    for (const dir of postDirs) {
      const postPath = path.join(postsDirectory, dir)
      
      if (fs.statSync(postPath).isDirectory()) {
        // First, check for the main content.mdx file
        const metadataPath = path.join(postPath, 'metadata.ts')
        const contentPath = path.join(postPath, 'content.mdx')
        
        if (fs.existsSync(metadataPath) && fs.existsSync(contentPath)) {
          const mainPost = await processPost(dir, metadataPath, contentPath)
          if (mainPost) {
            posts.push(mainPost)
          }
        }
        
        // Then, scan for part-*.mdx files (series parts)
        const files = fs.readdirSync(postPath)
        const partFiles = files.filter(file => file.match(/^part-\d+\.mdx$/))
        
        for (const partFile of partFiles) {
          const partNumber = parseInt(partFile.match(/part-(\d+)\.mdx$/)?.[1] || '0')
          const partPath = path.join(postPath, partFile)
          const partSlug = `${dir}/part-${partNumber}`
          
          // Read the part file content
          const partContent = fs.readFileSync(partPath, 'utf8')
          
          // Extract metadata from the main metadata.ts file
          let seriesMetadata: any = {}
          if (fs.existsSync(metadataPath)) {
            try {
              const metadataContent = fs.readFileSync(metadataPath, 'utf8')
              const metadataMatch = metadataContent.match(/export const metadata = \{([\s\S]*)\}/)
              if (metadataMatch) {
                try {
                  const metadataString = `return {${metadataMatch[1]}}`
                  const parseFunction = new Function(metadataString)
                  seriesMetadata = parseFunction()
                } catch (funcError) {
                  console.warn(`Error parsing metadata for ${dir} part ${partNumber}:`, funcError)
                }
              }
            } catch (error) {
              console.warn(`Error reading metadata file for ${dir} part ${partNumber}:`, error)
            }
          }
          
          // Create series metadata for this part
          const partMetadata = {
            ...seriesMetadata,
            title: getPartTitle(partNumber - 1, seriesMetadata.series?.parts), // partNumber 2 -> index 1 for parts array
            series: seriesMetadata.series ? {
              ...seriesMetadata.series,
              order: partNumber, // part-2.mdx = order 2
              prev: partNumber === 2 ? `/posts/${dir}` : `/posts/${dir}/part-${partNumber - 1}`,
              next: partNumber < seriesMetadata.series?.total ? `/posts/${dir}/part-${partNumber + 1}` : null
            } : undefined
          }
          
          // Process markdown content
          const processedContent = await remark()
            .use(remarkGfm)
            .use(remarkHtml)
            .process(partContent)
          
          const partPost: Post = {
            slug: partSlug,
            title: partMetadata.title || `Part ${partNumber + 1}`,
            date: partMetadata.date || new Date().toISOString(),
            excerpt: partMetadata.excerpt || generateExcerpt(partContent),
            content: processedContent.toString(),
            author: partMetadata.author || 'Anonymous',
            tags: partMetadata.tags || [],
            readingTime: readingTime(partContent).text,
            coverImage: partMetadata.coverImage ? 
              partMetadata.coverImage.startsWith('./') ? 
                `/posts/${dir}/${partMetadata.coverImage.slice(2)}` : 
                partMetadata.coverImage : 
              undefined,
            series: partMetadata.series
          }
          
          posts.push(partPost)
        }
      }
    }

    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

// Helper function to process a single post
async function processPost(dir: string, metadataPath: string, contentPath: string): Promise<Post | null> {
  try {
    let data: any = {}
    
    // Read metadata
    try {
      const metadataContent = fs.readFileSync(metadataPath, 'utf8')
      const metadataMatch = metadataContent.match(/export const metadata = \{([\s\S]*)\}/)
      if (metadataMatch) {
        try {
          const metadataString = `return {${metadataMatch[1]}}`
          const parseFunction = new Function(metadataString)
          data = parseFunction()
        } catch (funcError) {
          console.warn(`Error parsing metadata for ${dir}:`, funcError)
          return null
        }
      }
    } catch (error) {
      console.warn(`Error reading metadata file for ${dir}:`, error)
      return null
    }
    
    // Read content
    const content = fs.readFileSync(contentPath, 'utf8')
    
    // Process markdown content
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(content)
    
    const post: Post = {
      slug: dir,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || generateExcerpt(content),
      content: processedContent.toString(),
      author: data.author || 'Anonymous',
      tags: data.tags || [],
      readingTime: readingTime(content).text,
      coverImage: data.coverImage ? 
        data.coverImage.startsWith('./') ? 
          `/posts/${dir}/${data.coverImage.slice(2)}` : 
          data.coverImage : 
        undefined,
      fixedUrl: data.fixedUrl,
      series: data.series ? {
        name: data.series.name,
        order: data.series.order,
        total: data.series.total,
        prev: data.series.prev ?? null,
        next: data.series.next ?? null,
      } : undefined,
    }
    
    return post
  } catch (error) {
    console.error(`Error processing post ${dir}:`, error)
    return null
  }
}

// Helper function to get part title from metadata
function getPartTitle(partIndex: number, parts?: Array<{order: number, title: string}>): string {
  if (parts) {
    const part = parts.find(p => p.order === partIndex + 1)
    if (part) return part.title
  }
  return `Part ${partIndex + 1}`
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // Check if this is a series part (contains a slash)
    if (slug.includes('/')) {
      const [seriesSlug, partSlug] = slug.split('/')
      const seriesPath = path.join(postsDirectory, seriesSlug)
      const metadataPath = path.join(seriesPath, 'metadata.ts')
      
      if (!fs.existsSync(seriesPath) || !fs.existsSync(metadataPath)) {
        return null
      }
      
      // Check if this is a part file
      if (partSlug.startsWith('part-')) {
        const partNumber = parseInt(partSlug.match(/part-(\d+)$/)?.[1] || '0')
        const partFile = `part-${partNumber}.mdx`
        const partPath = path.join(seriesPath, partFile)
        
        if (!fs.existsSync(partPath)) {
          return null
        }
        
        // Read the part content
        const partContent = fs.readFileSync(partPath, 'utf8')
        
        // Read series metadata
        let seriesMetadata: any = {}
        try {
          const metadataContent = fs.readFileSync(metadataPath, 'utf8')
          const metadataMatch = metadataContent.match(/export const metadata = \{([\s\S]*)\}/)
          if (metadataMatch) {
            const metadataString = `return {${metadataMatch[1]}}`
            const parseFunction = new Function(metadataString)
            seriesMetadata = parseFunction()
          }
        } catch (error) {
          console.warn(`Error reading metadata file for ${seriesSlug}:`, error)
          return null
        }
        
        // Create part metadata
        const partMetadata = {
          ...seriesMetadata,
          title: getPartTitle(partNumber, seriesMetadata.series?.parts),
          series: seriesMetadata.series ? {
            ...seriesMetadata.series,
            order: partNumber + 1,
            prev: partNumber === 1 ? `/posts/${seriesSlug}` : `/posts/${seriesSlug}/part-${partNumber}`,
            next: partNumber < (seriesMetadata.series?.total - 1) ? `/posts/${seriesSlug}/part-${partNumber + 1}` : null
          } : undefined
        }
        
        // Process markdown content
        const processedContent = await remark()
          .use(remarkGfm)
          .use(remarkHtml)
          .process(partContent)
        
        return {
          slug,
          title: partMetadata.title || `Part ${partNumber + 1}`,
          date: partMetadata.date || new Date().toISOString(),
          excerpt: partMetadata.excerpt || generateExcerpt(partContent),
          content: processedContent.toString(),
          author: partMetadata.author || 'Anonymous',
          tags: partMetadata.tags || [],
          readingTime: readingTime(partContent).text,
          coverImage: partMetadata.coverImage ? 
            partMetadata.coverImage.startsWith('./') ? 
              `/posts/${seriesSlug}/${partMetadata.coverImage.slice(2)}` : 
              partMetadata.coverImage : 
            undefined,
          series: partMetadata.series
        }
      }
    }
    
    // Handle regular posts (main content.mdx)
    const postPath = path.join(postsDirectory, slug)
    const metadataPath = path.join(postPath, 'metadata.ts')
    const contentPath = path.join(postPath, 'content.mdx')
    
    if (!fs.existsSync(postPath) || !fs.existsSync(metadataPath) || !fs.existsSync(contentPath)) {
      return null
    }

    return await processPost(slug, metadataPath, contentPath)
  } catch (error) {
    console.error('Error reading post:', error)
    return null
  }
}

function generateExcerpt(content: string): string {
  // Remove markdown syntax and get first 160 characters
  const plainText = content
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .replace(/[#*`]/g, '') // Remove basic markdown
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim()
  
  return plainText.length > 160 
    ? plainText.substring(0, 160) + '...'
    : plainText
}
