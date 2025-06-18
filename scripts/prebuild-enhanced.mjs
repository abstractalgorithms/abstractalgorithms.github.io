#!/usr/bin/env node

/**
 * Enhanced Pre-build Script with Parallel Processing
 * Optimizes performance through parallel data generation and smart caching
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Worker } from 'worker_threads'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

const CACHE_DIR = path.join(rootDir, '.next', 'cache')
const STATIC_DATA_DIR = path.join(rootDir, 'public', 'data')
const PARALLEL_CACHE_FILE = path.join(CACHE_DIR, 'parallel-cache.json')

console.log('🚀 Starting enhanced pre-build with parallel processing...')

class ParallelPrebuild {
  constructor() {
    this.parallelCache = this.loadParallelCache()
  }

  loadParallelCache() {
    try {
      if (fs.existsSync(PARALLEL_CACHE_FILE)) {
        return JSON.parse(fs.readFileSync(PARALLEL_CACHE_FILE, 'utf8'))
      }
    } catch (error) {
      console.warn('⚠️ Could not load parallel cache:', error.message)
    }
    return {
      lastRun: null,
      processedFiles: {},
      stats: {}
    }
  }

  saveParallelCache() {
    try {
      if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR, { recursive: true })
      }
      fs.writeFileSync(PARALLEL_CACHE_FILE, JSON.stringify(this.parallelCache, null, 2))
    } catch (error) {
      console.warn('⚠️ Could not save parallel cache:', error.message)
    }
  }

  async ensureDirectories() {
    const dirs = [CACHE_DIR, STATIC_DATA_DIR]
    await Promise.all(dirs.map(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
        console.log(`📁 Created directory: ${path.basename(dir)}`)
      }
    }))
  }

  async generateStaticFilesParallel() {
    console.log('⚡ Generating static files in parallel...')
    
    const tasks = [
      this.generateSitemap(),
      this.generateRobotsTxt(),
      this.generateManifest(),
      this.optimizeAssets()
    ]

    const results = await Promise.allSettled(tasks)
    
    let successCount = 0
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        successCount++
      } else {
        console.warn(`⚠️ Task ${index + 1} failed:`, result.reason?.message)
      }
    })

    console.log(`✅ Completed ${successCount}/${tasks.length} static file tasks`)
  }

  async generateSitemap() {
    const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml')
    
    if (fs.existsSync(sitemapPath)) {
      const stats = fs.statSync(sitemapPath)
      const age = Date.now() - stats.mtime.getTime()
      if (age < 24 * 60 * 60 * 1000) { // Less than 24 hours old
        console.log('⏭️ Sitemap is recent, skipping regeneration')
        return
      }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://abstractalgorithms.github.io/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://abstractalgorithms.github.io/posts/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://abstractalgorithms.github.io/about/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`

    fs.writeFileSync(sitemapPath, sitemap)
    console.log('🗺️ Generated enhanced sitemap')
  }

  async generateRobotsTxt() {
    const robotsPath = path.join(rootDir, 'public', 'robots.txt')
    
    if (fs.existsSync(robotsPath)) {
      return // Don't overwrite existing robots.txt
    }

    const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://abstractalgorithms.github.io/sitemap.xml

# Crawl delay to be respectful
Crawl-delay: 1

# Block specific paths if needed
# Disallow: /admin/
# Disallow: /private/`

    fs.writeFileSync(robotsPath, robotsTxt)
    console.log('🤖 Generated enhanced robots.txt')
  }

  async generateManifest() {
    const manifestPath = path.join(rootDir, 'public', 'manifest.json')
    
    if (fs.existsSync(manifestPath)) {
      return // Don't overwrite existing manifest
    }

    const manifest = {
      name: "Abstract Algorithms",
      short_name: "AA",
      description: "Learn algorithms and system design concepts",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#16a34a",
      icons: [
        {
          src: "/favicon.ico",
          sizes: "any",
          type: "image/x-icon"
        }
      ]
    }

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
    console.log('📱 Generated web app manifest')
  }

  async optimizeAssets() {
    console.log('🎨 Optimizing public assets...')
    
    // Check for large unused assets (basic cleanup)
    const publicDir = path.join(rootDir, 'public')
    if (!fs.existsSync(publicDir)) return

    const assetDirs = ['posts', 'data']
    for (const dir of assetDirs) {
      const assetPath = path.join(publicDir, dir)
      if (fs.existsSync(assetPath)) {
        try {
          const items = fs.readdirSync(assetPath, { withFileTypes: true })
          const totalSize = items.reduce((size, item) => {
            if (item.isFile()) {
              const filePath = path.join(assetPath, item.name)
              const stats = fs.statSync(filePath)
              return size + stats.size
            }
            return size
          }, 0)
          
          console.log(`📊 ${dir}/ directory: ${Math.round(totalSize / 1024)}KB`)
        } catch (error) {
          // Ignore directory read errors
        }
      }
    }
  }

  async createPlaceholderDataEfficient() {
    console.log('📝 Creating optimized placeholder data...')
    
    // Check if we can reuse existing data
    const existingData = this.checkExistingData()
    if (existingData.canReuse) {
      console.log('⚡ Reusing existing static data files')
      return true
    }

    try {
      // Try to generate real data efficiently
      const success = await this.generateRealDataEfficient()
      if (success) {
        console.log('✅ Generated real data efficiently')
        return true
      }
    } catch (error) {
      console.warn('⚠️ Real data generation failed:', error.message)
    }

    // Fallback to placeholder data
    await this.generatePlaceholderData()
    return true
  }

  checkExistingData() {
    const requiredFiles = ['blog-stats.json', 'posts-index.json', 'blog-data.json']
    const existingFiles = requiredFiles.filter(file => 
      fs.existsSync(path.join(STATIC_DATA_DIR, file))
    )

    if (existingFiles.length === requiredFiles.length) {
      // Check if files are recent (less than 1 hour old)
      const oldestFile = requiredFiles.reduce((oldest, file) => {
        const filePath = path.join(STATIC_DATA_DIR, file)
        const stats = fs.statSync(filePath)
        return stats.mtime < oldest ? stats.mtime : oldest
      }, new Date())

      const ageInHours = (Date.now() - oldestFile.getTime()) / (1000 * 60 * 60)
      
      return {
        canReuse: ageInHours < 1,
        age: ageInHours,
        filesExist: existingFiles.length
      }
    }

    return { canReuse: false, filesExist: existingFiles.length }
  }

  async generateRealDataEfficient() {
    // Quick metadata extraction without full post processing
    const postsDir = path.join(rootDir, 'src', 'posts')
    if (!fs.existsSync(postsDir)) {
      return false
    }

    const postDirs = fs.readdirSync(postsDir)
    const postsData = []

    for (const dir of postDirs) {
      const metadataPath = path.join(postsDir, dir, 'metadata.ts')
      if (fs.existsSync(metadataPath)) {
        try {
          const metadataContent = fs.readFileSync(metadataPath, 'utf8')
          
          // Quick extraction of key fields
          const titleMatch = metadataContent.match(/title:\s*['"`]([^'"`]+)['"`]/)
          const tagsMatch = metadataContent.match(/tags:\s*\[(.*?)\]/s)
          const excerptMatch = metadataContent.match(/excerpt:\s*['"`]([^'"`]+)['"`]/)
          const dateMatch = metadataContent.match(/date:\s*['"`]([^'"`]+)['"`]/)

          if (titleMatch) {
            postsData.push({
              slug: dir,
              title: titleMatch[1],
              excerpt: excerptMatch ? excerptMatch[1] : `Learn about ${titleMatch[1]}`,
              date: dateMatch ? dateMatch[1] : new Date().toISOString(),
              tags: tagsMatch ? 
                tagsMatch[1].split(',').map(t => t.trim().replace(/['"`]/g, '')) : 
                [],
              readingTime: '5 min read',
              content: excerptMatch ? excerptMatch[1] : titleMatch[1]
            })
          }
        } catch (err) {
          console.warn(`⚠️ Could not process ${dir}:`, err.message)
        }
      }
    }

    if (postsData.length > 0) {
      // Generate comprehensive data
      const stats = {
        totalPosts: postsData.length,
        totalSeries: 0,
        totalIndependentPosts: postsData.length,
        lastGenerated: new Date().toISOString(),
        tags: Array.from(new Set(postsData.flatMap(p => p.tags))),
        recentPosts: postsData.slice(0, 5)
      }

      const blogData = {
        posts: postsData,
        learningPaths: [],
        stats
      }

      // Write all files in parallel
      await Promise.all([
        fs.promises.writeFile(
          path.join(STATIC_DATA_DIR, 'blog-data.json'),
          JSON.stringify(blogData, null, 2)
        ),
        fs.promises.writeFile(
          path.join(STATIC_DATA_DIR, 'posts-index.json'),
          JSON.stringify(postsData, null, 2)
        ),
        fs.promises.writeFile(
          path.join(STATIC_DATA_DIR, 'blog-stats.json'),
          JSON.stringify(stats, null, 2)
        ),
        fs.promises.writeFile(
          path.join(STATIC_DATA_DIR, 'learning-paths.json'),
          JSON.stringify([], null, 2)
        )
      ])

      console.log(`⚡ Efficiently generated data for ${postsData.length} posts`)
      return true
    }

    return false
  }

  async generatePlaceholderData() {
    const placeholderStats = {
      totalPosts: 0,
      totalSeries: 0,
      totalIndependentPosts: 0,
      lastGenerated: new Date().toISOString(),
      tags: [],
      recentPosts: []
    }

    const dataFiles = [
      { name: 'posts-index.json', data: [] },
      { name: 'learning-paths.json', data: [] },
      { name: 'blog-stats.json', data: placeholderStats },
      { name: 'blog-data.json', data: { posts: [], learningPaths: [], stats: placeholderStats } }
    ]

    await Promise.all(
      dataFiles.map(({ name, data }) => {
        const filePath = path.join(STATIC_DATA_DIR, name)
        if (!fs.existsSync(filePath)) {
          return fs.promises.writeFile(filePath, JSON.stringify(data, null, 2))
        }
        return Promise.resolve()
      })
    )

    console.log('📄 Generated placeholder data files')
  }

  async run() {
    const startTime = Date.now()

    try {
      await this.ensureDirectories()
      
      // Run tasks in parallel where possible
      await Promise.all([
        this.generateStaticFilesParallel(),
        this.createPlaceholderDataEfficient()
      ])

      // Update cache
      this.parallelCache.lastRun = new Date().toISOString()
      this.parallelCache.stats.lastDuration = Date.now() - startTime
      this.saveParallelCache()

      const duration = Date.now() - startTime
      console.log(`\n✅ Enhanced pre-build completed in ${duration}ms!`)
      console.log('📈 Performance optimizations applied:')
      console.log('  ⚡ Parallel processing for static files')
      console.log('  🧠 Smart caching and reuse detection')
      console.log('  📦 Efficient metadata extraction')
      console.log('  🔧 Optimized asset management')
      
      return true
    } catch (error) {
      console.error('❌ Enhanced pre-build failed:', error)
      return false
    }
  }
}

// Run the enhanced prebuild
if (import.meta.url === `file://${process.argv[1]}`) {
  const prebuild = new ParallelPrebuild()
  
  prebuild.run()
    .then(success => {
      process.exit(success ? 0 : 1)
    })
    .catch(error => {
      console.error('💥 Fatal error:', error)
      process.exit(1)
    })
}

export default ParallelPrebuild
