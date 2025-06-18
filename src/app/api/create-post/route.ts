import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      contentType, 
      basicInfo, 
      seriesInfo, 
      content, 
      images 
    } = body

    const slug = generateSlug(basicInfo.title)
    const projectRoot = process.cwd()
    
    // Create the post directory structure
    const postDir = path.join(projectRoot, 'src', 'posts', slug)
    const assetsDir = path.join(projectRoot, 'public', 'posts', slug, 'assets')
    
    // Ensure directories exist
    await fs.mkdir(postDir, { recursive: true })
    if (images && images.length > 0) {
      await fs.mkdir(assetsDir, { recursive: true })
    }
    
    // Generate metadata.ts
    let metadata: any
    
    if (contentType === 'series') {
      metadata = {
        ...basicInfo,
        series: {
          name: seriesInfo.name,
          description: seriesInfo.description,
          total: seriesInfo.total,
          order: seriesInfo.order,
          parts: seriesInfo.parts.map((part: any) => ({
            order: part.order,
            title: part.title,
            slug: part.slug || generateSlug(part.title)
          }))
        }
      }
    } else {
      metadata = basicInfo
    }
    
    const metadataContent = `export const metadata = ${JSON.stringify(metadata, null, 2)}
`
    
    // Write metadata.ts
    const metadataPath = path.join(postDir, 'metadata.ts')
    await fs.writeFile(metadataPath, metadataContent)
    
    // Process content and add image references
    let processedContent = content
    if (images && images.length > 0) {
      const imageReferences = images.map((img: any) => {
        const imagePath = `./assets/${img.name}`
        return `![${img.altText || img.name}](${imagePath})`
      }).join('\n\n')
      
      processedContent = `${content}\n\n${imageReferences}`
    }
    
    // Write content.mdx
    const contentPath = path.join(postDir, 'content.mdx')
    await fs.writeFile(contentPath, processedContent)
    
    // Handle image files (in a real implementation, you'd need to process the uploaded files)
    // For now, we'll return the structure information
    
    return NextResponse.json({
      success: true,
      message: 'Post created successfully!',
      postPath: `src/posts/${slug}`,
      files: [
        'metadata.ts',
        'content.mdx',
        ...(images && images.length > 0 ? ['assets/ (images folder)'] : [])
      ]
    })
    
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
