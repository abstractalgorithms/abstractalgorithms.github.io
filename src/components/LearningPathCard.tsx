'use client'

import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight, BookOpen, PlayCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { LearningPath } from '../lib/posts'
import OptimizedImage from './OptimizedImage'

interface LearningPathCardProps {
  learningPath: LearningPath
  featured?: boolean
}

export default function LearningPathCard({ learningPath, featured = false }: LearningPathCardProps) {
  const formattedDate = formatDistanceToNow(new Date(learningPath.latestUpdate), { addSuffix: true })
  const firstPost = learningPath.posts[0]

  if (featured) {
    return (
      <article className="learning-path-card featured p-10 mb-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Learning Series
              </span>
              <div className="ml-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{learningPath.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <PlayCircle className="w-4 h-4" />
                  <span className="font-medium">{learningPath.totalPosts} parts</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              <Link 
                href={`/posts/${firstPost.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {learningPath.name}
              </Link>
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              {learningPath.description}
            </p>
            
            <div className="flex items-center justify-between pt-4">
              <div className="post-meta text-base">
                <User className="w-5 h-5" />
                <span className="font-medium">{firstPost.author}</span>
                <Calendar className="w-5 h-5" />
                <span>Updated {formattedDate}</span>
                <BookOpen className="w-5 h-5" />
                <span>{learningPath.totalPosts} parts</span>
              </div>              <Link 
                href={`/posts/${firstPost.slug}`}
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors group shadow-sm whitespace-nowrap"
              >
                Start Series
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {learningPath.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-6">
                {learningPath.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {firstPost.coverImage && (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <OptimizedImage
                src={firstPost.coverImage}
                alt={learningPath.name}
                style="featured"
                fill
                priority
                className="hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <PlayCircle className="w-5 h-5" />
                  <span>{learningPath.totalPosts} Part Series</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className="learning-path-card p-6 h-full flex flex-col">
      <div className="space-y-4 flex-1 flex flex-col">
        {/* Learning Series badge and metadata */}
        <div className="flex items-center justify-between">
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200 flex items-center gap-2">
            <BookOpen className="w-3 h-3" />
            Learning Series
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
            <PlayCircle className="w-4 h-4" />
            <span className="font-medium">{learningPath.totalPosts} parts</span>
          </div>
        </div>

        {firstPost.coverImage && (
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 flex-shrink-0">
            <OptimizedImage
              src={firstPost.coverImage}
              alt={learningPath.name}
              style="thumbnail"
              fill
              className="hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
              {learningPath.totalPosts} parts
            </div>
          </div>
        )}
        
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
          <Link 
            href={`/posts/${firstPost.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {learningPath.name}
          </Link>
        </h3>
        
        <p className="text-gray-700 leading-relaxed text-base line-clamp-3 flex-1">
          {learningPath.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{learningPath.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Updated {formattedDate}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 mt-auto">
          <div className="post-meta text-sm">
            <User className="w-4 h-4" />
            <span className="font-medium">{firstPost.author}</span>
          </div>          <Link 
            href={`/posts/${firstPost.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group flex-shrink-0 whitespace-nowrap"
          >
            Start Series
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {learningPath.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {learningPath.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="bg-gray-50 text-gray-700 px-2 py-1 rounded text-xs border border-gray-200">
                {tag}
              </span>
            ))}
            {learningPath.tags.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{learningPath.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
