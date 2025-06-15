'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import PostCard from '../../components/PostCard'
import Link from 'next/link'
import { ArrowLeft, Calendar, Hash, Filter } from 'lucide-react'
import type { Post } from '../../lib/posts'

interface PostsPageClientProps {
  posts: Post[]
}

export default function PostsPageClient({ posts: allPosts }: PostsPageClientProps) {
  const searchParams = useSearchParams()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [filteredPosts, setFilteredPosts] = useState(allPosts)

  useEffect(() => {
    const tag = searchParams.get('tag')
    setSelectedTag(tag)
    
    if (tag) {
      setFilteredPosts(allPosts.filter(post => post.tags.includes(tag)))
    } else {
      setFilteredPosts(allPosts)
    }
  }, [searchParams, allPosts])

  const pageTitle = selectedTag 
    ? `${selectedTag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Articles`
    : 'All Articles'
    
  const pageDescription = selectedTag
    ? `Articles tagged with "${selectedTag}"`
    : 'Browse all articles about algorithms, data structures, and software engineering concepts.'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="wide-container py-12">
          <div className="flex items-center justify-between mb-8">
            <Link 
              href={selectedTag ? "/discover" : "/"}
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              {selectedTag ? 'Back to Discover' : 'Back to Home'}
            </Link>
            
            <div className="flex items-center gap-6">
              {selectedTag && (
                <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtered by: {selectedTag}
                </div>
              )}
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                {filteredPosts.length} articles {selectedTag ? 'found' : 'available'}
              </div>
            </div>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {pageTitle}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {pageDescription}
            </p>
            {selectedTag && (
              <Link
                href="/posts"
                className="inline-flex items-center mt-4 text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                View all articles →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="wide-container py-16">
        {filteredPosts.length > 0 ? (
          <div className="space-y-12">
            {filteredPosts.map((post, index) => (
              <PostCard 
                key={post.slug} 
                post={post} 
                featured={false} // No featured posts on this page
              />
            ))}
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
