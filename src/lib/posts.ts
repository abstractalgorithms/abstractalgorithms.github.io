import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'public/posts')

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
      const indexPath = path.join(postPath, 'index.mdx')
      
      if (fs.statSync(postPath).isDirectory() && fs.existsSync(indexPath)) {
        const fileContents = fs.readFileSync(indexPath, 'utf8')
        const { data, content } = matter(fileContents)
        
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
          coverImage: data.coverImage,
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
    const postPath = path.join(postsDirectory, slug, 'index.mdx')
    
    if (!fs.existsSync(postPath)) {
      return null
    }

    const fileContents = fs.readFileSync(postPath, 'utf8')
    const { data, content } = matter(fileContents)
    
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
      coverImage: data.coverImage,
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
