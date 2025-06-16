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
      seriesPosts.push(post)
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
      const metadataPath = path.join(postPath, 'metadata.ts')
      const contentPath = path.join(postPath, 'content.mdx')
      
      if (fs.statSync(postPath).isDirectory()) {
        let data: any = {}
        let content = ''
        
        // Check for separate metadata and content files
        if (fs.existsSync(metadataPath) && fs.existsSync(contentPath)) {
          try {
            // Read the metadata file as text and parse it
            const metadataContent = fs.readFileSync(metadataPath, 'utf8')
            // Extract the metadata object (simple regex parsing)
            const metadataMatch = metadataContent.match(/export const metadata = \{([\s\S]*)\}/)
            if (metadataMatch) {
              // Use a more sophisticated parsing approach
              try {
                // Create a safe Function constructor to parse the metadata
                const metadataString = `return {${metadataMatch[1]}}`
                const parseFunction = new Function(metadataString)
                data = parseFunction()
              } catch (funcError) {
                console.warn(`Error parsing metadata for ${dir}, falling back to regex parsing:`, funcError)
                // Fallback to simple regex parsing
                const lines = metadataMatch[1].split('\n')
                lines.forEach(line => {
                  const match = line.match(/^\s*(\w+):\s*"([^"]*)"/)
                  if (match) {
                    data[match[1]] = match[2]
                  } else {
                    const arrayMatch = line.match(/^\s*(\w+):\s*\[(.*)\]/)
                    if (arrayMatch) {
                      data[arrayMatch[1]] = arrayMatch[2].split(',').map(s => s.trim().replace(/"/g, ''))
                    }
                  }
                })
              }
            }
          } catch (error) {
            console.warn(`Error reading metadata file for ${dir}:`, error)
          }
          
          // Read content from separate file
          content = fs.readFileSync(contentPath, 'utf8')
        } else {
          console.warn(`Missing required files for post: ${dir}`)
          continue // Skip if no valid content found
        }
        
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
          fixedUrl: data.fixedUrl, // Add fixedUrl from frontmatter if present
          series: data.series ? {
            name: data.series.name,
            order: data.series.order,
            total: data.series.total,
            prev: data.series.prev ?? null,
            next: data.series.next ?? null,
          } : undefined,
        }
        
        posts.push(post)
      }
    }

    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const postPath = path.join(postsDirectory, slug)
    const metadataPath = path.join(postPath, 'metadata.ts')
    const contentPath = path.join(postPath, 'content.mdx')
    
    if (!fs.existsSync(postPath)) {
      return null
    }

    let data: any = {}
    let content = ''
    
    // Check for separate metadata file first
    if (fs.existsSync(metadataPath)) {
      try {
        const metadataContent = fs.readFileSync(metadataPath, 'utf8')
        const metadataMatch = metadataContent.match(/export const metadata = \{([\s\S]*)\}/)
        if (metadataMatch) {
          const lines = metadataMatch[1].split('\n')
          lines.forEach(line => {
            const match = line.match(/^\s*(\w+):\s*"([^"]*)"/)
            if (match) {
              data[match[1]] = match[2]
            } else {
              const arrayMatch = line.match(/^\s*(\w+):\s*\[(.*)\]/)
              if (arrayMatch) {
                data[arrayMatch[1]] = arrayMatch[2].split(',').map(s => s.trim().replace(/"/g, ''))
              }
            }
          })
        }
      } catch (error) {
        console.warn(`Error reading metadata file for ${slug}:`, error)
      }
      
      content = fs.readFileSync(contentPath, 'utf8')
    } else {
      return null
    }

    // Process markdown content
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(content)
    
    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || generateExcerpt(content),
      content: processedContent.toString(),
      author: data.author || 'Anonymous',
      tags: data.tags || [],
      readingTime: readingTime(content).text,
      coverImage: data.coverImage ? 
        data.coverImage.startsWith('./') ? 
          `/posts/${slug}/${data.coverImage.slice(2)}` : 
          data.coverImage : 
        undefined,
      fixedUrl: data.fixedUrl, // Add fixedUrl from frontmatter if present
      series: data.series ? {
        name: data.series.name,
        order: data.series.order,
        total: data.series.total,
        prev: data.series.prev ?? null,
        next: data.series.next ?? null,
      } : undefined,
    }
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
