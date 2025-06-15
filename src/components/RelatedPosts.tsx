import Link from 'next/link'
import PostCard from './PostCard'
import type { Post } from '../lib/posts'

interface RelatedPostsProps {
  posts: Post[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="bg-gray-50 py-16">
      <div className="medium-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">More Articles</h2>
          <p className="text-gray-600">Continue exploring algorithms and system design</p>
        </div>
        
        <div className="grid gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}
