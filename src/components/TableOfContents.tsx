'use client'

import { useState, useEffect } from 'react'
import { List, ChevronRight, ChevronDown } from 'lucide-react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content?: string
  className?: string
}

export default function TableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Extract headings from the page
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const items: TocItem[] = []

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      const text = heading.textContent || ''
      let id = heading.id

      // Create an ID if one doesn't exist
      if (!id) {
        id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
        
        // Add index to ensure uniqueness
        id = `${id}-${index}`
        heading.id = id
      }

      // Skip if this is the main title (usually h1)
      if (level === 1) return

      items.push({ id, text, level })
    })

    setTocItems(items)
  }, [content])

  useEffect(() => {
    // Set up intersection observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0.1,
      }
    )

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [tocItems])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Account for sticky header
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
      setActiveId(id)
      setIsExpanded(false) // Collapse on mobile after selection
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  const getIndentClass = (level: number) => {
    switch (level) {
      case 2: return 'pl-0'
      case 3: return 'pl-4'
      case 4: return 'pl-8'
      case 5: return 'pl-12'
      case 6: return 'pl-16'
      default: return 'pl-0'
    }
  }
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className}`}>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left md:hidden bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl hover:from-gray-100 hover:to-gray-200 transition-colors"
      >
        <div className="flex items-center gap-3">
          <List className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-800">Table of Contents</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center gap-3 p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl">
        <List className="w-5 h-5 text-gray-600" />
        <span className="font-semibold text-gray-800">Table of Contents</span>
      </div>

      {/* TOC Items */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        <nav className="p-4 space-y-1">
          {tocItems.map(({ id, text, level }) => (
            <button
              key={id}
              onClick={() => scrollToHeading(id)}
              className={`
                block w-full text-left py-3 px-4 rounded-lg text-sm transition-all duration-200
                ${getIndentClass(level)}
                ${activeId === id 
                  ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 font-semibold border-l-3 border-blue-500 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm'
                }
              `}
            >
              {text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
