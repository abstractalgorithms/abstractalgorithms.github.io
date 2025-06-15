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
      <article className="post-card p-10 mb-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                ⭐ Featured Article
              </span>
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
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className="post-card p-8 hover:shadow-xl transition-all duration-300">
      <div className={`grid gap-8 ${post.coverImage ? 'lg:grid-cols-3' : 'grid-cols-1'}`}>
        {post.coverImage && (
          <div className="relative aspect-[4/3] lg:aspect-square rounded-xl overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className={post.coverImage ? 'lg:col-span-2 space-y-6' : 'col-span-1 space-y-6'}>
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
            <Link 
              href={`/posts/${post.slug}`}
              className="hover:text-green-600 transition-colors"
            >
              {post.title}
            </Link>
          </h3>
          
          <p className="text-gray-700 text-base leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between pt-4">
            <div className="post-meta text-sm">
              <User className="w-4 h-4" />
              <span className="font-medium">{post.author}</span>
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}</span>
            </div>
            
            <Link 
              href={`/posts/${post.slug}`}
              className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold group"
            >
              Read Article
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-4">
              {post.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
              {post.tags.length > 4 && (
                <span className="text-sm text-gray-500 px-3 py-2">
                  +{post.tags.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
