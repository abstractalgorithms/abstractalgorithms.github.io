'use client'

import { useState, useEffect, useCallback } from 'react'
import { List, ChevronRight, ChevronDown, Hash } from 'lucide-react'

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
  const [isExpanded, setIsExpanded] = useState(false)  // Extract headings from the DOM
  const extractHeadings = useCallback(() => {
    // First, try to find the specific prose container with the main article content
    // Look for the prose container that contains the actual MDX content
    let contentContainer = document.querySelector('.prose')
    
    // If multiple prose containers exist, find the one with the most headings (likely the main content)
    const proseContainers = document.querySelectorAll('.prose')
    if (proseContainers.length > 1) {
      let maxHeadings = 0
      proseContainers.forEach(container => {
        const headingCount = container.querySelectorAll('h1, h2, h3, h4, h5, h6').length
        if (headingCount > maxHeadings) {
          maxHeadings = headingCount
          contentContainer = container
        }
      })
    }
    
    // If no prose container found, try other main content selectors
    if (!contentContainer) {
      contentContainer = document.querySelector('main article, .content, [role="main"]')
    }
    
    if (!contentContainer) {
      // Last resort: look in the entire document but with strict filtering
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const items: TocItem[] = []

      headings.forEach((heading, index) => {
        // Skip headings that are clearly not part of main content
        const excludeSelectors = [
          'nav', 'aside', 'footer', 'header', 
          '.sidebar', '.navigation', '.toc', '.menu',
          '.related-posts', '.comments', '.giscus',
          '.post-header', '.series-nav'
        ]
        
        const parentElement = heading.closest(excludeSelectors.join(', '))
        if (parentElement) return

        const level = parseInt(heading.tagName.charAt(1))
        const text = heading.textContent?.trim() || ''
        
        // Skip empty headings, h1 (main title), or common non-content terms
        if (!text || level === 1) return
        
        // Skip common UI/navigation text that shouldn't be in TOC
        const skipTerms = [
          'what\'s next', 'navigation', 'about', 'topics', 'menu', 'sidebar', 
          'footer', 'header', 'related posts', 'comments', 'share', 'subscribe',
          'follow', 'contact', 'more articles', 'recent posts', 'popular posts'
        ]
        if (skipTerms.some(term => text.toLowerCase().includes(term))) return

        let id = heading.id

        // Create an ID if one doesn't exist
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '')
          
          // Ensure uniqueness
          const existingIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id)
          let uniqueId = id
          let counter = 1
          while (existingIds.includes(uniqueId)) {
            uniqueId = `${id}-${counter}`
            counter++
          }
          
          id = uniqueId
          heading.id = id
        }

        items.push({ id, text, level })
      })

      setTocItems(items)
      return
    }

    // Extract headings from the specific content container
    const headings = contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const items: TocItem[] = []

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      const text = heading.textContent?.trim() || ''
      
      // Skip empty headings or h1 (main title)
      if (!text || level === 1) return

      let id = heading.id

      // Create an ID if one doesn't exist
      if (!id) {
        id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/^-+|-+$/g, '')
        
        // Ensure uniqueness
        const existingIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id)
        let uniqueId = id
        let counter = 1
        while (existingIds.includes(uniqueId)) {
          uniqueId = `${id}-${counter}`
          counter++
        }
        
        id = uniqueId
        heading.id = id
      }

      items.push({ id, text, level })
    })

    setTocItems(items)
  }, [])

  // Initialize TOC items
  useEffect(() => {
    // Extract headings immediately
    extractHeadings()

    // Also extract after a delay to catch dynamically loaded content
    const timeoutId = setTimeout(extractHeadings, 1000)

    // Re-extract when content changes
    const observer = new MutationObserver(() => {
      extractHeadings()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    })

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [content, extractHeadings])

  // Track active heading with intersection observer
  useEffect(() => {
    if (tocItems.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting)
        
        if (visibleEntries.length > 0) {
          // Find the most visible heading (highest intersection ratio)
          const mostVisible = visibleEntries.reduce((prev, current) => {
            return current.intersectionRatio > prev.intersectionRatio ? current : prev
          })
          setActiveId(mostVisible.target.id)
        } else {
          // If no headings are visible, find the closest one above the viewport
          const scrollPosition = window.scrollY + 120
          let closestId = ''
          let closestDistance = Infinity

          tocItems.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) {
              const distance = Math.abs(element.offsetTop - scrollPosition)
              if (element.offsetTop <= scrollPosition && distance < closestDistance) {
                closestDistance = distance
                closestId = id
              }
            }
          })

          if (closestId) {
            setActiveId(closestId)
          }
        }
      },
      {
        rootMargin: '-100px 0px -50%',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
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
      // Calculate offset accounting for sticky headers
      const headerOffset = 120
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerOffset
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
      
      // Update active ID immediately for responsive feedback
      setActiveId(id)
      
      // Collapse mobile menu after selection
      if (window.innerWidth < 768) {
        setIsExpanded(false)
      }
      
      // Add highlight effect
      element.classList.add('bg-yellow-100', 'transition-colors', 'duration-1000')
      setTimeout(() => {
        element.classList.remove('bg-yellow-100')
        setTimeout(() => {
          element.classList.remove('transition-colors', 'duration-1000')
        }, 1000)
      }, 2000)
    }
  }

  // Don't render if no headings found
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

  const getLevelStyles = (level: number, isActive: boolean) => {
    const baseStyles = 'block w-full text-left py-2.5 px-3 rounded-lg text-sm transition-all duration-200 border-l-4 group'
    
    if (isActive) {
      return `${baseStyles} bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 font-semibold border-blue-500 shadow-sm`
    }
    
    switch (level) {
      case 2:
        return `${baseStyles} text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-transparent hover:border-gray-300 font-medium`
      case 3:
        return `${baseStyles} text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-transparent hover:border-gray-300`
      case 4:
        return `${baseStyles} text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent hover:border-gray-200 text-xs`
      default:
        return `${baseStyles} text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent hover:border-gray-200 text-xs`
    }
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ${className}`}>
      {/* Mobile Toggle Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left lg:hidden bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <List className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-800">Table of Contents</span>
          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
            {tocItems.length}
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-600 transition-transform duration-200" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-600 transition-transform duration-200" />
        )}
      </button>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center gap-3">
          <List className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-800">Table of Contents</span>
        </div>
        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
          {tocItems.length} {tocItems.length === 1 ? 'section' : 'sections'}
        </span>
      </div>

      {/* TOC Navigation */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <nav className="p-4 max-h-80 lg:max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="space-y-1">
            {tocItems.map(({ id, text, level }) => (
              <button
                key={id}
                onClick={() => scrollToHeading(id)}
                className={`
                  ${getLevelStyles(level, activeId === id)}
                  ${getIndentClass(level)}
                  hover:translate-x-1
                `}
                title={`Jump to: ${text}`}
              >
                <div className="flex items-center gap-2">
                  <Hash className="w-3 h-3 opacity-40 group-hover:opacity-60 transition-opacity" />
                  <span className="truncate">{text}</span>
                </div>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Footer for desktop */}
      {tocItems.length > 5 && (
        <div className="hidden lg:block p-3 border-t border-gray-200 bg-gray-50 text-center">
          <span className="text-xs text-gray-500">
            Click any section to jump directly to it
          </span>
        </div>      )}
    </div>
  )
}
