import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const POSTS_DIR = path.join(__dirname, '..', 'src', 'posts');
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8888/.netlify/functions';

class PostMigrator {
  constructor() {
    this.successCount = 0;
    this.errorCount = 0;
    this.errors = [];
  }

  async migrateAllPosts() {
    console.log('🚀 Starting post migration to MongoDB...');
    console.log(`📁 Reading posts from: ${POSTS_DIR}`);
    console.log(`🌐 Server URL: ${SERVER_URL}`);
    
    try {
      const postDirs = fs.readdirSync(POSTS_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      console.log(`📚 Found ${postDirs.length} post directories`);

      for (const postDir of postDirs) {
        try {
          await this.migratePost(postDir);
          this.successCount++;
        } catch (error) {
          this.errorCount++;
          this.errors.push({ post: postDir, error: error.message });
          console.error(`❌ Failed to migrate ${postDir}:`, error.message);
        }
      }

      this.printSummary();
    } catch (error) {
      console.error('💥 Migration failed:', error);
      process.exit(1);
    }
  }
  async migratePost(postSlug) {
    console.log(`\n📝 Migrating post: ${postSlug}`);
    
    const postDir = path.join(POSTS_DIR, postSlug);
    const metadataPath = path.join(postDir, 'metadata.ts');
    
    // Read metadata
    if (!fs.existsSync(metadataPath)) {
      throw new Error(`Metadata file not found: ${metadataPath}`);
    }

    const metadata = await this.extractMetadata(metadataPath, postSlug);
    console.log(`📋 Metadata extracted: ${metadata.title}`);

    if (metadata.isSeries && metadata.seriesData) {
      // For series, create individual posts for each part
      await this.migrateSeriesPosts(postDir, metadata);
    } else {
      // For single posts, migrate normally
      await this.migrateSinglePost(postDir, metadata);
    }
  }

  async migrateSinglePost(postDir, metadata) {
    const content = await this.extractContent(postDir, metadata);
    console.log(`📄 Content extracted: ${content.length} characters`);

    const postData = {
      slug: metadata.slug,
      title: metadata.title,
      excerpt: metadata.excerpt,
      content: content,
      tags: metadata.tags || [],
      authorId: metadata.author || 'system',
      published: metadata.published !== false,
      isSeries: false,
      seo: metadata.seo || {},
      readingTime: this.calculateReadTime(content),
      createdAt: metadata.publishedAt || new Date().toISOString(),
      source: 'migration',
    };

    await this.uploadToMongoDB(postData);
    console.log(`✅ Successfully migrated: ${metadata.slug}`);
  }

  async migrateSeriesPosts(postDir, metadata) {
    const parts = metadata.seriesData.parts || [];
    console.log(`📚 Migrating series with ${parts.length} parts`);

    for (const part of parts) {
      try {
        await this.migrateSeriesPart(postDir, metadata, part);
        console.log(`✅ Successfully migrated part ${part.order}: ${part.title}`);
      } catch (error) {
        console.error(`❌ Failed to migrate part ${part.order}:`, error.message);
        throw error;
      }
    }
  }

  async migrateSeriesPart(postDir, seriesMetadata, part) {
    const partSlug = part.order === 1 ? seriesMetadata.slug : `${seriesMetadata.slug}/part-${part.order}`;
    
    let content = '';
    
    if (part.order === 1) {
      // Main series intro
      const contentFile = path.join(postDir, 'content.mdx');
      if (fs.existsSync(contentFile)) {
        const fileContent = fs.readFileSync(contentFile, 'utf8');
        const parsed = matter(fileContent);
        content = parsed.content;
      } else {
        content = this.generateSeriesIntroContent(seriesMetadata);
      }
    } else {
      // Individual part
      const partFile = path.join(postDir, `part-${part.order}.mdx`);
      if (fs.existsSync(partFile)) {
        const partContent = fs.readFileSync(partFile, 'utf8');
        const parsed = matter(partContent);
        content = parsed.content;
      } else {
        throw new Error(`Part file not found: ${partFile}`);
      }
    }

    const postData = {
      slug: partSlug,
      title: part.title,
      excerpt: part.order === 1 ? seriesMetadata.excerpt : `Part ${part.order} of ${seriesMetadata.title}`,
      content: content,
      tags: [...(seriesMetadata.tags || []), 'series'],
      authorId: seriesMetadata.author || 'system',
      published: true,
      isSeries: true,
      seriesData: {
        name: seriesMetadata.seriesData.name,
        order: part.order,
        total: seriesMetadata.seriesData.total,
        mainSlug: seriesMetadata.slug,
        parts: seriesMetadata.seriesData.parts.map(p => ({
          order: p.order,
          slug: p.order === 1 ? seriesMetadata.slug : `${seriesMetadata.slug}/part-${p.order}`,
          title: p.title
        }))
      },
      seo: {},
      readingTime: this.calculateReadTime(content),
      createdAt: seriesMetadata.publishedAt || new Date().toISOString(),
      source: 'migration',
    };

    await this.uploadToMongoDB(postData);
  }

  calculateReadTime(content) {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return `${Math.max(1, readTime)} min read`;
  }
  async extractMetadata(metadataPath, slug) {
    const content = fs.readFileSync(metadataPath, 'utf8');
    
    // Parse TypeScript metadata file by importing it dynamically
    try {
      // Import the metadata module
      const metadataUrl = `file://${metadataPath}`;
      const module = await import(metadataUrl);
      const metadata = module.metadata;
      
      const result = {
        slug: slug,
        title: metadata.title,
        excerpt: metadata.excerpt,
        tags: metadata.tags || [],
        publishedAt: metadata.date,
        author: metadata.author || 'Abstract Algorithms',
        readingTime: '5 min read', // Default, will be calculated from content
        isSeries: !!metadata.series,
        published: true, // Default to published
      };

      // Extract series data if it's a series
      if (metadata.series) {
        result.seriesData = {
          name: metadata.series.name,
          order: metadata.series.order,
          total: metadata.series.total,
          parts: metadata.series.parts || [],
          prev: metadata.series.prev,
          next: metadata.series.next
        };
        
        // For series, extract part filenames
        result.parts = metadata.series.parts?.map(part => `part-${part.order}`) || [];
        result.currentPart = metadata.series.order || 1;
        result.totalParts = metadata.series.total || 1;
      }

      return result;
    } catch (error) {
      console.error(`Error parsing metadata for ${slug}:`, error);
      // Fallback to basic parsing
      return this.extractMetadataFallback(content, slug);
    }
  }

  extractMetadataFallback(content, slug) {
    // Fallback parser for when dynamic import fails
    const metadata = {
      slug: slug,
      title: this.extractValue(content, 'title'),
      excerpt: this.extractValue(content, 'excerpt'),
      tags: this.extractArray(content, 'tags'),
      publishedAt: this.extractValue(content, 'date'),
      author: this.extractValue(content, 'author') || 'Abstract Algorithms',
      readingTime: '5 min read',
      isSeries: content.includes('series:'),
      published: true,
    };

    return metadata;
  }

  extractValue(content, key) {
    const regex = new RegExp(`${key}:\\s*['"\`]([^'"\`]+)['"\`]`, 'i');
    const match = content.match(regex);
    return match ? match[1] : null;
  }

  extractArray(content, key) {
    const regex = new RegExp(`${key}:\\s*\\[(.*?)\\]`, 's');
    const match = content.match(regex);
    if (!match) return [];
    
    return match[1]
      .split(',')
      .map(item => item.trim().replace(/['"`]/g, ''))
      .filter(item => item.length > 0);
  }

  extractNumber(content, key) {
    const regex = new RegExp(`${key}:\\s*(\\d+)`, 'i');
    const match = content.match(regex);
    return match ? parseInt(match[1]) : null;
  }
  async extractContent(postDir, metadata) {
    let content = '';

    if (metadata.isSeries && metadata.seriesData) {
      // Handle series posts - for system design series, we have individual part files
      console.log(`📚 Processing series: ${metadata.seriesData.name}`);
      
      if (metadata.seriesData.order === 1) {
        // For the main series post, read content.mdx or create intro content
        const contentFile = path.join(postDir, 'content.mdx');
        if (fs.existsSync(contentFile)) {
          const fileContent = fs.readFileSync(contentFile, 'utf8');
          const parsed = matter(fileContent);
          content = parsed.content;
          console.log(`📄 Loaded main series content`);
        } else {
          // Create intro content from metadata
          content = this.generateSeriesIntroContent(metadata);
          console.log(`📝 Generated series intro content`);
        }
      } else {
        // For individual parts, read the specific part file
        const partFile = path.join(postDir, `part-${metadata.seriesData.order}.mdx`);
        if (fs.existsSync(partFile)) {
          const partContent = fs.readFileSync(partFile, 'utf8');
          const parsed = matter(partContent);
          content = parsed.content;
          console.log(`📄 Loaded part ${metadata.seriesData.order} content`);
        } else {
          throw new Error(`Part file not found: ${partFile}`);
        }
      }

    } else {
      // Handle single posts
      const contentFile = path.join(postDir, 'content.mdx');
      if (fs.existsSync(contentFile)) {
        const fileContent = fs.readFileSync(contentFile, 'utf8');
        const parsed = matter(fileContent);
        content = parsed.content;
        console.log(`📄 Loaded single post content`);
      } else {
        console.warn(`⚠️ Content file not found: ${contentFile}`);
        content = metadata.excerpt || 'Content not found';
      }
    }

    return content;
  }

  generateSeriesIntroContent(metadata) {
    const parts = metadata.seriesData.parts || [];
    const partsList = parts.map(part => `${part.order}. ${part.title}`).join('\n');
    
    return `# ${metadata.title}

${metadata.excerpt}

## Series Overview

This comprehensive series covers:

${partsList}

Each part builds upon the previous one, providing you with a complete understanding of system design principles and best practices.

## What You'll Learn

- System design methodology and approach
- Real-world system design examples
- Scalability patterns and techniques
- Performance optimization strategies
- Best practices for distributed systems

Ready to dive in? Let's start with the fundamentals and work our way up to complex distributed systems!`;
  }

  async uploadToMongoDB(postData) {
    const response = await fetch(`${SERVER_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Upload failed');
    }

    return result;
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successful migrations: ${this.successCount}`);
    console.log(`❌ Failed migrations: ${this.errorCount}`);
    console.log(`📊 Total posts processed: ${this.successCount + this.errorCount}`);
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      this.errors.forEach(error => {
        console.log(`  • ${error.post}: ${error.error}`);
      });
    }

    console.log('\n🎉 Migration completed!');
  }
}

// Run migration if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const migrator = new PostMigrator();
  migrator.migrateAllPosts().catch(error => {
    console.error('💥 Migration script failed:', error);
    process.exit(1);
  });
}

export { PostMigrator };
