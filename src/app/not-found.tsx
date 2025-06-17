'use client'

import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-white">404</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full justify-center"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          
          <Link 
            href="/search"
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors w-full justify-center"
          >
            <Search className="w-5 h-5" />
            Search Posts
          </Link>
          
          <button 
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 px-6 py-3 font-medium transition-colors w-full justify-center"
          >
            Go Back
          </button>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Error Code: 404 | Page Not Found
          </p>
        </div>
      </div>
    </div>
  )
}
