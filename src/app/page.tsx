import Link from 'next/link'
import { getPosts } from '../lib/posts'
import PostCard from '../components/PostCard'
import Hero from '../components/Hero'

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      <div className="medium-container py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Articles</h2>
          <p className="text-gray-600">Exploring algorithms, data structures, and software engineering concepts</p>
        </div>
        
        <div className="grid gap-8 md:gap-12">
          {posts.map((post, index) => (
            <PostCard 
              key={post.slug} 
              post={post} 
              featured={index === 0}
            />
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  )
}
