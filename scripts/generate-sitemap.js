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
    const metadataPath = path.join(postsDirectory, dir, 'metadata.ts')
    
    if (fs.existsSync(metadataPath)) {
      try {
        const metadataContent = fs.readFileSync(metadataPath, 'utf8')
        const titleMatch = metadataContent.match(/title:\s*"([^"]*)"/)
        const dateMatch = metadataContent.match(/date:\s*"([^"]*)"/)
        
        if (titleMatch && dateMatch) {
          posts.push({
            title: titleMatch[1],
            date: dateMatch[1],
            slug: dir
          })
        }
      } catch (error) {
        console.warn(`Error reading metadata for ${dir}:`, error)
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

  console.log(`✅ Sitemap generated with ${posts.length} posts`)
  console.log(`📁 Written to: ${sitemapPath}`)
}

// Run the script
generateSitemap().catch(console.error)
