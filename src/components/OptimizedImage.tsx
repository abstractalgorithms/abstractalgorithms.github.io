'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  style?: 'featured' | 'post' | 'thumbnail' | 'hero'
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  style = 'post'
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const getStyleClasses = () => {
    switch (style) {
      case 'featured':
        return 'featured-image'
      case 'post':
        return 'post-image'
      case 'thumbnail':
        return 'w-full h-auto object-cover rounded-lg'
      case 'hero':
        return 'w-full h-auto object-cover rounded-2xl shadow-2xl'
      default:
        return 'w-full h-auto object-cover rounded-lg'
    }
  }

  const baseClasses = `${getStyleClasses()} transition-all duration-300 ${
    isLoading ? 'blur-sm' : 'blur-0'
  } ${className}`

  if (hasError) {
    return (
      <div className={`${baseClasses} bg-gray-100 flex items-center justify-center`}>
        <div className="text-center text-gray-500 p-8">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Image not available</p>
        </div>
      </div>
    )
  }  return (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        alt={alt}        width={width || 400}
        height={height || 300}
        className={baseClasses}
        unoptimized={true}        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center'
        }}
      />
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
