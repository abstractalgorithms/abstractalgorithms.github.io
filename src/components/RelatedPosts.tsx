'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Post } from '../lib/posts'

interface RelatedPostsProps {
  posts: Post[]
}

interface CarouselCardProps {
  post: Post
}

function CarouselCard({ post }: CarouselCardProps) {
  const formattedDate = formatDistanceToNow(new Date(post.date), { addSuffix: true })

  return (
    <article className="flex-shrink-0 w-80 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {post.coverImage && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-green-600 transition-colors"
          >
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{post.readingTime}</span>
            </div>
          </div>
          
          <Link 
            href={`/posts/${post.slug}`}
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm group"
          >
            Read
            <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{post.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  const scrollLeft = () => {
    const container = document.getElementById('related-posts-carousel')
    if (container) {
      container.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    const container = document.getElementById('related-posts-carousel')
    if (container) {
      container.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="medium-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">More Articles</h2>
            <p className="text-gray-600">Continue exploring algorithms and system design</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="sm:hidden text-xs text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
              Swipe to explore →
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={scrollLeft}
                className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow text-gray-600 hover:text-gray-900"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow text-gray-600 hover:text-gray-900"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div 
          id="related-posts-carousel"
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {posts.map((post) => (
            <div key={post.slug} className="snap-start">
              <CarouselCard post={post} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/posts"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
