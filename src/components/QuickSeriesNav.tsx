'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'

interface QuickSeriesNavProps {
  seriesName: string
  currentOrder: number
  total: number
  prev: string | null
  next: string | null
  prevTitle?: string
  nextTitle?: string
}

export default function QuickSeriesNav({ 
  seriesName, 
  currentOrder, 
  total, 
  prev, 
  next,
  prevTitle,
  nextTitle
}: QuickSeriesNavProps) {
  return (
    <div className="my-8 p-4 bg-gray-50 rounded-lg border">
      {/* Series Info */}
      <div className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-600">
        <BookOpen className="w-4 h-4" />
        <span>{seriesName}</span>
        <span>•</span>
        <span>Part {currentOrder} of {total}</span>
        <div className="w-16 bg-gray-300 rounded-full h-1 ml-2">
          <div 
            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
            style={{ width: `${(currentOrder / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        {prev ? (
          <Link 
            href={prev} 
            className="flex-1 group flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            <div className="text-left">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Previous</div>
              <div className="text-sm font-medium text-gray-900 truncate">
                {prevTitle || `Part ${currentOrder - 1}`}
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1 flex items-center gap-3 p-3 bg-gray-100 border border-gray-200 rounded-lg">
            <ArrowLeft className="w-4 h-4 text-gray-300" />
            <div className="text-left">
              <div className="text-xs text-gray-400 uppercase tracking-wide">Previous</div>
              <div className="text-sm text-gray-400">None</div>
            </div>
          </div>
        )}
        
        {next ? (
          <Link 
            href={next} 
            className="flex-1 group flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all"
          >
            <div className="text-right flex-1">
              <div className="text-xs text-blue-600 uppercase tracking-wide">Next</div>
              <div className="text-sm font-medium text-blue-900 truncate">
                {nextTitle || `Part ${currentOrder + 1}`}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>
        ) : (
          <div className="flex-1 flex items-center gap-3 p-3 bg-gray-100 border border-gray-200 rounded-lg">
            <div className="text-right flex-1">
              <div className="text-xs text-gray-400 uppercase tracking-wide">Next</div>
              <div className="text-sm text-gray-400">None</div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300" />
          </div>
        )}
      </div>
    </div>
  )
}
