'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, Clock, Tag, BookOpen, ArrowRight } from 'lucide-react'
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

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recent-searches')
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved))
        } catch (e) {
          console.warn('Failed to parse recent searches:', e)
        }
      }
    }
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])
  // Search function
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    console.log('Performing search for:', searchQuery)
    
    try {
      // Use client-side search directly
      const { clientSearch } = await import('../lib/clientSearch')
      console.log('Client search imported successfully')
      
      await clientSearch.initialize()
      console.log('Client search initialized')
      
      const searchResults = await clientSearch.search(searchQuery)
      console.log('Search results:', searchResults)
      
      setResults(searchResults)
      
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle search input with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        performSearch(query)
      } else {
        setResults([])
      }
    }, 300) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [query])

  // Save search to recent searches
  const saveSearch = (searchTerm: string) => {
    if (!searchTerm.trim() || typeof window === 'undefined') return
    
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('recent-searches', JSON.stringify(updated))
  }

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    saveSearch(query)
    onClose()
  }

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('recent-searches')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Search Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search posts, topics, algorithms..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="p-6 overflow-y-auto max-h-96">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <span className="ml-2 text-gray-600">Searching...</span>
            </div>
          )}

          {!isLoading && query && results.length === 0 && (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">Try different keywords or check your spelling</p>
            </div>
          )}

          {!query && recentSearches.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Searches
                </h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(search)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-4">
              {results.map((result) => (
                <Link
                  key={result.slug}
                  href={`/posts/${result.slug}`}
                  onClick={() => handleResultClick(result)}
                  className="block p-4 rounded-xl border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">
                        {result.title}
                      </h3>
                      <p className="text-gray-600 mt-1 line-clamp-2 text-sm">
                        {result.excerpt}
                      </p>
                      
                      {result.matchText && result.matchText !== result.excerpt && (
                        <p className="text-green-600 mt-2 text-xs bg-green-50 p-2 rounded">
                          <strong>Match:</strong> ...{result.matchText}...
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <BookOpen className="w-3 h-3" />
                          {result.readingTime}
                        </div>
                        
                        {result.tags.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Tag className="w-3 h-3 text-gray-400" />
                            <div className="flex gap-1">
                              {result.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                              {result.tags.length > 2 && (
                                <span className="text-gray-400 text-xs">
                                  +{result.tags.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!query && recentSearches.length === 0 && (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Search our content</h3>
              <p className="text-gray-500">Find posts, algorithms, and topics quickly</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span>Press <kbd className="px-2 py-1 bg-white border rounded text-xs">↵</kbd> to select</span>
              <span>Press <kbd className="px-2 py-1 bg-white border rounded text-xs">↓↑</kbd> to navigate</span>
            </div>
            <Link
              href="/search"
              onClick={onClose}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Advanced search →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
