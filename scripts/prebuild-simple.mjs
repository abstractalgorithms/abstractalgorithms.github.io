#!/usr/bin/env node

/**
 * Simple Pre-build Script
 * Ensures static data directories exist and runs basic optimizations
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

const CACHE_DIR = path.join(rootDir, '.next', 'cache')
const STATIC_DATA_DIR = path.join(rootDir, 'public', 'data')

console.log('🚀 Starting pre-build optimizations...')

function ensureDirectories() {
  // Ensure cache directory exists
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true })
    console.log('📁 Created cache directory')
  }

  // Ensure static data directory exists
  if (!fs.existsSync(STATIC_DATA_DIR)) {
    fs.mkdirSync(STATIC_DATA_DIR, { recursive: true })
    console.log('📁 Created static data directory')
  }
}

async function createPlaceholderData() {
  // Try to generate real posts data for search
  try {
    // Only generate real data if we can import the posts module
    const postsModulePath = path.join(rootDir, 'src', 'lib', 'posts.ts')
    if (fs.existsSync(postsModulePath)) {
      console.log('🔄 Attempting to generate real posts data...')
      
      // Create a basic posts index for search
      const postsIndexData = []
      const postsDir = path.join(rootDir, 'src', 'posts')
      
      if (fs.existsSync(postsDir)) {
        const postDirs = fs.readdirSync(postsDir)
        
        for (const dir of postDirs) {
          const postPath = path.join(postsDir, dir)
          const metadataPath = path.join(postPath, 'metadata.ts')
          
          if (fs.existsSync(metadataPath)) {
            try {
              // Read metadata file to extract basic info
              const metadataContent = fs.readFileSync(metadataPath, 'utf8')
              
              // Simple extraction of title and basic info
              const titleMatch = metadataContent.match(/title:\s*['"`]([^'"`]+)['"`]/)
              const tagsMatch = metadataContent.match(/tags:\s*\[(.*?)\]/s)
              const excerptMatch = metadataContent.match(/excerpt:\s*['"`]([^'"`]+)['"`]/)
              
              if (titleMatch) {
                const postData = {
                  slug: dir,
                  title: titleMatch[1],
                  excerpt: excerptMatch ? excerptMatch[1] : `Learn about ${titleMatch[1]}`,
                  tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"`]/g, '')) : [],
                  readingTime: '5 min read',
                  content: excerptMatch ? excerptMatch[1] : titleMatch[1]
                }
                
                postsIndexData.push(postData)
                console.log(`📄 Extracted: ${postData.title}`)
              }
            } catch (err) {
              console.warn(`⚠️ Could not process ${dir}:`, err.message)
            }
          }
        }
      }
      
      if (postsIndexData.length > 0) {
        // Write real posts data
        fs.writeFileSync(
          path.join(STATIC_DATA_DIR, 'posts-index.json'),
          JSON.stringify(postsIndexData, null, 2)
        )
        console.log(`✅ Generated posts index with ${postsIndexData.length} posts`)
        
        // Update stats
        const realStats = {
          totalPosts: postsIndexData.length,
          totalSeries: 0,
          totalIndependentPosts: postsIndexData.length,
          lastGenerated: new Date().toISOString(),
          tags: Array.from(new Set(postsIndexData.flatMap(p => p.tags))),
          recentPosts: postsIndexData.slice(0, 5)
        }
        
        fs.writeFileSync(
          path.join(STATIC_DATA_DIR, 'blog-stats.json'),
          JSON.stringify(realStats, null, 2)
        )
        
        const blogData = {
          posts: postsIndexData,
          learningPaths: [],
          stats: realStats
        }
        
        fs.writeFileSync(
          path.join(STATIC_DATA_DIR, 'blog-data.json'),
          JSON.stringify(blogData, null, 2)
        )
        
        return // Successfully generated real data
      }
    }
  } catch (error) {
    console.warn('⚠️ Could not generate real posts data:', error.message)
  }
  
  // Fallback to placeholder data
  console.log('📝 Generating placeholder data...')
  
  const placeholderStats = {
    totalPosts: 0,
    totalSeries: 0,
    totalIndependentPosts: 0,
    lastGenerated: new Date().toISOString(),
    tags: [],
    recentPosts: []
  }

  const statsPath = path.join(STATIC_DATA_DIR, 'blog-stats.json')
  if (!fs.existsSync(statsPath)) {
    fs.writeFileSync(statsPath, JSON.stringify(placeholderStats, null, 2))
    console.log('📊 Created placeholder stats file')
  }

  // Create data files if they don't exist
  const dataFiles = [
    { name: 'posts-index.json', data: [] },
    { name: 'learning-paths.json', data: [] },
    { name: 'blog-data.json', data: { posts: [], learningPaths: [], stats: placeholderStats } }
  ]

  dataFiles.forEach(({ name, data }) => {
    const filePath = path.join(STATIC_DATA_DIR, name)
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
      console.log(`📄 Created placeholder ${name}`)
    }
  })
}

function optimizePublicAssets() {
  console.log('🎨 Optimizing public assets...')
  
  // Check if sitemap exists
  const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml')
  if (!fs.existsSync(sitemapPath)) {
    // Create basic sitemap
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://abstractalgorithms.github.io/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
    
    fs.writeFileSync(sitemapPath, basicSitemap)
    console.log('🗺️ Created basic sitemap')
  }

  // Check robots.txt
  const robotsPath = path.join(rootDir, 'public', 'robots.txt')
  if (!fs.existsSync(robotsPath)) {
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://abstractalgorithms.github.io/sitemap.xml`
    
    fs.writeFileSync(robotsPath, robotsTxt)
    console.log('🤖 Created robots.txt')
  }
}

function printSummary() {
  console.log('\n✅ Pre-build optimizations completed!')
  console.log('📈 Performance features enabled:')
  console.log('  - Static data directory structure')
  console.log('  - Cache directory preparation')
  console.log('  - Asset optimization checks')
  console.log('  - SEO file verification')
  console.log('\n🎯 Next.js build will use optimized configuration!')
}

// Run optimizations
try {
  ensureDirectories()
  createPlaceholderData()
  optimizePublicAssets()
  printSummary()
  
  process.exit(0)
} catch (error) {
  console.error('❌ Pre-build optimization failed:', error)
  process.exit(1)
}
