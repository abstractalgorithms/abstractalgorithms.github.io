import Image from 'next/image'
import { Calendar, Clock, User, Share2, Bookmark } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Post } from '@/lib/posts'

interface PostHeaderProps {
  post: Post
}

export default function PostHeader({ post }: PostHeaderProps) {
  const formattedDate = formatDistanceToNow(new Date(post.date), { addSuffix: true })

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="medium-container py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-gray-500">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{post.author}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{formattedDate}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{post.readingTime}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Bookmark className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
        
        {post.coverImage && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
