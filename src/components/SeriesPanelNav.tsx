'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen, CheckCircle, Circle } from 'lucide-react'

interface SeriesItem {
  title: string
  slug: string
  order: number
  completed?: boolean
}

interface SeriesPanelNavProps {
  seriesName: string
  currentOrder: number
  total: number
  prev: string | null
  next: string | null
  seriesItems?: SeriesItem[]
}

export default function SeriesPanelNav({ 
  seriesName, 
  currentOrder, 
  total, 
  prev, 
  next,
  seriesItems = []
}: SeriesPanelNavProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  // Generate default series items if not provided
  const defaultItems: SeriesItem[] = seriesItems.length > 0 ? seriesItems : [
    { title: 'Database Indexes Guide', slug: '/posts/database-indexes-guide', order: 1 },
    { title: 'Database Normalization Guide', slug: '/posts/database-normalization-guide', order: 2 },
    { title: 'Advanced Database Concepts', slug: '/posts/advanced-database-concepts', order: 3 },
  ].slice(0, total)

  return (
    <div className="fixed top-20 right-4 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[80vh] overflow-hidden">
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
            {defaultItems.map((item, index) => {
              const isCurrent = item.order === currentOrder
              const isCompleted = item.order < currentOrder
              const isUpcoming = item.order > currentOrder
              
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
