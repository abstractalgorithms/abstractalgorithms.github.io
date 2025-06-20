'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Post } from '../lib/posts'
import SeriesQuiz from './SeriesQuiz'
import { BadgeDisplay } from './BadgeSystem'
import TableOfContents from './TableOfContents'
import { terraformQuizQuestions } from '../data/terraformQuiz'
import { databaseIndexesQuizQuestions } from '../data/databaseIndexesQuiz'
import { 
  systemDesignIntroQuizQuestions,
  urlShortenerQuizQuestions,
  chatSystemQuizQuestions,
  socialMediaQuizQuestions,
  videoStreamingQuizQuestions,
  distributedCacheQuizQuestions
} from '../data/systemDesignQuiz'

// Create dynamic components that properly process MDX with all plugins
const createMDXComponent = (slug: string) => {
  // Handle series parts - if slug contains a slash, it's likely a series part
  const mdxPath = slug.includes('/') 
    ? slug  // For parts like "system-design-interview/part-2"
    : `${slug}/content`; // For main posts like "system-design-interview"
    
  return dynamic(
    () => import(`../posts/${mdxPath}.mdx`).catch((err) => {
      console.error(`Failed to load MDX file: ../posts/${mdxPath}.mdx`, err);
      // Return a fallback component
      return {
        default: () => (
          <div className="text-center py-12 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Content Unavailable</h3>
            <p className="text-yellow-700">Unable to load content for: {slug}</p>
            <p className="text-sm text-yellow-600 mt-2">File path: ../posts/{mdxPath}.mdx</p>
          </div>
        )
      };
    }),
    { 
      ssr: false,
      loading: () => <div className="animate-pulse h-64 bg-gray-100 rounded"></div>
    }
  )
}

// Component to dynamically load and render MDX content
function DynamicMDXContent({ slug }: { slug: string }) {
  const [error, setError] = useState<string | null>(null);
  
  const PostContent = useMemo(() => {
    try {
      return createMDXComponent(slug);
    } catch (err) {
      setError(`Failed to load content for: ${slug}`);
      return null;
    }
  }, [slug]);

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-medium">{error}</p>
        <p className="text-sm text-red-500 mt-2">Please check if the content file exists.</p>
      </div>
    );
  }

  if (!PostContent) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse h-64 bg-gray-100 rounded mb-4"></div>
        <p className="text-gray-600">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <PostContent />
    </div>
  );
}

interface DynamicSeriesContentProps {
  initialPost: Post
  allSeriesParts: Post[]
}

