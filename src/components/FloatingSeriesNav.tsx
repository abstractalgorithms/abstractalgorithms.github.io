'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, ChevronDown, ChevronUp, CheckCircle, Circle, ArrowLeft, ArrowRight } from 'lucide-react'

interface SeriesItem {
  title: string
  slug: string
  order: number
}

interface FloatingSeriesNavProps {
  seriesName: string
  currentOrder: number
  total: number
  prev: string | null
  next: string | null
  seriesItems?: SeriesItem[]
}

export default function FloatingSeriesNav({ 
  seriesName, 
  currentOrder, 
  total, 
  prev, 
  next,
  seriesItems = []
}: FloatingSeriesNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Generate default series items if not provided
  const defaultItems: SeriesItem[] = seriesItems.length > 0 ? seriesItems : [
    { title: 'Database Indexes Guide', slug: '/posts/database-indexes-guide', order: 1 },
    { title: 'Database Normalization Guide', slug: '/posts/database-normalization-guide', order: 2 },
    { title: 'Advanced Database Concepts', slug: '/posts/advanced-database-concepts', order: 3 },
  ].slice(0, total)

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
      >
        <BookOpen className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">
          {seriesName} ({currentOrder}/{total})
        </span>
        <span className="text-sm font-medium sm:hidden">
          {currentOrder}/{total}
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-sm">{seriesName}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-600">Part {currentOrder} of {total}</span>
              <div className="w-20 bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(currentOrder / total) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Series Items */}
          <div className="max-h-64 overflow-y-auto">
            {defaultItems.map((item) => {
              const isCurrent = item.order === currentOrder
              const isCompleted = item.order < currentOrder
              
              return (
                <Link
                  key={item.slug}
                  href={item.slug}
                  className={`
                    flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0
                    ${isCurrent ? 'bg-blue-50 border-blue-200' : ''}
                  `}
                  onClick={() => setIsOpen(false)}
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
                    <p className={`text-sm font-medium truncate ${isCurrent ? 'text-blue-900' : 'text-gray-900'}`}>
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

          {/* Navigation Footer */}
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <div className="flex gap-2">
              {prev ? (
                <Link 
                  href={prev} 
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <ArrowLeft className="w-3 h-3" />
                  Previous
                </Link>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-400">
                  <ArrowLeft className="w-3 h-3" />
                  Previous
                </div>
              )}
              
              {next ? (
                <Link 
                  href={next} 
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Next
                  <ArrowRight className="w-3 h-3" />
                </Link>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-400">
                  Next
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
