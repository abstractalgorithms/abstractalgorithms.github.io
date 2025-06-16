import Link from 'next/link'
import { ArrowRight, Code, Database, Layers, BookOpen, FileText } from 'lucide-react'
import RotatingText from './RotatingText'

export default function Hero() {
  const rotatingTexts = [
    'Algorithms',
    'Development',
    'Concepts',
    'Data Structures',
    'System Design',
    'Programming',
    'Engineering',
    'Innovation'
  ]

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-green-50/30 py-20 lg:py-32">
      <div className="hero-container">
        <div className="text-center max-w-5xl mx-auto content-mobile-safe">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Master the Art of
            <br />
            <RotatingText 
              texts={rotatingTexts}
              interval={2500}
              className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"
            />
          </h1>
          
          {/* Clear tagline */}
          <div className="text-xl md:text-2xl font-medium text-green-700 mb-8 tracking-wide">
            Deep dives into software design, architecture, and performance
          </div>
          
          <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
            Dive deep into algorithms, data structures, and system design with clear explanations, 
            visual examples, and practical implementations that make complex concepts accessible.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link 
              href="/posts?view=series" 
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-base group"
            >
              <BookOpen className="mr-2 w-5 h-5" />
              Learning Series
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/posts?view=independent" 
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl text-base group"
            >
              <FileText className="mr-2 w-5 h-5" />
              Quick Reads
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/discover" 
              className="inline-flex items-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 text-base"
            >
              Discover Topics
            </Link>
          </div>

          {/* Content Type Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16 text-left">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-bold text-blue-900">Learning Series</h3>
              </div>
              <p className="text-blue-800 text-sm leading-relaxed">
                Structured, multi-part series that take you through complex topics step-by-step. 
                Perfect for comprehensive understanding of frameworks, architectures, or advanced concepts.
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-lg font-bold text-green-900">Quick Reads</h3>
              </div>
              <p className="text-green-800 text-sm leading-relaxed">
                Standalone articles covering specific algorithms, data structures, or concepts. 
                Great for targeted learning, quick reference, or exploring individual topics.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Code className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Algorithms</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                From sorting to graph traversal, master the fundamental algorithms that power modern software
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Data Structures</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Learn about trees, graphs, hash tables and advanced data structures that organize information efficiently
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">System Design</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Understand how to design scalable, robust systems that handle millions of users
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
