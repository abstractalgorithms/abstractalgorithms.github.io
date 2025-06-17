'use client'

import { useState, useEffect } from 'react'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface PerformanceMetrics {
  cacheHit: boolean
  loadTime: number
  dataSize: number
  timestamp: string
}

interface PerformanceLoaderProps {
  children: React.ReactNode
  dataSource: string
  onMetrics?: (metrics: PerformanceMetrics) => void
}

export default function PerformanceLoader({ 
  children, 
  dataSource, 
  onMetrics 
}: PerformanceLoaderProps) {
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [showMetrics, setShowMetrics] = useState(false)

  useEffect(() => {
    const startTime = performance.now()
    
    // Simulate data loading with metrics tracking
    const timer = setTimeout(() => {
      const endTime = performance.now()
      const loadTime = endTime - startTime
      
      const performanceMetrics: PerformanceMetrics = {
        cacheHit: Math.random() > 0.3, // Simulate cache hit rate
        loadTime: Math.round(loadTime),
        dataSize: Math.round(Math.random() * 500 + 100), // Simulate data size in KB
        timestamp: new Date().toISOString()
      }
      
      setMetrics(performanceMetrics)
      setLoading(false)
      
      if (onMetrics) {
        onMetrics(performanceMetrics)
      }
    }, Math.random() * 1000 + 200) // Simulate variable load times

    return () => clearTimeout(timer)
  }, [onMetrics])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading {dataSource}...</p>
          <p className="text-sm text-gray-400 mt-2">Optimizing for performance</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {children}
      
      {/* Performance Metrics Toggle */}
      <button
        onClick={() => setShowMetrics(!showMetrics)}
        className="fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors z-50"
        title="Show performance metrics"
      >
        {metrics?.cacheHit ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : (
          <AlertCircle className="w-5 h-5 text-yellow-400" />
        )}
      </button>

      {/* Performance Metrics Panel */}
      {showMetrics && metrics && (
        <div className="fixed bottom-16 right-4 bg-white rounded-lg shadow-xl border p-4 z-50 min-w-64">
          <h3 className="font-semibold text-gray-900 mb-3">Performance Metrics</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Data Source:</span>
              <span className="font-medium">{dataSource}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Load Time:</span>
              <span className={`font-medium ${
                metrics.loadTime < 500 ? 'text-green-600' : 
                metrics.loadTime < 1000 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {metrics.loadTime}ms
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Cache Status:</span>
              <span className={`font-medium ${
                metrics.cacheHit ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {metrics.cacheHit ? 'Hit' : 'Miss'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Data Size:</span>
              <span className="font-medium">{metrics.dataSize}KB</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Loaded:</span>
              <span className="font-medium text-xs">
                {new Date(metrics.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className={`text-xs px-2 py-1 rounded ${
              metrics.cacheHit 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {metrics.cacheHit 
                ? '✓ Served from cache' 
                : '⚠ Fresh data loaded'
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
