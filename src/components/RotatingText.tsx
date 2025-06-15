'use client'

import { useState, useEffect } from 'react'

interface RotatingTextProps {
  texts: string[]
  className?: string
  interval?: number
}

export default function RotatingText({ 
  texts, 
  className = '', 
  interval = 3000
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Find the longest text to set a fixed width
  const longestText = texts.reduce((longest, current) => 
    current.length > longest.length ? current : longest, texts[0]
  )
  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
        setIsVisible(true)
      }, 150)
      
    }, interval)

    return () => clearInterval(timer)
  }, [texts.length, interval])
  return (
    <span className="inline-block relative">
      {/* Invisible text to reserve space - with proper line height and padding for descenders */}
      <span 
        className="invisible select-none rotating-text-item"
        aria-hidden="true"
      >
        {longestText}
      </span>
      
      {/* Visible rotating text - positioned to align properly with baseline */}
      <span 
        className={`
          absolute top-0 left-0 right-0 flex items-start justify-center
          transition-opacity duration-150 ease-in-out rotating-text-item
          ${isVisible ? 'opacity-100' : 'opacity-0'}
          ${className}
        `}
      >
        {texts[currentIndex]}
      </span>
    </span>
  )
}
