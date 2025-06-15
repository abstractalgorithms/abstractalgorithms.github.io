import { getPosts } from '../../lib/posts'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Code, Database, Layers, TrendingUp, Users, Star, Lightbulb, Trophy, Brain } from 'lucide-react'
import Image from 'next/image'

export const metadata = {
  title: 'Discover - Abstract Algorithms',
  description: 'Discover and explore articles by categories, topics, and complexity levels.',
}

interface CategoryConfig {
  icon: React.ComponentType<any>
  color: string
  bgColor: string
  description: string
}

const categoryConfig: Record<string, CategoryConfig> = {
  'algorithms': {
    icon: Code,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Sorting, searching, and optimization algorithms'
  },
  'data-structures': {
    icon: Database,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Trees, graphs, hash tables, and more'
  },
  'system-design': {
    icon: Layers,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Scalable architecture and distributed systems'
  },
  'devops': {
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    description: 'Infrastructure, automation, and deployment'
  },
  'performance': {
    icon: TrendingUp,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Optimization and performance analysis'
  },
  'complexity': {
    icon: Brain,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    description: 'Algorithm analysis and Big O notation'
  }
}

export default async function DiscoverPage() {
  const posts = await getPosts()

  // Group posts by primary category (first tag)
  const postsByCategory = posts.reduce((acc, post) => {
    const primaryTag = post.tags[0] || 'other'
    if (!acc[primaryTag]) {
      acc[primaryTag] = []
    }
    acc[primaryTag].push(post)
    return acc
  }, {} as Record<string, typeof posts>)
  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)))
  
  // Featured/Latest posts
  const featuredPosts = posts.slice(0, 3)
  
  // Most popular categories
  const popularCategories = Object.entries(postsByCategory)
    .sort(([,a], [,b]) => b.length - a.length)
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="wide-container py-12">
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <div className="flex items-center text-sm text-gray-500">
              <BookOpen className="w-4 h-4 mr-2" />
              {posts.length} articles • {Object.keys(postsByCategory).length} categories
            </div>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore our knowledge base organized by topics, categories, and complexity levels. Find exactly what you're looking for.
            </p>
          </div>
        </div>
      </div>

      <div className="wide-container py-16 space-y-16">
        {/* Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {allTags.slice(0, 12).map((tag) => (
            <Link
              key={tag}
              href={`/posts?tag=${encodeURIComponent(tag)}`}
              className="flex items-center justify-center p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 text-center group"
            >
              <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                {tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </Link>
          ))}
        </div>

        {/* Featured Content */}
        <section>
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Content</h2>
              <p className="text-lg text-gray-600">Our most popular and comprehensive guides</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group"
              >
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
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.readingTime}</span>
                    <div className="flex gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
              <Layers className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
              <p className="text-lg text-gray-600">Organized content by topic and expertise level</p>
            </div>
          </div>

          <div className="space-y-12">
            {popularCategories.map(([category, categoryPosts]) => {
              const config = categoryConfig[category] || {
                icon: BookOpen,
                color: 'text-gray-600',
                bgColor: 'bg-gray-50',
                description: 'Various topics and concepts'
              }
              const IconComponent = config.icon

              return (
                <div key={category} className="bg-white rounded-2xl p-8 border border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 ${config.bgColor} rounded-xl flex items-center justify-center mr-4`}>
                      <IconComponent className={`w-7 h-7 ${config.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      <p className="text-gray-600">{config.description}</p>
                    </div>
                    <Link
                      href={`/posts?tag=${encodeURIComponent(category)}`}
                      className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      View All ({categoryPosts.length})
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryPosts.slice(0, 3).map((post) => (
                      <Link
                        key={post.slug}
                        href={`/posts/${post.slug}`}
                        className="group block"
                      >
                        <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                          {post.coverImage && (
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 mb-2">
                              {post.title}
                            </h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>{post.readingTime}</span>
                              <span className="mx-2">•</span>
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Knowledge Hub Stats</h2>
            <p className="text-lg text-gray-600">Our growing collection of technical content</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{posts.length}</div>
              <div className="text-sm text-gray-600">Total Articles</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Layers className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{Object.keys(postsByCategory).length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{allTags.length}</div>
              <div className="text-sm text-gray-600">Topics</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Lightbulb className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {Math.round(posts.reduce((acc, post) => acc + parseInt(post.readingTime), 0) / posts.length)}
              </div>
              <div className="text-sm text-gray-600">Avg. Read Time</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
