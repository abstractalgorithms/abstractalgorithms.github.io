import { Suspense } from 'react'
import SearchPageClient from './SearchPageClient'

export const metadata = {
  title: 'Search - Abstract Algorithms',
  description: 'Search through our collection of algorithms, data structures, and programming content',
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="wide-container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Search
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find algorithms, data structures, tutorials, and programming concepts
          </p>
        </div>
        
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        }>
          <SearchPageClient />
        </Suspense>
      </div>
    </div>
  )
}
