'use client'

import { useState, useEffect } from 'react'
import { Post, LearningPath } from '../lib/posts'

interface BlogStats {
  totalPosts: number
  totalSeries: number
  totalIndependentPosts: number
  lastGenerated: string
  tags: string[]
  recentPosts: Array<{
    slug: string
    title: string
    date: string
    readingTime: string
  }>
}

interface StaticBlogData {
  posts: Post[]
  learningPaths: LearningPath[]
  stats: BlogStats
}

// Custom hook for accessing pre-computed blog data
export function useStaticBlogData() {
  const [data, setData] = useState<StaticBlogData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStaticData() {
      try {
        setLoading(true)
        
        // Try to load from static JSON first (fastest)
        const response = await fetch('/data/blog-data.json')
        
        if (response.ok) {
          const staticData = await response.json()
          setData(staticData)
          console.log('📦 Loaded static blog data from JSON')
        } else {
          // Fallback to API if static data not available
          console.log('⚠️ Static data not found, falling back to API')
          const { getPosts, segregatePosts } = await import('../lib/posts')
          
          const posts = await getPosts()
          const { learningPaths } = segregatePosts(posts)
          
          const stats: BlogStats = {
            totalPosts: posts.length,
            totalSeries: learningPaths.length,
            totalIndependentPosts: posts.filter(p => !p.series).length,
            lastGenerated: new Date().toISOString(),
            tags: Array.from(new Set(posts.flatMap(post => post.tags))).sort(),
            recentPosts: posts.slice(0, 10).map(post => ({
              slug: post.slug,
              title: post.title,
              date: post.date,
              readingTime: post.readingTime
            }))
          }
          
          setData({ posts, learningPaths, stats })
        }
        
        setError(null)
      } catch (err) {
        console.error('Error loading blog data:', err)
        setError('Failed to load blog data')
      } finally {
        setLoading(false)
      }
    }

    loadStaticData()
  }, [])

  return { data, loading, error }
}

// Hook for accessing just the stats (lighter weight)
export function useBlogStats() {
  const [stats, setStats] = useState<BlogStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch('/data/blog-stats.json')
        if (response.ok) {
          const statsData = await response.json()
          setStats(statsData)
        }
      } catch (err) {
        console.error('Error loading blog stats:', err)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return { stats, loading }
}

// Hook for accessing posts index (lighter than full posts)
export function usePostsIndex() {
  const [posts, setPosts] = useState<Partial<Post>[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPostsIndex() {
      try {
        const response = await fetch('/data/posts-index.json')
        if (response.ok) {
          const postsData = await response.json()
          setPosts(postsData)
        }
      } catch (err) {
        console.error('Error loading posts index:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPostsIndex()
  }, [])

  return { posts, loading }
}

// Hook for accessing learning paths
export function useLearningPaths() {
  const [learningPaths, setLearningPaths] = useState<LearningPath[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadLearningPaths() {
      try {
        const response = await fetch('/data/learning-paths.json')
        if (response.ok) {
          const pathsData = await response.json()
          setLearningPaths(pathsData)
        }
      } catch (err) {
        console.error('Error loading learning paths:', err)
      } finally {
        setLoading(false)
      }
    }

    loadLearningPaths()
  }, [])

  return { learningPaths, loading }
}
