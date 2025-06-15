import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Post } from '../lib/posts'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = formatDistanceToNow(new Date(post.date), { addSuffix: true })

  if (featured) {
    return (
      <article className="post-card p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center mb-4">
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                Featured
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              <Link 
                href={`/posts/${post.slug}`}
                className="hover:text-green-600 transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="post-meta">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
                <Clock className="w-4 h-4" />
                <span>{post.readingTime}</span>
              </div>
              
              <Link 
                href={`/posts/${post.slug}`}
                className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold group"
              >
                Read more
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {post.coverImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className="post-card p-6 hover:shadow-lg transition-all duration-200">
      <div className={`grid gap-6 ${post.coverImage ? 'md:grid-cols-3' : 'grid-cols-1'}`}>
        {post.coverImage && (
          <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className={post.coverImage ? 'md:col-span-2' : 'col-span-1'}>
          <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
            <Link 
              href={`/posts/${post.slug}`}
              className="hover:text-green-600 transition-colors"
            >
              {post.title}
            </Link>
          </h3>
          
          <p className="text-gray-600 mb-4 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="post-meta text-xs">
              <User className="w-3 h-3" />
              <span>{post.author}</span>
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
              <Clock className="w-3 h-3" />
              <span>{post.readingTime}</span>
            </div>
            
            <Link 
              href={`/posts/${post.slug}`}
              className="text-green-600 hover:text-green-700 font-medium text-sm group"
            >
              Read more →
            </Link>
          </div>
          
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag text-xs">
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
