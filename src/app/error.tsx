'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
          <p className="text-gray-600 mb-4">
            An unexpected error occurred while loading this page.
          </p>
          {error.message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-700 font-mono">{error.message}</p>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full justify-center"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors w-full justify-center"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Error Code: 500 | Internal Server Error
          </p>
          {error.digest && (
            <p className="text-xs text-gray-400 mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
