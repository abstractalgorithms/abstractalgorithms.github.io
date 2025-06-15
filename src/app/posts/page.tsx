import { Suspense } from 'react'
import { getPosts } from '../../lib/posts'
import PostsPageClient from './PostsPageClient'

export const metadata = {
  title: 'All Posts - Abstract Algorithms',
  description: 'Browse all articles about algorithms, data structures, and software engineering concepts.',
}

function PostsPageFallback() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="wide-container py-12">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-24 mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96"></div>
          </div>
        </div>
      </div>
      <div className="wide-container py-12">
        <div className="grid gap-8 md:gap-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function AllPostsPage() {
  const posts = await getPosts()

  return (
    <Suspense fallback={<PostsPageFallback />}>
      <PostsPageClient posts={posts} />
    </Suspense>
  )
}
