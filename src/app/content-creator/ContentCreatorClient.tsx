'use client'

import React, { useState, useCallback, useRef } from 'react'
import MDXPreview from '../../components/MDXPreview'
import { 
  BookOpen, 
  FileText, 
  Upload, 
  Download, 
  Check, 
  AlertCircle, 
  ChevronRight,
  ChevronLeft,
  Image as ImageIcon,
  X,
  Plus,
  Minus,
  Eye,
  Code,
  Save,
  Loader2,
  FolderPlus,
  File,
  Calendar,
  Tag,
  User,
  Lightbulb,
  List
} from 'lucide-react'

// Types
interface PostMetadata {
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  coverImage?: string
}

interface SeriesMetadata extends PostMetadata {
  series: {
    name: string
    description: string
    total: number
    order: number
    parts: Array<{
      order: number
      title: string
      slug: string
    }>
  }
}

interface UploadedImage {
  file: File
  name: string
  url: string
  altText: string
}

interface ContentStep {
  id: string
  title: string
  description: string
  completed: boolean
}

const CONTENT_TYPES = {
  INDEPENDENT: 'independent',
  SERIES: 'series'
} as const

type ContentType = typeof CONTENT_TYPES[keyof typeof CONTENT_TYPES]

// Step definitions
const INDEPENDENT_STEPS: ContentStep[] = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Title, author, date, and description',
    completed: false
  },
  {
    id: 'content',
    title: 'Content Creation',
    description: 'Write your article content in MDX',
    completed: false
  },
  {
    id: 'images',
    title: 'Images & Assets',
    description: 'Upload and manage images for your post',
    completed: false
  },
  {
    id: 'preview',
    title: 'Preview & Generate',
    description: 'Review and generate your post files',
    completed: false
  }
]

const SERIES_STEPS: ContentStep[] = [
  {
    id: 'series-info',
    title: 'Series Information',
    description: 'Series name, description, and structure',
    completed: false
  },
  {
    id: 'basic-info',
    title: 'Post Information',
    description: 'This post\'s title, author, and description',
    completed: false
  },
  {
    id: 'content',
    title: 'Content Creation',
    description: 'Write your article content in MDX',
    completed: false
  },
  {
    id: 'images',
    title: 'Images & Assets',
    description: 'Upload and manage images for your post',
    completed: false
  },
  {
    id: 'preview',
    title: 'Preview & Generate',
    description: 'Review and generate your post files',
    completed: false
  }
]

const PREDEFINED_TAGS = [
  'algorithms', 'data-structures', 'system-design', 'performance', 'optimization',
  'databases', 'sql', 'nosql', 'big-o', 'complexity', 'hash-tables', 'b-tree',
  'scalability', 'architecture', 'interview', 'javascript', 'typescript', 'python',
  'react', 'next.js', 'node.js', 'web-development', 'backend', 'frontend',
  'devops', 'cloud', 'aws', 'docker', 'kubernetes', 'terraform', 'infrastructure',
  'security', 'authentication', 'authorization', 'testing', 'ci-cd',
  'machine-learning', 'ai', 'deep-learning', 'neural-networks'
]

