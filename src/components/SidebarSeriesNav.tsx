'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { BookOpen, CheckCircle, Circle, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react'

interface SeriesItem {
  title: string
  slug: string
  order: number
}

interface SidebarSeriesNavProps {
  seriesName: string
  currentOrder: number
  total: number
  prev: string | null
  next: string | null
  seriesItems?: SeriesItem[]
}

export default function SidebarSeriesNav({ 
  seriesName, 
  currentOrder, 
  total, 
  prev, 
  next,
  seriesItems = []
}: SidebarSeriesNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // Generate default series items if not provided
  const defaultItems: SeriesItem[] = seriesItems.length > 0 ? seriesItems : [
    { title: 'Database Indexes Guide', slug: '/posts/database-indexes-guide', order: 1 },
    { title: 'Database Normalization Guide', slug: '/posts/database-normalization-guide', order: 2 },
    { title: 'Advanced Database Concepts', slug: '/posts/advanced-database-concepts', order: 3 },
  ].slice(0, total)
  // Handle scroll to show/hide sidebar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY < 200) // Hide when scrolled down more than 200px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed left-2 bottom-4 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all z-40"
        title="Show series navigation"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    )
  }
  return (
    <div className={`fixed left-2 top-32 z-40 transition-all duration-300 ${isCollapsed ? 'w-10' : 'w-56'} max-w-56`}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen className="w-3 h-3 text-blue-600 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900 text-xs truncate">{seriesName}</h3>
                  <p className="text-xs text-gray-500">{currentOrder}/{total}</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 text-gray-500 hover:text-gray-700 flex-shrink-0"
              title={isCollapsed ? 'Expand series nav' : 'Collapse series nav'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronLeft className="w-3 h-3" />
              )}
            </button>
          </div>
          
          {!isCollapsed && (
            <div className="mt-1">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${(currentOrder / total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>        {/* Collapsed state */}
        {isCollapsed && (
          <div className="p-1">
            <div className="flex flex-col gap-1">
              {defaultItems.map((item) => {
                const isCurrent = item.order === currentOrder
                const isCompleted = item.order < currentOrder
                
                return (
                  <Link
                    key={item.slug}
                    href={item.slug}
                    className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors
                      ${isCurrent 
                        ? 'bg-blue-600 text-white' 
                        : isCompleted
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }
                    `}
                    title={item.title}
                  >
                    {item.order}
                  </Link>
                )
              })}
            </div>
          </div>
        )}        {/* Expanded state */}
        {!isCollapsed && (
          <div className="max-h-64 overflow-y-auto">
            {/* Series Items */}
            <div className="p-1">
              {defaultItems.map((item) => {
                const isCurrent = item.order === currentOrder
                const isCompleted = item.order < currentOrder
                
                return (
                  <Link
                    key={item.slug}
                    href={item.slug}
                    className={`
                      flex items-center gap-2 p-2 rounded text-xs transition-all duration-200
                      ${isCurrent 
                        ? 'bg-blue-50 border border-blue-200 text-blue-900' 
                        : isCompleted
                          ? 'hover:bg-green-50 text-gray-700'
                          : 'hover:bg-gray-50 text-gray-600'
                      }
                    `}
                  >
                    <div className="flex-shrink-0">
                      {isCurrent ? (
                        <div className="w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {item.order}
                        </div>
                      ) : isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium truncate ${isCurrent ? 'text-blue-900' : ''}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        Part {item.order}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="p-1 border-t border-gray-100 bg-gray-50">
              <div className="flex gap-1">
                {prev ? (
                  <Link 
                    href={prev} 
                    className="flex-1 px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors text-center"
                  >
                    ← Prev
                  </Link>
                ) : (
                  <div className="flex-1 px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs text-gray-400 text-center">
                    ← Prev
                  </div>
                )}
                
                {next ? (
                  <Link 
                    href={next} 
                    className="flex-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors text-center"
                  >
                    Next →
                  </Link>
                ) : (
                  <div className="flex-1 px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs text-gray-400 text-center">
                    Next →
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
