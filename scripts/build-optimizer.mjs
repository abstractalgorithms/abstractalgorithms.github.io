#!/usr/bin/env node

/**
 * Build Optimization Script
 * Implements intelligent caching and incremental build strategies
 */

import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

const CACHE_DIR = path.join(rootDir, '.next', 'cache')
const BUILD_CACHE_FILE = path.join(CACHE_DIR, 'build-cache.json')
const STATIC_DATA_DIR = path.join(rootDir, 'public', 'data')

console.log('🚀 Starting build optimization...')

class BuildOptimizer {
  constructor() {
    this.buildCache = this.loadBuildCache()
    this.contentHashes = new Map()
    this.changedFiles = new Set()
  }

  // Load existing build cache
  loadBuildCache() {
    try {
      if (fs.existsSync(BUILD_CACHE_FILE)) {
        return JSON.parse(fs.readFileSync(BUILD_CACHE_FILE, 'utf8'))
      }
    } catch (error) {
      console.warn('⚠️ Could not load build cache:', error.message)
    }
    return {
      lastBuild: null,
      fileHashes: {},
      buildStats: {},
      version: '1.0.0'
    }
  }

  // Save build cache
  saveBuildCache() {
    try {
      if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR, { recursive: true })
      }
      fs.writeFileSync(BUILD_CACHE_FILE, JSON.stringify(this.buildCache, null, 2))
      console.log('💾 Build cache saved')
    } catch (error) {
      console.warn('⚠️ Could not save build cache:', error.message)
    }
  }

  // Calculate file hash
  calculateFileHash(filePath) {
    try {
      const content = fs.readFileSync(filePath)
      return crypto.createHash('md5').update(content).digest('hex')
    } catch (error) {
      return null
    }
  }

  // Check which files have changed since last build
  detectChangedFiles() {
    console.log('🔍 Detecting changed files...')
    
    const filesToCheck = [
      // Source files
      ...this.globFiles('src/**/*.{ts,tsx,js,jsx,mdx}'),
      // Config files
      'next.config.js',
      'next.config.mjs',
      'tailwind.config.js',
      'package.json',
      'tsconfig.json',
      // Content files
      ...this.globFiles('src/posts/**/*.{mdx,ts}'),
      // Public assets
      ...this.globFiles('public/**/*.{json,xml,txt}')
    ]

    let changedCount = 0

    for (const file of filesToCheck) {
      const fullPath = path.join(rootDir, file)
      if (fs.existsSync(fullPath)) {
        const currentHash = this.calculateFileHash(fullPath)
        const previousHash = this.buildCache.fileHashes[file]

        if (currentHash !== previousHash) {
          this.changedFiles.add(file)
          this.buildCache.fileHashes[file] = currentHash
          changedCount++
        }
      }
    }

    console.log(`📊 ${changedCount} files changed since last build`)
    return changedCount
  }

  // Simple glob implementation
  globFiles(pattern) {
    const files = []
    const baseDir = pattern.split('**')[0] || ''
    const extensions = pattern.match(/\{([^}]+)\}/) 
      ? pattern.match(/\{([^}]+)\}/)[1].split(',')
      : [pattern.split('.').pop()]

    const scanDir = (dir) => {
      try {
        const items = fs.readdirSync(path.join(rootDir, dir))
        for (const item of items) {
          const itemPath = path.join(dir, item)
          const fullPath = path.join(rootDir, itemPath)
          
          if (fs.statSync(fullPath).isDirectory()) {
            scanDir(itemPath)
          } else {
            const ext = path.extname(item).slice(1)
            if (extensions.some(e => e.trim() === ext)) {
              files.push(itemPath.replace(/\\/g, '/'))
            }
          }
        }
      } catch (error) {
        // Directory might not exist
      }
    }

    scanDir(baseDir)
    return files
  }

  // Determine if incremental build is possible
  canUseIncrementalBuild() {
    if (!this.buildCache.lastBuild) {
      console.log('🆕 First build detected - full build required')
      return false
    }

    const hoursSinceLastBuild = (Date.now() - new Date(this.buildCache.lastBuild).getTime()) / (1000 * 60 * 60)
    
    if (hoursSinceLastBuild > 24) {
      console.log('🕐 Last build > 24h ago - recommending full build')
      return false
    }

    const changedCount = this.detectChangedFiles()
    const totalFiles = Object.keys(this.buildCache.fileHashes).length

    if (changedCount === 0) {
      console.log('✅ No changes detected - can skip build entirely')
      return 'skip'
    }

    if (changedCount / totalFiles < 0.3) {
      console.log('⚡ Few changes detected - incremental build recommended')
      return true
    }

    console.log('🔄 Many changes detected - full build recommended')
    return false
  }

  // Check if static data needs regeneration
  needsStaticDataUpdate() {
    const contentChanges = Array.from(this.changedFiles).some(file => 
      file.includes('src/posts/') || 
      file.includes('src/lib/posts.ts') ||
      file.includes('src/data/')
    )

    if (contentChanges) {
      console.log('📚 Content changes detected - static data update needed')
      return true
    }

    // Check if static data files are missing
    const staticFiles = ['blog-data.json', 'posts-index.json', 'blog-stats.json']
    const missingFiles = staticFiles.filter(file => 
      !fs.existsSync(path.join(STATIC_DATA_DIR, file))
    )

    if (missingFiles.length > 0) {
      console.log(`📁 Missing static files: ${missingFiles.join(', ')} - regeneration needed`)
      return true
    }

    return false
  }

  // Optimize prebuild process
  async optimizedPrebuild() {
    if (!this.needsStaticDataUpdate()) {
      console.log('⏭️ Static data is up to date - skipping prebuild')
      return true
    }

    console.log('🔧 Running optimized prebuild...')
    try {
      // Use the more comprehensive prebuild for changed content
      execSync('node scripts/prebuild.mjs', { 
        stdio: 'inherit',
        cwd: rootDir 
      })
      return true
    } catch (error) {
      console.error('❌ Prebuild failed:', error.message)
      // Fallback to simple prebuild
      try {
        execSync('node scripts/prebuild-simple.mjs', { 
          stdio: 'inherit',
          cwd: rootDir 
        })
        return true
      } catch (fallbackError) {
        console.error('❌ Fallback prebuild also failed:', fallbackError.message)
        return false
      }
    }
  }

  // Clean unnecessary cache to speed up builds
  cleanCache() {
    const cacheCleanupPaths = [
      path.join(rootDir, '.next', 'cache', 'webpack'),
      path.join(rootDir, '.next', 'cache', 'swc')
    ]

    // Only clean cache if it's getting large or old
    for (const cachePath of cacheCleanupPaths) {
      if (fs.existsSync(cachePath)) {
        try {
          const stats = fs.statSync(cachePath)
          const ageInHours = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60)
          
          // Clean cache older than 48 hours
          if (ageInHours > 48) {
            console.log(`🧹 Cleaning old cache: ${path.basename(cachePath)}`)
            fs.rmSync(cachePath, { recursive: true, force: true })
          }
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    }
  }

  // Record build completion
  recordBuildCompletion(buildType = 'full') {
    this.buildCache.lastBuild = new Date().toISOString()
    this.buildCache.buildStats = {
      type: buildType,
      filesChanged: this.changedFiles.size,
      timestamp: new Date().toISOString()
    }
    this.saveBuildCache()
  }

  // Main optimization workflow
  async optimize() {
    const buildStrategy = this.canUseIncrementalBuild()
    
    if (buildStrategy === 'skip') {
      console.log('🎯 Build optimization complete - no build needed')
      return { shouldBuild: false, strategy: 'skip' }
    }

    // Clean old cache if needed
    this.cleanCache()

    // Run optimized prebuild
    const prebuildSuccess = await this.optimizedPrebuild()
    if (!prebuildSuccess) {
      console.log('⚠️ Prebuild failed - continuing with existing data')
    }

    // Update build cache
    this.recordBuildCompletion(buildStrategy ? 'incremental' : 'full')

    return { 
      shouldBuild: true, 
      strategy: buildStrategy ? 'incremental' : 'full',
      changedFiles: Array.from(this.changedFiles)
    }
  }
}

// Command line interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const optimizer = new BuildOptimizer()
  
  optimizer.optimize()
    .then(result => {
      console.log('\n✅ Build optimization complete!')
      console.log(`📋 Strategy: ${result.strategy}`)
      console.log(`🎯 Should build: ${result.shouldBuild}`)
      
      if (result.changedFiles && result.changedFiles.length > 0) {
        console.log(`📝 Changed files: ${Math.min(result.changedFiles.length, 5)} files`)
      }
      
      // Exit with code to indicate if build is needed
      process.exit(result.shouldBuild ? 0 : 1)
    })
    .catch(error => {
      console.error('❌ Build optimization failed:', error)
      process.exit(1)
    })
}

export default BuildOptimizer
