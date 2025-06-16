'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen, CheckCircle, Circle, ArrowLeft, ArrowRight } from 'lucide-react'

interface SeriesItem {
  title: string
  slug: string
  order: number
  completed?: boolean
}

interface InlineSeriesNavProps {
  seriesName: string
  currentOrder: number
  total: number
  prev: string | null
  next: string | null
  seriesItems?: SeriesItem[]
  showProgress?: boolean
  compact?: boolean
}

export default function InlineSeriesNav({ 
  seriesName, 
  currentOrder, 
  total, 
  prev, 
  next,
  seriesItems = [],
  showProgress = true,
  compact = false
}: InlineSeriesNavProps) {
  const [isExpanded, setIsExpanded] = useState(!compact)

  // Generate default series items if not provided
  const defaultItems: SeriesItem[] = seriesItems.length > 0 ? seriesItems : [
    { title: 'Database Indexes Guide', slug: '/posts/database-indexes-guide', order: 1 },
    { title: 'Database Normalization Guide', slug: '/posts/database-normalization-guide', order: 2 },
    { title: 'Advanced Database Concepts', slug: '/posts/advanced-database-concepts', order: 3 },
  ].slice(0, total)

  if (compact) {
    return (
      <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        {/* Compact Header */}
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">{seriesName}</h3>
              <p className="text-sm text-gray-600">Part {currentOrder} of {total}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {showProgress && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentOrder / total) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">{Math.round((currentOrder / total) * 100)}%</span>
              </div>
            )}
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="mt-6">
            {/* Series Items Grid */}
            <div className="grid gap-3 mb-6">
              {defaultItems.map((item) => {
                const isCurrent = item.order === currentOrder
                const isCompleted = item.order < currentOrder
                
                return (
                  <Link
                    key={item.slug}
                    href={item.slug}
                    className={`
                      flex items-center gap-3 p-4 rounded-lg transition-all duration-200
                      ${isCurrent 
                        ? 'bg-white border-2 border-blue-300 shadow-md' 
                        : isCompleted
                          ? 'bg-white border border-green-200 hover:border-green-300 hover:shadow-sm'
                          : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }
                    `}
                  >
                    <div className="flex-shrink-0">
                      {isCurrent ? (
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {item.order}
                        </div>
                      ) : isCompleted ? (
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      ) : (
                        <Circle className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${isCurrent ? 'text-blue-900' : 'text-gray-900'}`}>
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Part {item.order} of {total}
                        {isCurrent && ' • Currently reading'}
                        {isCompleted && ' • Completed'}
                      </p>
                    </div>
                    {isCurrent && (
                      <div className="flex-shrink-0">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Current
                        </span>
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {prev ? (
                <Link 
                  href={prev} 
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Article
                </Link>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-400">
                  <ArrowLeft className="w-4 h-4" />
                  Previous Article
                </div>
              )}
              
              {next ? (
                <Link 
                  href={next} 
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Next Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-400">
                  Next Article
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Full expanded version
  return (
    <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{seriesName}</h3>
          <p className="text-gray-600">Part {currentOrder} of {total}</p>
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Series Progress</span>
            <span>{currentOrder}/{total} ({Math.round((currentOrder / total) * 100)}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${(currentOrder / total) * 100}%` }}
            >
              {currentOrder > 0 && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Series Items Grid */}
      <div className="grid gap-3 mb-6">
        {defaultItems.map((item) => {
          const isCurrent = item.order === currentOrder
          const isCompleted = item.order < currentOrder
          
          return (
            <Link
              key={item.slug}
              href={item.slug}
              className={`
                flex items-center gap-4 p-4 rounded-lg transition-all duration-200
                ${isCurrent 
                  ? 'bg-white border-2 border-blue-300 shadow-md transform scale-[1.02]' 
                  : isCompleted
                    ? 'bg-white border border-green-200 hover:border-green-300 hover:shadow-sm'
                    : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }
              `}
            >
              <div className="flex-shrink-0">
                {isCurrent ? (
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.order}
                  </div>
                ) : isCompleted ? (
                  <CheckCircle className="w-10 h-10 text-green-600" />
                ) : (
                  <Circle className="w-10 h-10 text-gray-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-lg font-medium ${isCurrent ? 'text-blue-900' : 'text-gray-900'}`}>
                  {item.title}
                </p>
                <p className="text-gray-500">
                  Part {item.order} of {total}
                  {isCurrent && ' • Currently reading'}
                  {isCompleted && ' • Completed'}
                </p>
              </div>
              {isCurrent && (
                <div className="flex-shrink-0">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Current
                  </span>
                </div>
              )}
            </Link>
          )
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {prev ? (
          <Link 
            href={prev} 
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous Article
          </Link>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-400">
            <ArrowLeft className="w-5 h-5" />
            Previous Article
          </div>
        )}
        
        {next ? (
          <Link 
            href={next} 
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Next Article
            <ArrowRight className="w-5 h-5" />
          </Link>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-400">
            Next Article
            <ArrowRight className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  )
}
