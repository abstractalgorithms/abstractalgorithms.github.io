'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'

interface TopSeriesNavProps {
  seriesName: string
  currentOrder: number
  total: number
  prev: string | null
  next: string | null
}

export default function TopSeriesNav({ 
  seriesName, 
  currentOrder, 
  total, 
  prev, 
  next
}: TopSeriesNavProps) {
  return (
    <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <div className="flex items-center justify-between">
        {/* Series Info */}
        <div className="flex items-center gap-3">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">{seriesName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-600">Part {currentOrder} of {total}</span>
              <div className="w-16 bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${(currentOrder / total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          {prev ? (
            <Link 
              href={prev} 
              className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Previous
            </Link>
          ) : (
            <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-xs text-gray-400">
              <ArrowLeft className="w-3 h-3" />
              Previous
            </div>
          )}
          
          {next ? (
            <Link 
              href={next} 
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              Next
              <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-xs text-gray-400">
              Next
              <ArrowRight className="w-3 h-3" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
