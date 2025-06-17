'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Clock, Tag, BookOpen, Filter } from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  readingTime: string
  matchType: 'title' | 'content' | 'tag'
  matchText?: string
}

export default function SearchPageClient() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [filterType, setFilterType] = useState<'all' | 'title' | 'content' | 'tag'>('all')  // Search function
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setTotalResults(0)
      return
    }

    setIsLoading(true)
    
    try {
      // Use client-side search directly
      const { clientSearch } = await import('../../lib/clientSearch')
      const results = await clientSearch.search(searchQuery)
      setResults(results)
      setTotalResults(results.length)
      
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
      setTotalResults(0)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query)
    }, 300) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [query])

  // Filter results based on match type
  const filteredResults = filterType === 'all' 
    ? results 
    : results.filter(result => result.matchType === filterType)

  // Popular search terms
  const popularSearches = [
    'algorithms', 'data structures', 'big o', 'hash tables', 
    'sorting', 'binary search', 'graph algorithms', 'dynamic programming'
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts, topics, algorithms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-14 pr-4 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Search Results Info */}
      {query && !isLoading && (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div>
            <p className="text-lg text-gray-700">
              {filteredResults.length > 0 ? (
                <>Found <span className="font-semibold">{filteredResults.length}</span> results for "<span className="font-semibold">{query}</span>"</>
              ) : (
                <>No results found for "<span className="font-semibold">{query}</span>"</>
              )}
            </p>
            {totalResults > results.length && (
              <p className="text-sm text-gray-500 mt-1">
                Showing top {results.length} of {totalResults} results
              </p>
            )}
          </div>
          
          {/* Filter Dropdown */}
          {results.length > 0 && (
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="all">All Results</option>
                <option value="title">Title Matches</option>
                <option value="content">Content Matches</option>
                <option value="tag">Tag Matches</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Search Results */}
      {!isLoading && filteredResults.length > 0 && (
        <div className="space-y-6">
          {filteredResults.map((result, index) => (
            <div key={`${result.slug}-${index}`} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Link
                href={`/posts/${result.slug}`}
                className="block group"
              >
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-3">
                  {result.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {result.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {result.readingTime}
                  </div>
                  {result.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <div className="flex flex-wrap gap-2">
                        {result.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                        {result.tags.length > 3 && (
                          <span className="text-gray-400 text-xs">+{result.tags.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    result.matchType === 'title' ? 'bg-blue-100 text-blue-700' :
                    result.matchType === 'tag' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {result.matchType} match
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && query && filteredResults.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-gray-700 mb-4">No results found</h3>
          <p className="text-gray-500 mb-8">
            Try different keywords or browse our popular topics below
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Searches - Empty State */}
      {!query && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-gray-700 mb-4">What are you looking for?</h3>
          <p className="text-gray-500 mb-8">
            Try searching for algorithms, data structures, or programming concepts
          </p>
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Popular Searches
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700 rounded-full text-sm transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
          <Link 
            href="/discover"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
          >
            Browse All Topics
          </Link>
        </div>
      )}
    </div>
  )
}
