import fs from 'fs'
import path from 'path'

async function generateSitemap() {
  const postsDirectory = path.join(process.cwd(), 'src/posts')
  const posts = []

  // Read all post directories
  const postDirs = fs.readdirSync(postsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  // Extract metadata from each post
  for (const dir of postDirs) {
    const dirPath = path.join(postsDirectory, dir)
    
    // Check for series landing page (metadata.ts)
    const metadataPath = path.join(dirPath, 'metadata.ts')
    if (fs.existsSync(metadataPath)) {
      try {
        const metadataContent = fs.readFileSync(metadataPath, 'utf8')
        const titleMatch = metadataContent.match(/title:\s*"([^"]*)"/)
        const dateMatch = metadataContent.match(/date:\s*"([^"]*)"/)
        
        if (titleMatch && dateMatch) {
          posts.push({
            title: titleMatch[1],
            date: dateMatch[1],
            slug: dir,
            type: 'series'
          })
        }
      } catch (error) {
        console.warn(`Error reading metadata for ${dir}:`, error)
      }
    }
    
    // Check for individual MDX files (series parts)
    const files = fs.readdirSync(dirPath, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && dirent.name.endsWith('.mdx'))
      .map(dirent => dirent.name)
    
    for (const file of files) {
      if (file === 'content.mdx') continue // Skip main content file, use metadata.ts instead
      
      const filePath = path.join(dirPath, file)
      try {
        const content = fs.readFileSync(filePath, 'utf8')
        const metadataMatch = content.match(/export const metadata = \{([\s\S]*?)\}/)
        
        if (metadataMatch) {
          const metadataContent = metadataMatch[1]
          const titleMatch = metadataContent.match(/title:\s*"([^"]*)"/)
          const dateMatch = metadataContent.match(/date:\s*"([^"]*)"/)
          
          if (titleMatch && dateMatch) {
            const fileName = file.replace('.mdx', '')
            posts.push({
              title: titleMatch[1],
              date: dateMatch[1],
              slug: `${dir}/${fileName}`,
              type: 'part'
            })
          }
        }
      } catch (error) {
        console.warn(`Error reading ${file} in ${dir}:`, error)
      }
    }
  }

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Generate sitemap XML
  const baseUrl = 'https://abstractalgorithms.github.io'
  const currentDate = new Date().toISOString().split('T')[0]

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Home Page -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- About Page -->
  <url>
    <loc>${baseUrl}/about/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog Posts -->`

  // Add all posts
  posts.forEach(post => {
    sitemapXml += `
  <url>
    <loc>${baseUrl}/posts/${post.slug}/</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`
  })

  sitemapXml += `
</urlset>`
  // Write sitemap to public directory
  const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml')
  fs.writeFileSync(sitemapPath, sitemapXml)

  const seriesPosts = posts.filter(p => p.type === 'series')
  const partPosts = posts.filter(p => p.type === 'part')

  console.log(`✅ Sitemap generated with ${posts.length} total entries`)
  console.log(`   - ${seriesPosts.length} series landing pages`)
  console.log(`   - ${partPosts.length} individual parts`)
  console.log(`📁 Written to: ${sitemapPath}`)
}

// Run the script
generateSitemap().catch(console.error)