export default function ContentCreatorClient() {
  // State management
  const [contentType, setContentType] = useState<ContentType | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationComplete, setGenerationComplete] = useState(false)
  
  // Form data
  const [basicInfo, setBasicInfo] = useState<PostMetadata>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    author: 'Abstract Algorithms',
    tags: [],
    coverImage: undefined
  })
  
  const [seriesInfo, setSeriesInfo] = useState({
    name: '',
    description: '',
    total: 1,
    order: 1,
    parts: [{ order: 1, title: '', slug: '' }]
  })
  
  const [content, setContent] = useState('')
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [generatedFiles, setGeneratedFiles] = useState<Array<{
    name: string
    content: string
    type: 'typescript' | 'mdx' | 'folder'
  }>>([])
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Helper functions
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
  
  const steps = contentType === CONTENT_TYPES.SERIES ? SERIES_STEPS : INDEPENDENT_STEPS
  
  const canProceed = () => {
    const step = steps[currentStep]
    if (!step) return false
    
    switch (step.id) {
      case 'basic-info':
        return basicInfo.title && basicInfo.excerpt && basicInfo.author
      case 'series-info':
        return seriesInfo.name && seriesInfo.description && seriesInfo.parts.length > 0
      case 'content':
        return content.trim().length > 0
      case 'images':
        return true // Images are optional
      case 'preview':
        return true
      default:
        return false
    }
  }
  
  const markStepCompleted = (stepIndex: number) => {
    // This would be used to update step completion status
  }
  
  // Image handling
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file)
        const image: UploadedImage = {
          file,
          name: file.name,
          url,
          altText: ''
        }
        setImages(prev => [...prev, image])
      }
    })
  }, [])
  
  const removeImage = useCallback((index: number) => {
    setImages(prev => {
      const image = prev[index]
      URL.revokeObjectURL(image.url)
      return prev.filter((_, i) => i !== index)
    })
  }, [])
  
  const updateImageAltText = useCallback((index: number, altText: string) => {
    setImages(prev => prev.map((img, i) => i === index ? { ...img, altText } : img))
  }, [])
  
  // Tag management
  const addTag = (tag: string) => {
    if (tag && !basicInfo.tags.includes(tag)) {
      setBasicInfo(prev => ({ ...prev, tags: [...prev.tags, tag] }))
    }
  }
  
  const removeTag = (tagToRemove: string) => {
    setBasicInfo(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }
  
  // Series part management
  const addSeriesPart = () => {
    const newOrder = seriesInfo.parts.length + 1
    setSeriesInfo(prev => ({
      ...prev,
      total: newOrder,
      parts: [...prev.parts, { order: newOrder, title: '', slug: '' }]
    }))
  }
  
  const removeSeriesPart = (index: number) => {
    if (seriesInfo.parts.length > 1) {
      setSeriesInfo(prev => {
        const newParts = prev.parts.filter((_, i) => i !== index)
          .map((part, i) => ({ ...part, order: i + 1 }))
        return {
          ...prev,
          total: newParts.length,
          parts: newParts
        }
      })
    }
  }
  
  const updateSeriesPart = (index: number, field: 'title' | 'slug', value: string) => {
    setSeriesInfo(prev => ({
      ...prev,
      parts: prev.parts.map((part, i) => 
        i === index ? { ...part, [field]: value } : part
      )
    }))
  }
    // File generation
  const generateFiles = async () => {
    setIsGenerating(true)
    
    try {
      const slug = generateSlug(basicInfo.title)
      
      // Option 1: Create files locally in the project (recommended for development)
      const response = await fetch('/api/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType,
          basicInfo,
          seriesInfo,
          content,
          images: images.map(img => ({
            name: img.name,
            altText: img.altText
          }))
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        // Also generate downloadable files for backup
        const files: Array<{ name: string; content: string; type: 'typescript' | 'mdx' | 'folder' }> = []
        
        // Generate metadata.ts
        let metadata: PostMetadata | SeriesMetadata
        
        if (contentType === CONTENT_TYPES.SERIES) {
          metadata = {
            ...basicInfo,
            series: {
              name: seriesInfo.name,
              description: seriesInfo.description,
              total: seriesInfo.total,
              order: seriesInfo.order,
              parts: seriesInfo.parts.map(part => ({
                order: part.order,
                title: part.title,
                slug: part.slug || generateSlug(part.title)
              }))
            }
          } as SeriesMetadata
        } else {
          metadata = basicInfo
        }
        
        const metadataContent = `export const metadata = ${JSON.stringify(metadata, null, 2)}
`
        
        files.push({
          name: 'metadata.ts',
          content: metadataContent,
          type: 'typescript'
        })
        
        // Generate content.mdx
        let mdxContent = content
        
        // Add image references if images are uploaded
        if (images.length > 0) {
          const imageReferences = images.map(img => {
            const imagePath = `./assets/${img.name}`
            return `![${img.altText || img.name}](${imagePath})`
          }).join('\n\n')
          
          mdxContent = `${mdxContent}\n\n${imageReferences}`
        }
        
        files.push({
          name: 'content.mdx',
          content: mdxContent,
          type: 'mdx'
        })
        
        // Generate success message with instructions
        files.push({
          name: 'Success Instructions',
          content: `✅ POST CREATED SUCCESSFULLY!

Your post has been created at: ${result.postPath}

Files created:
${result.files.map((file: string) => `✓ ${file}`).join('\n')}

Next steps:
1. ${images.length > 0 ? 'Upload your images to public/posts/' + slug + '/assets/' : 'Your post is ready!'}
2. Run: npm run build:check
3. Run: npm run dev
4. Visit: http://localhost:3000/posts/${slug}

${images.length > 0 ? `
Images to upload:
${images.map(img => `• ${img.name} (${img.altText || 'No alt text'})`).join('\n')}

Place these images in: public/posts/${slug}/assets/
` : ''}

Happy blogging! 🎉`,
          type: 'folder'
        })
        
        setGeneratedFiles(files)
        setGenerationComplete(true)
      } else {
        throw new Error(result.error || 'Failed to create post')
      }
    } catch (error) {
      console.error('Error generating files:', error)
      // Fallback to client-side generation
      const slug = generateSlug(basicInfo.title)
      const files: Array<{ name: string; content: string; type: 'typescript' | 'mdx' | 'folder' }> = []
      
      // Generate metadata.ts
      let metadata: PostMetadata | SeriesMetadata
      
      if (contentType === CONTENT_TYPES.SERIES) {
        metadata = {
          ...basicInfo,
          series: {
            name: seriesInfo.name,
            description: seriesInfo.description,
            total: seriesInfo.total,
            order: seriesInfo.order,
            parts: seriesInfo.parts.map(part => ({
              order: part.order,
              title: part.title,
              slug: part.slug || generateSlug(part.title)
            }))
          }
        } as SeriesMetadata
      } else {
        metadata = basicInfo
      }
      
      const metadataContent = `export const metadata = ${JSON.stringify(metadata, null, 2)}
`
      
      files.push({
        name: 'metadata.ts',
        content: metadataContent,
        type: 'typescript'
      })
      
      // Generate content.mdx
      let mdxContent = content
      
      // Add image references if images are uploaded
      if (images.length > 0) {
        const imageReferences = images.map(img => {
          const imagePath = `./assets/${img.name}`
          return `![${img.altText || img.name}](${imagePath})`
        }).join('\n\n')
        
        mdxContent = `${mdxContent}\n\n${imageReferences}`
      }
      
      files.push({
        name: 'content.mdx',
        content: mdxContent,
        type: 'mdx'
      })
      
      // Generate manual setup instructions
      files.push({
        name: 'Manual Setup Instructions',
        content: `📝 MANUAL SETUP REQUIRED

Create the following folder structure manually:

src/posts/${slug}/
├── metadata.ts
└── content.mdx

${images.length > 0 ? `public/posts/${slug}/
└── assets/
${images.map(img => `    ├── ${img.name}`).join('\n')}` : ''}

Steps:
1. Create the folder: src/posts/${slug}/
2. Download and place metadata.ts and content.mdx in that folder
${images.length > 0 ? `3. Create folder: public/posts/${slug}/assets/
4. Save and place your uploaded images in the assets folder` : ''}
${images.length > 0 ? '5.' : '3.'} Run: npm run build:check
${images.length > 0 ? '6.' : '4.'} Run: npm run dev
${images.length > 0 ? '7.' : '5.'} Visit: http://localhost:3000/posts/${slug}

Note: Automatic file creation failed, but you can download and set up manually.`,
        type: 'folder'
      })
      
      setGeneratedFiles(files)
      setGenerationComplete(true)
    } finally {
      setIsGenerating(false)
    }
  }
  
  // Download functionality
  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  const downloadAllFiles = () => {
    generatedFiles.forEach(file => {
      if (file.type !== 'folder') {
        downloadFile(file.name, file.content)
      }
    })
  }
  
  // Navigation
  const nextStep = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      markStepCompleted(currentStep)
      setCurrentStep(currentStep + 1)
    }
  }
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  // Reset function
  const resetCreator = () => {
    setContentType(null)
    setCurrentStep(0)
    setBasicInfo({
      title: '',
      date: new Date().toISOString().split('T')[0],
      excerpt: '',
      author: 'Abstract Algorithms',
      tags: [],
      coverImage: undefined
    })
    setSeriesInfo({
      name: '',
      description: '',
      total: 1,
      order: 1,
      parts: [{ order: 1, title: '', slug: '' }]
    })
    setContent('')
    setImages([])
    setGeneratedFiles([])
    setGenerationComplete(false)
    setIsGenerating(false)
  }

  // Render content type selection
  if (!contentType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Content Creator
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Create professional blog posts and learning series for your Abstract Algorithms website
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Independent Post */}
              <div
                onClick={() => setContentType(CONTENT_TYPES.INDEPENDENT)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 cursor-pointer group border-2 border-transparent hover:border-blue-200"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Independent Article
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create a standalone blog post covering a specific topic, algorithm, or concept. Perfect for focused, in-depth articles.
                  </p>
                  <div className="flex items-center justify-center text-blue-600 font-medium">
                    Get Started
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
              
              {/* Learning Series */}
              <div
                onClick={() => setContentType(CONTENT_TYPES.SERIES)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 cursor-pointer group border-2 border-transparent hover:border-green-200"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                    <BookOpen className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Learning Series
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create a multi-part learning series with structured navigation. Ideal for comprehensive guides and step-by-step tutorials.
                  </p>
                  <div className="flex items-center justify-center text-green-600 font-medium">
                    Get Started
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">What you'll create:</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <File className="w-4 h-4 mr-2 text-blue-500" />
                  Metadata file (TypeScript)
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-green-500" />
                  Content file (MDX)
                </div>
                <div className="flex items-center">
                  <FolderPlus className="w-4 h-4 mr-2 text-orange-500" />
                  Optimized folder structure
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main creator interface
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={resetCreator}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Content Types
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-2xl font-bold text-gray-900">
                {contentType === CONTENT_TYPES.SERIES ? 'Learning Series' : 'Independent Article'}
              </h1>
            </div>
            
            {generationComplete && (
              <button
                onClick={downloadAllFiles}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All Files
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Steps */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <h3 className="font-semibold text-gray-900 mb-4">Progress</h3>
                <div className="space-y-3">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      onClick={() => goToStep(index)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        index === currentStep
                          ? 'bg-blue-50 border-blue-200 border'
                          : index < currentStep
                          ? 'bg-green-50 border-green-200 border'
                          : 'bg-gray-50 border-gray-200 border hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-3 ${
                          index === currentStep
                            ? 'bg-blue-600 text-white'
                            : index < currentStep
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {index < currentStep ? <Check className="w-3 h-3" /> : index + 1}
                        </div>
                        <div>
                          <div className={`font-medium text-sm ${
                            index === currentStep ? 'text-blue-900' : 
                            index < currentStep ? 'text-green-900' : 'text-gray-700'
                          }`}>
                            {step.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {step.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* Step Content */}
                <div className="p-8">
                  {steps[currentStep]?.id === 'series-info' && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Series Information</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Series Name *
                          </label>
                          <input
                            type="text"
                            value={seriesInfo.name}
                            onChange={(e) => setSeriesInfo(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g., Learning Algorithms, Database Fundamentals"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Series Description *
                          </label>
                          <textarea
                            value={seriesInfo.description}
                            onChange={(e) => setSeriesInfo(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Describe what this series covers and what readers will learn"
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            This Post's Order in Series
                          </label>
                          <select
                            value={seriesInfo.order}
                            onChange={(e) => setSeriesInfo(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {Array.from({ length: seriesInfo.total }, (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                Part {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Series Structure
                            </label>
                            <button
                              onClick={addSeriesPart}
                              className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add Part
                            </button>
                          </div>
                          
                          <div className="space-y-3">
                            {seriesInfo.parts.map((part, index) => (
                              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                                  {part.order}
                                </div>
                                <input
                                  type="text"
                                  value={part.title}
                                  onChange={(e) => updateSeriesPart(index, 'title', e.target.value)}
                                  placeholder="Part title"
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {seriesInfo.parts.length > 1 && (
                                  <button
                                    onClick={() => removeSeriesPart(index)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {steps[currentStep]?.id === 'basic-info' && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {contentType === CONTENT_TYPES.SERIES ? 'Post Information' : 'Basic Information'}
                      </h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FileText className="w-4 h-4 inline mr-2" />
                            Title *
                          </label>
                          <input
                            type="text"
                            value={basicInfo.title}
                            onChange={(e) => setBasicInfo(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter a compelling title for your post"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <User className="w-4 h-4 inline mr-2" />
                            Author *
                          </label>
                          <input
                            type="text"
                            value={basicInfo.author}
                            onChange={(e) => setBasicInfo(prev => ({ ...prev, author: e.target.value }))}
                            placeholder="Author name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Publication Date
                          </label>
                          <input
                            type="date"
                            value={basicInfo.date}
                            onChange={(e) => setBasicInfo(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Lightbulb className="w-4 h-4 inline mr-2" />
                            Excerpt *
                          </label>
                          <textarea
                            value={basicInfo.excerpt}
                            onChange={(e) => setBasicInfo(prev => ({ ...prev, excerpt: e.target.value }))}
                            placeholder="A brief, engaging description of what readers will learn"
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Tag className="w-4 h-4 inline mr-2" />
                            Tags
                          </label>
                          
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-2">
                              {PREDEFINED_TAGS.slice(0, 20).map(tag => (
                                <button
                                  key={tag}
                                  onClick={() => addTag(tag)}
                                  disabled={basicInfo.tags.includes(tag)}
                                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                    basicInfo.tags.includes(tag)
                                      ? 'bg-blue-100 text-blue-700 cursor-not-allowed'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {tag}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          {basicInfo.tags.length > 0 && (
                            <div className="mb-3">
                              <div className="text-sm text-gray-600 mb-2">Selected tags:</div>
                              <div className="flex flex-wrap gap-2">
                                {basicInfo.tags.map(tag => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center"
                                  >
                                    {tag}
                                    <button
                                      onClick={() => removeTag(tag)}
                                      className="ml-2 text-blue-600 hover:text-blue-800"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {steps[currentStep]?.id === 'content' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Content Creation</h2>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setIsPreviewMode(!isPreviewMode)}
                            className={`flex items-center px-3 py-1 rounded-lg text-sm transition-colors ${
                              isPreviewMode
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {isPreviewMode ? <Code className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                            {isPreviewMode ? 'Edit' : 'Preview'}
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">MDX Tips:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Use standard Markdown syntax (headers, lists, links, etc.)</li>
                          <li>• Add code blocks with ```language</li>
                          <li>• Include images with ![alt text](./assets/image.png)</li>
                          <li>• Use React components if needed</li>
                        </ul>
                      </div>
                        {isPreviewMode ? (
                        <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 min-h-96">
                          <MDXPreview content={content} />
                        </div>
                      ) : (
                        <textarea
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Write your content in MDX format...

# Introduction

Start writing your content here. You can use:

- **Bold text** and *italic text*
- [Links](https://example.com)
- Code blocks
- Lists and more!

## Code Example

```javascript
function example() {
  return 'Hello, World!'
}
```

Remember to upload images in the next step if you want to include them!"
                          className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        />
                      )}
                    </div>
                  )}
                  
                  {steps[currentStep]?.id === 'images' && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Images & Assets</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Upload Images
                            </label>
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Images
                            </button>
                          </div>
                          
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-2">
                              Drag and drop images here, or click the upload button
                            </p>
                            <p className="text-sm text-gray-500">
                              Supports: JPG, PNG, GIF, WebP
                            </p>
                          </div>
                        </div>
                        
                        {images.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-4">Uploaded Images</h4>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {images.map((image, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                  <img
                                    src={image.url}
                                    alt={image.name}
                                    className="w-full h-32 object-cover rounded-lg mb-3"
                                  />
                                  <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-900 truncate">
                                      {image.name}
                                    </div>
                                    <input
                                      type="text"
                                      value={image.altText}
                                      onChange={(e) => updateImageAltText(index, e.target.value)}
                                      placeholder="Alt text for accessibility"
                                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                      onClick={() => removeImage(index)}
                                      className="w-full px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="p-4 bg-amber-50 rounded-lg">
                          <h4 className="font-medium text-amber-900 mb-2">Image Usage in Content:</h4>
                          <p className="text-sm text-amber-800 mb-2">
                            To reference uploaded images in your content, use:
                          </p>
                          <code className="text-sm bg-amber-100 px-2 py-1 rounded">
                            ![Alt text](./assets/filename.jpg)
                          </code>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {steps[currentStep]?.id === 'preview' && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview & Generate</h2>
                      
                      {!generationComplete ? (
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-lg p-6">
                              <h3 className="font-semibold text-gray-900 mb-4">Content Summary</h3>
                              <div className="space-y-2 text-sm">
                                <div><strong>Type:</strong> {contentType === CONTENT_TYPES.SERIES ? 'Learning Series' : 'Independent Article'}</div>
                                <div><strong>Title:</strong> {basicInfo.title}</div>
                                <div><strong>Author:</strong> {basicInfo.author}</div>
                                <div><strong>Tags:</strong> {basicInfo.tags.join(', ')}</div>
                                <div><strong>Content Length:</strong> {content.length} characters</div>
                                <div><strong>Images:</strong> {images.length} uploaded</div>
                                {contentType === CONTENT_TYPES.SERIES && (
                                  <>
                                    <div><strong>Series:</strong> {seriesInfo.name}</div>
                                    <div><strong>Part:</strong> {seriesInfo.order} of {seriesInfo.total}</div>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-6">
                              <h3 className="font-semibold text-gray-900 mb-4">Generated Files</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                  <File className="w-4 h-4 mr-2 text-blue-500" />
                                  metadata.ts
                                </div>
                                <div className="flex items-center">
                                  <FileText className="w-4 h-4 mr-2 text-green-500" />
                                  content.mdx
                                </div>
                                {images.length > 0 && (
                                  <div className="flex items-center">
                                    <FolderPlus className="w-4 h-4 mr-2 text-orange-500" />
                                    assets/ folder with {images.length} image{images.length > 1 ? 's' : ''}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <button
                              onClick={generateFiles}
                              disabled={isGenerating}
                              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              {isGenerating ? (
                                <>
                                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                  Generating Files...
                                </>
                              ) : (
                                <>
                                  <Save className="w-5 h-5 mr-2" />
                                  Generate Post Files
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="text-center p-6 bg-green-50 rounded-lg">
                            <Check className="w-12 h-12 text-green-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-green-900 mb-2">
                              Files Generated Successfully!
                            </h3>
                            <p className="text-green-700">
                              Your post files are ready for download and integration into your project.
                            </p>
                          </div>
                          
                          <div className="space-y-4">
                            {generatedFiles.map((file, index) => (
                              <div key={index} className="border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg">
                                  <div className="flex items-center">
                                    {file.type === 'typescript' && <File className="w-5 h-5 mr-2 text-blue-500" />}
                                    {file.type === 'mdx' && <FileText className="w-5 h-5 mr-2 text-green-500" />}
                                    {file.type === 'folder' && <FolderPlus className="w-5 h-5 mr-2 text-orange-500" />}
                                    <span className="font-medium text-gray-900">{file.name}</span>
                                  </div>
                                  {file.type !== 'folder' && (
                                    <button
                                      onClick={() => downloadFile(file.name, file.content)}
                                      className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                    >
                                      <Download className="w-3 h-3 mr-1" />
                                      Download
                                    </button>
                                  )}
                                </div>
                                <pre className="p-4 bg-gray-900 text-green-400 text-sm overflow-x-auto rounded-b-lg">
                                  <code>{file.content}</code>
                                </pre>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex justify-center space-x-4">
                            <button
                              onClick={downloadAllFiles}
                              className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Download className="w-5 h-5 mr-2" />
                              Download All Files
                            </button>
                            <button
                              onClick={resetCreator}
                              className="flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              <Plus className="w-5 h-5 mr-2" />
                              Create Another Post
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Navigation */}
                {!generationComplete && (
                  <div className="flex items-center justify-between p-6 bg-gray-50 border-t border-gray-200 rounded-b-xl">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="flex items-center px-4 py-2 text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      {steps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentStep
                              ? 'bg-blue-600'
                              : index < currentStep
                              ? 'bg-green-600'
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <button
                      onClick={nextStep}
                      disabled={!canProceed() || currentStep === steps.length - 1}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
