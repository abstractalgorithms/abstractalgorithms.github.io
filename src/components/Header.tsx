'use client'

import Link from 'next/link'
import { Search, BookOpen, Github, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import SearchModal from './SearchModal'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Global keyboard shortcut for search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="wide-container py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
              Abstract Algorithms
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-12">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-lg"
            >
              Home
            </Link>
            <Link 
              href="/discover" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-lg"
            >
              Discover
            </Link>
            <Link 
              href="/posts" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-lg"
            >
             Posts
            </Link>
            <Link 
              href="/badges" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-lg"
            >
              Badges
            </Link>
            {process.env.NODE_ENV === 'development' && (
              <Link 
                href="/content-creator" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-lg bg-blue-50 px-3 py-1 rounded-lg"
                title="Content Creator (Dev Only)"
              >
                Create
              </Link>
            )}
          </nav>
          
          <div className="flex items-center space-x-6">
            {/* Search Button with Keyboard Shortcut */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              title="Search posts (⌘K)"
            >
              <Search className="w-5 h-5" />
              <span className="text-sm">Search</span>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-xs bg-white border border-gray-300 rounded text-gray-500">⌘</kbd>
                <kbd className="px-1.5 py-0.5 text-xs bg-white border border-gray-300 rounded text-gray-500">K</kbd>
              </div>
            </button>
            
            {/* Mobile Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-3 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
              title="Search posts"
            >
              <Search className="w-6 h-6" />
            </button>
            <a 
              href="https://github.com/abstractalgorithms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pt-6 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-lg py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/discover" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-lg py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Discover
              </Link>
              <Link 
                href="/posts" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-lg py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Posts
              </Link>
              <Link 
                href="/badges" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-lg py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Badges
              </Link>
              {process.env.NODE_ENV === 'development' && (
                <Link 
                  href="/content-creator" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-lg py-2 bg-blue-50 px-3 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Content
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  )
}
