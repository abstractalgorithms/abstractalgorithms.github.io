// Client-side search utility for static builds
export interface SearchResult {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  readingTime: string
  matchType: 'title' | 'content' | 'tag'
  matchText?: string
  score: number
}

export interface SearchablePost {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  readingTime: string
  content?: string
}

export class ClientSearch {
  private posts: SearchablePost[] = []
  private initialized = false
  async initialize() {
    if (this.initialized) return

    console.log('Initializing client search...')

    try {
      // Try to load from static JSON first
      console.log('Attempting to fetch posts index from /data/posts-index.json')
      const response = await fetch('/data/posts-index.json')
      console.log('Fetch response status:', response.status)
      if (response.ok) {
        this.posts = await response.json()
        console.log('Successfully loaded posts:', this.posts.length)
        this.initialized = true
        return
      }
    } catch (error) {
      console.warn('Could not load static posts data:', error)
    }

    // Fallback: if we're in development or static data isn't available
    if (typeof window !== 'undefined') {
      try {
        const { getPosts } = await import('../lib/posts')
        const posts = await getPosts()
        this.posts = posts.map(post => ({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          tags: post.tags,
          readingTime: post.readingTime,
          content: post.content?.replace(/<[^>]*>/g, '') // Strip HTML
        }))
        this.initialized = true
      } catch (error) {
        console.error('Failed to load posts for search:', error)
      }
    }
  }

  async search(query: string): Promise<SearchResult[]> {
    await this.initialize()

    if (!query || query.length < 2) {
      return []
    }

    const queryLower = query.toLowerCase().trim()
    const queryWords = queryLower.split(/\s+/).filter(word => word.length > 1)
    const results: SearchResult[] = []

    for (const post of this.posts) {
      let score = 0
      let matchType: 'title' | 'content' | 'tag' = 'content'
      let matchText = ''

      // Title match (highest priority)
      const titleLower = post.title.toLowerCase()
      if (titleLower.includes(queryLower)) {
        score += 100
        matchType = 'title'
        matchText = post.title
      }

      // Individual word matches in title
      for (const word of queryWords) {
        if (titleLower.includes(word)) {
          score += 50
        }
      }

      // Tag match (high priority)
      const matchingTags = post.tags.filter(tag => 
        tag.toLowerCase().includes(queryLower) || 
        queryWords.some(word => tag.toLowerCase().includes(word))
      )
      if (matchingTags.length > 0) {
        score += 75 * matchingTags.length
        if (score < 100) { // Only set if not already a title match
          matchType = 'tag'
          matchText = matchingTags.join(', ')
        }
      }

      // Content match (medium priority)
      if (post.content) {
        const contentLower = post.content.toLowerCase()
        if (contentLower.includes(queryLower)) {
          score += 25
          if (score < 100 && matchType === 'content') {
            const index = contentLower.indexOf(queryLower)
            const start = Math.max(0, index - 50)
            const end = Math.min(post.content.length, index + queryLower.length + 50)
            matchText = '...' + post.content.slice(start, end) + '...'
          }
        }

        // Individual word matches in content
        for (const word of queryWords) {
          const wordMatches = (contentLower.match(new RegExp(word, 'g')) || []).length
          score += wordMatches * 5
        }
      }

      // Excerpt match
      if (post.excerpt.toLowerCase().includes(queryLower)) {
        score += 15
        if (score < 100 && matchType === 'content' && !matchText) {
          matchText = post.excerpt
        }
      }

      // Boost score for exact matches
      if (titleLower === queryLower) score += 200
      if (post.tags.some(tag => tag.toLowerCase() === queryLower)) score += 100

      // Only include results with meaningful scores
      if (score > 10) {
        results.push({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          tags: post.tags,
          readingTime: post.readingTime,
          matchType,
          matchText: matchText || post.excerpt,
          score
        })
      }
    }

    // Sort by score (highest first) and limit results
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
  }
}

// Singleton instance for client-side search
export const clientSearch = new ClientSearch()
