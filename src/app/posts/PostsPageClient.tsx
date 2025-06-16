'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import PostCard from '../../components/PostCard'
import LearningPathCard from '../../components/LearningPathCard'
import Link from 'next/link'
import { ArrowLeft, Calendar, Hash, Filter, ChevronLeft, ChevronRight, BookOpen, FileText, ToggleLeft, ToggleRight } from 'lucide-react'
import type { Post } from '../../lib/posts'
import { segregatePosts } from '../../lib/posts'

interface PostsPageClientProps {
  posts: Post[]
}

type ViewMode = 'all' | 'independent' | 'series'

export default function PostsPageClient({ posts: allPosts }: PostsPageClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('all')
  const [filteredPosts, setFilteredPosts] = useState(allPosts)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 8 // 8 posts per page (2 columns x 4 rows)
  
  // Segregate posts
  const { independentPosts, learningPaths } = segregatePosts(allPosts)
  const handleViewModeChange = (mode: ViewMode) => {
    // Update state immediately for responsive UI
    setViewMode(mode)
    setCurrentPage(1)
    
    // Update URL
    const params = new URLSearchParams(searchParams.toString())
    if (mode === 'all') {
      params.delete('view')
    } else {
      params.set('view', mode)
    }
    const queryString = params.toString()
    const url = queryString ? `/posts?${queryString}` : '/posts'
    
    // Use replace instead of push to avoid navigation issues
    router.replace(url)
  }
  useEffect(() => {
    const tag = searchParams.get('tag')
    const urlMode = searchParams.get('view') as ViewMode || 'all'
    
    // Only update state if it's different from URL to avoid conflicts
    if (urlMode !== viewMode) {
      setViewMode(urlMode)
    }
    setSelectedTag(tag)
    setCurrentPage(1) // Reset to first page when filtering
    
    console.log('Effect triggered - view mode:', viewMode, 'URL mode:', urlMode, 'tag:', tag, 'learningPaths count:', learningPaths.length)
  }, [searchParams, learningPaths.length])

  // Separate effect for filtering posts based on current state
  useEffect(() => {
    let postsToFilter = allPosts
    
    // Filter by view mode first
    switch (viewMode) {
      case 'independent':
        postsToFilter = independentPosts
        break
      case 'series':
        postsToFilter = learningPaths.flatMap(path => path.posts)
        break
      default:
        postsToFilter = allPosts
    }
    
    // Then filter by tag if selected
    if (selectedTag) {
      setFilteredPosts(postsToFilter.filter(post => post.tags.includes(selectedTag)))
    } else {
      setFilteredPosts(postsToFilter)
    }
  }, [viewMode, selectedTag, allPosts, independentPosts, learningPaths])

  const getPageTitle = () => {
    if (selectedTag) {
      return `${selectedTag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Articles`
    }
    switch (viewMode) {
      case 'independent':
        return 'Independent Articles'
      case 'series':
        return 'Learning Series'
      default:
        return 'All Articles'
    }
  }
    
  const getPageDescription = () => {
    if (selectedTag) {
      return `Articles tagged with "${selectedTag}"`
    }
    switch (viewMode) {
      case 'independent':
        return 'Standalone articles covering specific topics and concepts.'
      case 'series':
        return 'Structured learning series and multi-part content for comprehensive understanding.'
      default:
        return 'Browse all articles about algorithms, data structures, and software engineering concepts.'
    }
  }
  // Pagination calculations
  const shouldShowPagination = viewMode !== 'series' || selectedTag
  const totalPages = shouldShowPagination ? Math.ceil(filteredPosts.length / postsPerPage) : 0
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = shouldShowPagination ? filteredPosts.slice(startIndex, endIndex) : []

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of posts section
    const postsSection = document.getElementById('posts-section')
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}      <div className="bg-white border-b border-gray-200">
        <div className="wide-container py-12">
          <div className="flex items-center justify-between mb-8">
            <Link 
              href={selectedTag ? "/discover" : "/"}
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              {selectedTag ? 'Back to Discover' : 'Back to Home'}
            </Link>

            {/* View Mode Toggle */}            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleViewModeChange('all')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                    viewMode === 'all' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Hash className="w-4 h-4" />
                  All
                </button>
                <button
                  onClick={() => handleViewModeChange('independent')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                    viewMode === 'independent' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Articles
                </button>
                <button
                  onClick={() => handleViewModeChange('series')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                    viewMode === 'series' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Learning Series
                </button>              </div>
            </div>
            
            <div className="flex items-center gap-6">
              {selectedTag && (
                <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtered by: {selectedTag}                </div>
              )}
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                {filteredPosts.length} articles {selectedTag ? 'found' : 'available'}
                {totalPages > 1 && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Page {currentPage} of {totalPages}</span>
                  </>
                )}
              </div>
            </div>          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {getPageTitle()}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {getPageDescription()}
            </p>
            {selectedTag && (
              <Link
                href="/posts"
                className="inline-flex items-center mt-4 text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                View all articles →
              </Link>
            )}
          </div>        </div>
      </div>

      {/* Posts Section */}
      <div id="posts-section" className="wide-container py-16">
        {viewMode === 'series' && !selectedTag ? (
          // Learning Series View
          <div className="space-y-12">
            {learningPaths.length > 0 ? (
              <>
                {/* Featured Learning Series */}
                {learningPaths[0] && (
                  <LearningPathCard learningPath={learningPaths[0]} featured={true} />
                )}
                
                {/* Other Learning Series */}
                {learningPaths.length > 1 && (
                  <div className="learning-paths-grid">
                    {learningPaths.slice(1).map((learningPath) => (
                      <LearningPathCard 
                        key={learningPath.name} 
                        learningPath={learningPath} 
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  No Learning Series Available
                </h3>
                <p className="text-lg text-gray-600 max-w-md mx-auto">
                  We're working on creating structured learning series for you. Check back soon!
                </p>
              </div>
            )}
          </div>
        ) : filteredPosts.length > 0 ? (
          // Regular Posts View
          <div className="space-y-12">
            {/* Posts Grid */}
            <div className="posts-grid">
              {currentPosts.map((post, index) => (
                <PostCard 
                  key={post.slug} 
                  post={post} 
                  featured={false}
                  compact={true} // Use compact layout for grid
                />
              ))}
              {/* Add an empty div if odd number of posts on large screens for better visual balance */}
              {currentPosts.length % 2 === 1 && (
                <div className="hidden lg:block"></div>              )}
            </div>

            {/* Pagination */}
            {shouldShowPagination && totalPages > 1 && (
              <div className="pagination-section">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>

                  <div className="flex items-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current page
                      const shouldShow = 
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      
                      if (!shouldShow) {
                        // Show ellipsis if there's a gap
                        if (page === currentPage - 2 || page === currentPage + 2) {
                          return <span key={page} className="px-2 text-gray-400">...</span>
                        }
                        return null
                      }

                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            page === currentPage
                              ? 'bg-green-600 text-white'
                              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Hash className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {selectedTag ? `No articles found for "${selectedTag}"` : 'No posts yet'}
            </h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              {selectedTag 
                ? 'Try browsing other categories or view all articles.' 
                : "We're working on creating amazing content for you. Check back soon for new articles!"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              {selectedTag && (
                <Link 
                  href="/posts"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                >
                  View All Articles
                </Link>
              )}
              <Link 
                href={selectedTag ? "/discover" : "/"}
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {selectedTag ? 'Back to Discover' : 'Back to Home'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
