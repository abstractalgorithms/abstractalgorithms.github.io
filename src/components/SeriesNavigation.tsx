'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, BookOpen, CheckCircle, Circle, X, Menu, ArrowLeft, ArrowRight } from 'lucide-react'

interface SeriesItem {
  title: string
  slug: string
  order: number
  completed?: boolean
}

interface SeriesNavigationProps {
  seriesName: string
  currentOrder: number
  total: number
  prev: string | null
  next: string | null
  seriesItems?: SeriesItem[]
  variant?: 'inline' | 'panel' | 'mobile'
}

export default function SeriesNavigation({ 
  seriesName, 
  currentOrder, 
  total, 
  prev, 
  next,
  seriesItems = [],
  variant = 'panel'
}: SeriesNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showMobilePanel, setShowMobilePanel] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Generate default series items if not provided
  const defaultItems: SeriesItem[] = seriesItems.length > 0 ? seriesItems : [
    { title: 'Database Indexes Guide', slug: '/posts/database-indexes-guide', order: 1 },
    { title: 'Database Normalization Guide', slug: '/posts/database-normalization-guide', order: 2 },
    { title: 'Advanced Database Concepts', slug: '/posts/advanced-database-concepts', order: 3 },
  ].slice(0, total)

  // Inline variant (original behavior)
  if (variant === 'inline') {
    return (
      <nav className="flex flex-col items-center my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
        <div className="text-sm text-gray-600 mb-4 text-center">
          <BookOpen className="w-4 h-4 inline mr-1" />
          {seriesName} (Part {currentOrder} of {total})
        </div>
        <div className="flex gap-4">
          {prev ? (
            <Link href={prev} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Link>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed">
              <ArrowLeft className="w-4 h-4" />
              Previous
            </span>
          )}
          <span className="px-4 py-2 text-blue-700 font-semibold bg-blue-100 rounded-lg">Current</span>
          {next ? (
            <Link href={next} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
              Next
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed">
              Next
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </div>
      </nav>
    )
  }

  // Mobile panel variant
  if (variant === 'mobile' || isMobile) {
    return (
      <>
        {/* Mobile trigger button */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowMobilePanel(true)}
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile overlay */}
        {showMobilePanel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowMobilePanel(false)}>
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{seriesName}</h3>
                <button
                  onClick={() => setShowMobilePanel(false)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 overflow-y-auto h-full pb-20">
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{currentOrder}/{total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentOrder / total) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Series Items */}
                {defaultItems.map((item) => {
                  const isCurrent = item.order === currentOrder
                  const isCompleted = item.order < currentOrder
                  
                  return (
                    <Link
                      key={item.slug}
                      href={item.slug}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg mb-2 transition-all duration-200
                        ${isCurrent 
                          ? 'bg-blue-50 border border-blue-200 text-blue-900' 
                          : isCompleted
                            ? 'hover:bg-green-50 text-gray-700'
                            : 'hover:bg-gray-50 text-gray-600'
                        }
                      `}
                      onClick={() => setShowMobilePanel(false)}
                    >
                      <div className="flex-shrink-0">
                        {isCurrent ? (
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {item.order}
                          </div>
                        ) : isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${isCurrent ? 'text-blue-900' : ''}`}>
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Part {item.order}
                          {isCurrent && ' (Current)'}
                          {isCompleted && ' (Completed)'}
                        </p>
                      </div>
                    </Link>
                  )
                })}

                {/* Navigation Buttons */}
                <div className="mt-6 flex gap-2">
                  {prev ? (
                    <Link 
                      href={prev} 
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center"
                      onClick={() => setShowMobilePanel(false)}
                    >
                      ← Previous
                    </Link>
                  ) : (
                    <div className="flex-1 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-400 text-center">
                      ← Previous
                    </div>
                  )}
                  
                  {next ? (
                    <Link 
                      href={next} 
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                      onClick={() => setShowMobilePanel(false)}
                    >
                      Next →
                    </Link>
                  ) : (
                    <div className="flex-1 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-400 text-center">
                      Next →
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // Desktop panel variant (default)
  return (
    <div className="fixed top-20 right-4 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-40 max-h-[80vh] overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{seriesName}</h3>
            <p className="text-xs text-gray-600">Part {currentOrder} of {total}</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="overflow-y-auto max-h-96">
          {/* Series Progress */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{currentOrder}/{total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentOrder / total) * 100}%` }}
              />
            </div>
          </div>

          {/* Series Items */}
          <div className="p-2">
            {defaultItems.map((item) => {
              const isCurrent = item.order === currentOrder
              const isCompleted = item.order < currentOrder
              
              return (
                <Link
                  key={item.slug}
                  href={item.slug}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg mb-1 transition-all duration-200
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
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {item.order}
                      </div>
                    ) : isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isCurrent ? 'text-blue-900' : ''}`}>
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Part {item.order}
                      {isCurrent && ' (Current)'}
                      {isCompleted && ' (Completed)'}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex gap-2">
              {prev ? (
                <Link 
                  href={prev} 
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center"
                >
                  ← Previous
                </Link>
              ) : (
                <div className="flex-1 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-400 text-center">
                  ← Previous
                </div>
              )}
              
              {next ? (
                <Link 
                  href={next} 
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                >
                  Next →
                </Link>
              ) : (
                <div className="flex-1 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-400 text-center">
                  Next →
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
