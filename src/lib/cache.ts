import fs from 'fs'
import path from 'path'
import { Post, LearningPath } from './posts'

interface CacheData {
  posts: Post[]
  learningPaths: LearningPath[]
  tags: string[]
  searchIndex: SearchIndexItem[]
  lastUpdated: string
  stats: {
    totalPosts: number
    totalSeries: number
    totalTags: number
    averageReadingTime: number
  }
}

interface SearchIndexItem {
  slug: string
  title: string
  content: string
  tags: string[]
  readingTime: string
  excerpt: string
}

const CACHE_FILE = path.join(process.cwd(), '.next', 'cache', 'posts-cache.json')

export class PostsCache {
  private static instance: PostsCache
  private cache: CacheData | null = null
  private cacheValid = false

  private constructor() {}

  static getInstance(): PostsCache {
    if (!PostsCache.instance) {
      PostsCache.instance = new PostsCache()
    }
    return PostsCache.instance
  }

  // Check if cache exists and is valid
  private isCacheValid(): boolean {
    if (!fs.existsSync(CACHE_FILE)) {
      return false
    }

    try {
      const stats = fs.statSync(CACHE_FILE)
      const cacheAge = Date.now() - stats.mtime.getTime()
      
      // Cache is valid for 1 hour in development, 24 hours in production
      const maxAge = process.env.NODE_ENV === 'development' ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000
      
      return cacheAge < maxAge
    } catch {
      return false
    }
  }

  // Load cache from file
  private loadCache(): CacheData | null {
    try {
      if (!fs.existsSync(CACHE_FILE)) {
        return null
      }

      const cacheContent = fs.readFileSync(CACHE_FILE, 'utf8')
      return JSON.parse(cacheContent)
    } catch (error) {
      console.warn('Failed to load cache:', error)
      return null
    }
  }

  // Save cache to file
  private saveCache(data: CacheData): void {
    try {
      const cacheDir = path.dirname(CACHE_FILE)
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true })
      }

      fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2))
      this.cache = data
      this.cacheValid = true
    } catch (error) {
      console.warn('Failed to save cache:', error)
    }
  }

  // Get cached data or return null if cache is invalid
  getCachedData(): CacheData | null {
    if (this.cacheValid && this.cache) {
      return this.cache
    }

    if (this.isCacheValid()) {
      this.cache = this.loadCache()
      this.cacheValid = !!this.cache
      return this.cache
    }

    return null
  }

  // Update cache with new data
  updateCache(
    posts: Post[], 
    learningPaths: LearningPath[], 
    searchIndex: SearchIndexItem[]
  ): void {
    // Extract all unique tags
    const tagSet = new Set<string>()
    posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)))
    const tags = Array.from(tagSet).sort()

    // Calculate stats
    const totalReadingTime = posts.reduce((sum, post) => {
      const time = parseInt(post.readingTime.replace(/[^\d]/g, '')) || 0
      return sum + time
    }, 0)

    const stats = {
      totalPosts: posts.length,
      totalSeries: learningPaths.length,
      totalTags: tags.length,
      averageReadingTime: Math.round(totalReadingTime / posts.length) || 0
    }

    const cacheData: CacheData = {
      posts,
      learningPaths,
      tags,
      searchIndex,
      lastUpdated: new Date().toISOString(),
      stats
    }

    this.saveCache(cacheData)
  }

  // Invalidate cache
  invalidateCache(): void {
    this.cache = null
    this.cacheValid = false
    
    try {
      if (fs.existsSync(CACHE_FILE)) {
        fs.unlinkSync(CACHE_FILE)
      }
    } catch (error) {
      console.warn('Failed to delete cache file:', error)
    }
  }

  // Get stats without loading full cache
  getStats(): CacheData['stats'] | null {
    const cache = this.getCachedData()
    return cache?.stats || null
  }

  // Get search index
  getSearchIndex(): SearchIndexItem[] {
    const cache = this.getCachedData()
    return cache?.searchIndex || []
  }

  // Get all tags
  getTags(): string[] {
    const cache = this.getCachedData()
    return cache?.tags || []
  }
}

export const postsCache = PostsCache.getInstance()
