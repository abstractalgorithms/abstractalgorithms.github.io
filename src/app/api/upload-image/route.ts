import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File
    const postSlug = formData.get('postSlug') as string
    const altText = formData.get('altText') as string || ''
    
    if (!file || !postSlug) {
      return NextResponse.json(
        { success: false, error: 'File and post slug are required' },
        { status: 400 }
      )
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Only image files are allowed' },
        { status: 400 }
      )
    }
    
    // Create assets directory
    const projectRoot = process.cwd()
    const assetsDir = path.join(projectRoot, 'public', 'posts', postSlug, 'assets')
    await fs.mkdir(assetsDir, { recursive: true })
    
    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name
    const extension = path.extname(originalName)
    const baseName = path.basename(originalName, extension)
    const filename = `${baseName}-${timestamp}${extension}`
    
    // Save file
    const filePath = path.join(assetsDir, filename)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.writeFile(filePath, buffer)
    
    // Return file info
    return NextResponse.json({
      success: true,
      filename,
      path: `/posts/${postSlug}/assets/${filename}`,
      altText,
      size: file.size
    })
    
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
