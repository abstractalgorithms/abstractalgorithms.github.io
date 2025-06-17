#!/usr/bin/env node

/**
 * Pre-build Data Generation Script
 * This script runs before the build to pre-compute and cache all blog data
 * for maximum performance during runtime.
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const CACHE_DIR = path.join(process.cwd(), '.next', 'cache')
const STATIC_DATA_DIR = path.join(process.cwd(), 'public', 'data')

console.log('🚀 Starting pre-build data generation...')

async function generateStaticData() {
  try {
    // Ensure directories exist
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true })
    }
    if (!fs.existsSync(STATIC_DATA_DIR)) {
      fs.mkdirSync(STATIC_DATA_DIR, { recursive: true })
    }    // Import the posts library
    const postsModule = await import('../src/lib/posts.ts')
    const cacheModule = await import('../src/lib/cache.ts')
    
    const { getPosts, segregatePosts } = postsModule
    const { postsCache } = cacheModule

    console.log('📚 Loading all posts...')
    const posts = await getPosts()
    console.log(`✅ Loaded ${posts.length} posts`)

    // Generate segregated data
    const { independentPosts, learningPaths } = segregatePosts(posts)

    // Generate statistics
    const stats = {
      totalPosts: posts.length,
      totalSeries: learningPaths.length,
      totalIndependentPosts: independentPosts.length,
      lastGenerated: new Date().toISOString(),
      tags: Array.from(new Set(posts.flatMap(post => post.tags))).sort(),
      recentPosts: posts.slice(0, 10).map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        readingTime: post.readingTime
      }))
    }

    // Write static data files
    const staticData = {
      posts: posts.map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        author: post.author,
        tags: post.tags,
        readingTime: post.readingTime,
        series: post.series
      })),
      learningPaths: learningPaths.map(path => ({
        name: path.name,
        description: path.description,
        totalPosts: path.totalPosts,
        estimatedTime: path.estimatedTime,
        tags: path.tags,
        latestUpdate: path.latestUpdate,
        posts: path.posts.map(post => ({
          slug: post.slug,
          title: post.title,
          date: post.date,
          readingTime: post.readingTime
        }))
      })),
      stats
    }

    // Write comprehensive static data
    fs.writeFileSync(
      path.join(STATIC_DATA_DIR, 'blog-data.json'),
      JSON.stringify(staticData, null, 2)
    )

    // Write individual data files for specific use cases
    fs.writeFileSync(
      path.join(STATIC_DATA_DIR, 'posts-index.json'),
      JSON.stringify(staticData.posts, null, 2)
    )

    fs.writeFileSync(
      path.join(STATIC_DATA_DIR, 'learning-paths.json'),
      JSON.stringify(staticData.learningPaths, null, 2)
    )

    fs.writeFileSync(
      path.join(STATIC_DATA_DIR, 'blog-stats.json'),
      JSON.stringify(stats, null, 2)
    )

    console.log('📊 Generated static data files:')
    console.log(`  - blog-data.json (${Math.round(JSON.stringify(staticData).length / 1024)}KB)`)
    console.log(`  - posts-index.json (${Math.round(JSON.stringify(staticData.posts).length / 1024)}KB)`)
    console.log(`  - learning-paths.json (${Math.round(JSON.stringify(staticData.learningPaths).length / 1024)}KB)`)
    console.log(`  - blog-stats.json (${Math.round(JSON.stringify(stats).length / 1024)}KB)`)

    // Force cache population
    console.log('🔄 Populating runtime cache...')
    postsCache.updateCache(
      posts,
      learningPaths,
      posts.map(post => ({
        slug: post.slug,
        title: post.title,
        content: post.content.replace(/<[^>]*>/g, ''),
        tags: post.tags,
        readingTime: post.readingTime,
        excerpt: post.excerpt
      }))
    )

    console.log('✅ Pre-build data generation completed successfully!')
    console.log(`📈 Stats: ${stats.totalPosts} posts, ${stats.totalSeries} series, ${stats.tags.length} tags`)

    return true

  } catch (error) {
    console.error('❌ Error generating static data:', error)
    return false
  }
}

// Run the generation
generateStaticData()
  .then(success => {
    if (success) {
      console.log('🎉 Ready for build!')
      process.exit(0)
    } else {
      console.error('💥 Pre-build generation failed')
      process.exit(1)
    }
  })
  .catch(error => {
    console.error('💥 Unexpected error:', error)
    process.exit(1)
  })