export default function DynamicSeriesContent({ initialPost, allSeriesParts }: DynamicSeriesContentProps) {
  const [currentPost, setCurrentPost] = useState(initialPost)
  const [isLoading, setIsLoading] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const currentOrder = currentPost.series?.order || 1
  const total = currentPost.series?.total || 1
  const seriesName = currentPost.series?.name || ''

  const hasPrev = currentOrder > 1 || showQuiz
  const hasNext = currentOrder < total && !showQuiz

  // Check if user has completed this series before
  useEffect(() => {
    const badges = JSON.parse(localStorage.getItem('earnedBadges') || '[]')
    const badgeId = `${seriesName.toLowerCase().replace(/\s+/g, '-')}-completion`
    setQuizCompleted(badges.includes(badgeId))
  }, [seriesName])
    const handlePartChange = async (targetOrder: number) => {
    if (targetOrder === currentOrder && !showQuiz) return
    
    setIsLoading(true)
    setShowQuiz(false)
    
    // Find the target post in our series parts
    const targetPost = allSeriesParts.find(post => post.series?.order === targetOrder)
    
    if (targetPost) {
      setCurrentPost(targetPost)
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    setIsLoading(false)
  }

  const goToPrev = () => {
    if (showQuiz) {
      // Go back to last part
      setShowQuiz(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (hasPrev) {
      handlePartChange(currentOrder - 1)
    }
  }
  
  const goToNext = () => {
    if (hasNext) {
      handlePartChange(currentOrder + 1)
    } else if (currentOrder === total && !showQuiz) {
      // Show quiz after completing all parts
      setShowQuiz(true)
      // Don't change URL for quiz to avoid static generation issues
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleQuizComplete = (score: number, passed: boolean) => {
    if (passed) {
      setQuizCompleted(true)
      // Store badge info with date
      const badgeDetails = JSON.parse(localStorage.getItem('badgeDetails') || '{}')
      const badgeId = `${seriesName.toLowerCase().replace(/\s+/g, '-')}-completion`
      badgeDetails[badgeId] = {
        earnedDate: new Date().toLocaleDateString(),
        score: Math.round(score * 100)
      }
      localStorage.setItem('badgeDetails', JSON.stringify(badgeDetails))    }
  }
  
  const getQuizQuestions = () => {
    // Return questions based on series name
    if (seriesName.toLowerCase().includes('terraform')) {
      return terraformQuizQuestions
    }
    
    if (seriesName.toLowerCase().includes('database indexes')) {
      return databaseIndexesQuizQuestions
    }
    
    if (seriesName.toLowerCase().includes('system design')) {
      // System Design Interview series uses different quizzes per part
      switch (currentOrder) {
        case 1: return systemDesignIntroQuizQuestions
        case 2: return urlShortenerQuizQuestions
        case 3: return chatSystemQuizQuestions
        case 4: return socialMediaQuizQuestions
        case 5: return videoStreamingQuizQuestions
        case 6: return distributedCacheQuizQuestions
        default: return systemDesignIntroQuizQuestions
      }
    }
    
    // Add more quiz sets for other series
    return []
  }
  const handleQuizExit = () => {
    setShowQuiz(false)
    // Don't change URL to avoid static generation issues
    // The UI state change is sufficient
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Sticky Navigation Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 shadow-lg z-20 backdrop-blur-sm">
        <nav className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Left: Series Info */}
            <div className="flex items-center space-x-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full font-medium text-xs">
                    LEARNING SERIES
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm font-medium text-gray-700">{seriesName}</span>
                </div>
                <div className="text-xl font-bold text-gray-900 truncate max-w-md lg:max-w-lg">
                  {showQuiz ? 'Final Quiz' : currentPost.title}
                </div>
              </div>
              
              {/* Badge Display if earned */}
              {quizCompleted && (
                <div className="hidden sm:block flex-shrink-0">
                  <BadgeDisplay badgeId={`${seriesName.toLowerCase().replace(/\s+/g, '-')}-completion`} inline />
                </div>
              )}
            </div>
            
            {/* Right: Progress */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {showQuiz ? 'Final Quiz' : `Part ${currentOrder} of ${total}`}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {Math.round((showQuiz ? 100 : (currentOrder / total) * 100))}% Complete
                </div>
              </div>
              
              <div className="w-24 sm:w-32 lg:w-40 xl:w-48 flex-shrink-0">
                <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"                    style={{ width: `${showQuiz ? 100 : (currentOrder / total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </nav>      </div>      {/* Timeline Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="text-center mb-4">
            <span className="text-base font-semibold text-gray-800">Series Timeline</span>
            <p className="text-xs text-gray-600 mt-1">Navigate through the learning series</p>
          </div>
          
          {/* Timeline Container */}
          <div className="relative overflow-x-auto pb-2">
            <div className="flex items-center justify-between min-w-max px-4">
              {/* Timeline Line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
              <div 
                className="absolute top-8 left-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 z-10 transition-all duration-700"
                style={{ width: `${((currentOrder - 1) / Math.max(total - 1, 1)) * 100}%` }}
              ></div>
                {/* Timeline Items */}
              {Array.from({ length: total }, (_, i) => i + 1).map((partNum) => {
                const partPost = allSeriesParts.find(p => p.series?.order === partNum)
                const partTitle = partPost?.title || `Part ${partNum}`
                // Extract meaningful title parts - remove common prefixes and get core topic
                const shortTitle = partTitle
                  .replace(/^(Part \d+:\s*|Design a\s*|Database Indexes?\s*)/i, '')
                  .replace(/:\s*[A-Z].*$/, '') // Remove subtitle after colon
                  .trim()
                const isActive = partNum === currentOrder && !showQuiz
                const isCompleted = partNum < currentOrder || (partNum <= currentOrder && quizCompleted)
                const isAccessible = partNum <= currentOrder || isCompleted
                  return (
                  <div key={partNum} className="flex flex-col items-center z-20 bg-white px-1">
                    {/* Timeline Node */}
                    <button
                      onClick={() => handlePartChange(partNum)}
                      disabled={isLoading || !isAccessible}
                      className={`w-12 h-12 rounded-full text-xs font-bold transition-all duration-300 shadow-md border-2 relative ${
                        isActive
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-300 shadow-xl scale-110 ring-2 ring-blue-200'
                          : isCompleted
                          ? 'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-300 hover:scale-105 shadow-lg'
                          : isAccessible
                          ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:scale-105 shadow-sm'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                      title={partTitle}
                    >
                      {isCompleted && !isActive ? (
                        <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        partNum
                      )}
                    </button>
                    
                    {/* Title */}
                    <div className="mt-2 text-center max-w-24">
                      <div className="text-xs font-medium text-gray-700 leading-tight">
                        Part {partNum}
                      </div>
                      <div className="text-xs text-gray-500 leading-tight">
                        {shortTitle.length > 18 ? shortTitle.substring(0, 18) + '...' : shortTitle}
                      </div>
                    </div>
                  </div>
                )
              })}
              
              {/* Final Quiz */}
              <div className="flex flex-col items-center z-20 bg-white px-2">
                <button
                  onClick={() => setShowQuiz(true)}
                  disabled={isLoading || currentOrder < total}
                  className={`w-16 h-16 rounded-full text-lg font-bold transition-all duration-300 shadow-md border-4 ${
                    showQuiz
                      ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white border-purple-300 shadow-xl scale-110 ring-2 ring-purple-200'
                      : currentOrder >= total
                      ? quizCompleted
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-yellow-300 shadow-xl hover:scale-105'
                        : 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 border-purple-300 hover:bg-purple-200 hover:scale-105 shadow-lg'
                      : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                  title="Final Quiz"
                >
                  {quizCompleted ? (
                    <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    'Q'
                  )}
                </button>
                
                <div className="mt-3 text-center max-w-24">
                  <div className="text-xs font-medium text-gray-700 leading-tight">
                    Final Quiz
                  </div>                  <div className="text-xs text-gray-500 mt-1 leading-tight">
                    Test Knowledge
                  </div>
                </div>
              </div>            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span className="ml-3 text-gray-600">Loading...</span>
            </div>
          ) : showQuiz ? (
            <div className="max-w-4xl mx-auto">
              <SeriesQuiz
                seriesName={seriesName}
                questions={getQuizQuestions()}
                onQuizComplete={handleQuizComplete}
                onQuizExit={handleQuizExit}
              />
            </div>          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
              {/* Table of Contents - Desktop Sidebar */}
              <div className="hidden lg:block lg:col-span-1 order-2 lg:order-1">
                <div className="sticky top-32">
                  <TableOfContents className="max-w-full" />
                </div>
              </div>
                {/* Main Content */}
              <div className="lg:col-span-4 order-1 lg:order-2">                {/* Table of Contents - Mobile */}
                <div className="lg:hidden mb-6">
                  <TableOfContents />
                </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-8 lg:p-12">                    <div 
                      className="prose prose-lg prose-gray max-w-none
                                 prose-headings:text-gray-900 prose-headings:font-semibold
                                 prose-h1:text-3xl prose-h1:mb-8 prose-h1:mt-0 prose-h1:leading-tight
                                 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3 prose-h2:leading-tight
                                 prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-5 prose-h3:leading-tight
                                 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
                                 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                                 prose-strong:text-gray-900 prose-strong:font-semibold                                 prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-medium
                                 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-lg prose-pre:shadow-sm
                                 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:my-6
                                 prose-ul:my-6 prose-ol:my-6 prose-ul:space-y-2 prose-ol:space-y-2
                                 prose-li:my-1 prose-li:leading-relaxed
                                 prose-table:text-sm prose-table:shadow-sm prose-table:border prose-table:border-gray-200 prose-table:rounded-lg prose-table:overflow-hidden
                                 prose-th:bg-gray-50 prose-th:font-semibold prose-th:text-gray-800 prose-th:px-4 prose-th:py-3
                                 prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-gray-200
                                 prose-img:rounded-lg prose-img:shadow-md prose-img:my-8">
                      <DynamicMDXContent slug={currentPost.slug} />
                    </div>
                  </div>
                </div>
                  {/* Bottom Navigation Buttons - Inside Content Area */}
                {!showQuiz && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex gap-3 sm:gap-6">
                      <button
                        onClick={goToPrev}
                        disabled={!hasPrev || isLoading}
                        className={`px-6 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                          hasPrev && !isLoading
                            ? 'bg-gray-700 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105'
                            : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                        }`}
                      >
                        ← Previous
                      </button>
                      <button
                        onClick={goToNext}
                        disabled={isLoading}
                        className={`px-6 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                          !isLoading
                            ? currentOrder === total
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105'
                              : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105'
                            : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                        }`}
                      >
                        {currentOrder === total ? 'Take Final Quiz →' : 'Next Part →'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}        </div>
      </div>
    </div>
  )
}
