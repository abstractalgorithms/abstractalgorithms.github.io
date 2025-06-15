'use client'

import Link from 'next/link'
import { Search, BookOpen, Github, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
              href="/about" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-lg"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-lg"
            >
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center space-x-6">
            <button className="p-3 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors">
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
                href="/about" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-lg py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-lg py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
