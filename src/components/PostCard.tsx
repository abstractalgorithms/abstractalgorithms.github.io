import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Post } from '../lib/posts'
import OptimizedImage from './OptimizedImage'

interface PostCardProps {
  post: Post
  featured?: boolean
  compact?: boolean
}

export default function PostCard({ post, featured = false, compact = false }: PostCardProps) {
  const formattedDate = formatDistanceToNow(new Date(post.date), { addSuffix: true })

  if (featured) {
    return (
      <article className="post-card p-10 mb-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                ⭐ Featured Article
              </span>
              <div className="ml-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{post.readingTime}</span>
                </div>
                {post.tags.length > 0 && (
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              <Link 
                href={`/posts/${post.slug}`}
                className="hover:text-green-600 transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between pt-4">
              <div className="post-meta text-base">
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author}</span>
                <Calendar className="w-5 h-5" />
                <span>{formattedDate}</span>
                <Clock className="w-5 h-5" />
                <span>{post.readingTime}</span>
              </div>
              
              <Link 
                href={`/posts/${post.slug}`}
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors group shadow-sm"
              >
                Read Article
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-6">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {post.coverImage && (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <OptimizedImage
                src={post.coverImage}
                alt={post.title}
                style="featured"
                fill
                priority
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className={`post-card hover:shadow-xl transition-all duration-300 ${
      compact ? 'p-6 h-full flex flex-col' : 'p-8'
    }`}>
      <div className={compact ? 'space-y-6 flex-1 flex flex-col' : `grid gap-8 ${post.coverImage ? 'lg:grid-cols-3' : 'grid-cols-1'}`}>
        {post.coverImage && (
          <div className={`relative overflow-hidden rounded-xl ${
            compact 
              ? 'aspect-[16/10] mb-4 flex-shrink-0' 
              : 'aspect-[4/3] lg:aspect-square'
          }`}>
            <OptimizedImage
              src={post.coverImage}
              alt={post.title}
              style={compact ? "thumbnail" : "post"}
              fill
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className={compact ? 'space-y-4 flex-1 flex flex-col' : (post.coverImage ? 'lg:col-span-2 space-y-6' : 'col-span-1 space-y-6')}>
          {/* Tags and reading time at the top for better visibility */}
          <div className="flex items-center justify-between">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, compact ? 2 : 3).map((tag) => (
                  <span key={tag} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
                    {tag}
                  </span>
                ))}
                {post.tags.length > (compact ? 2 : 3) && (
                  <span className="text-xs text-gray-500 px-3 py-1">
                    +{post.tags.length - (compact ? 2 : 3)}
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{post.readingTime}</span>
            </div>
          </div>
          
          <h3 className={`font-bold text-gray-900 leading-tight ${compact ? 'text-xl lg:text-2xl' : 'text-xl lg:text-2xl'}`}>
            <Link 
              href={`/posts/${post.slug}`}
              className="hover:text-green-600 transition-colors"
            >
              {post.title}
            </Link>
          </h3>
          
          <p className={`text-gray-700 leading-relaxed ${compact ? 'text-base line-clamp-3 flex-1' : 'text-base'}`}>
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between pt-4 mt-auto">
            <div className="post-meta text-sm">
              <User className="w-4 h-4" />
              <span className="font-medium">{post.author}</span>
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            
            <Link 
              href={`/posts/${post.slug}`}
              className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold group flex-shrink-0"
            >
              Read Article
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
