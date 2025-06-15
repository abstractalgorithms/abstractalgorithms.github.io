import Link from 'next/link'
import { ArrowLeft, Code, Database, Layers, BookOpen, Users, Target, Lightbulb } from 'lucide-react'
import Image from 'next/image'

export const metadata = {
  title: 'About - Abstract Algorithms',
  description: 'Learn about Abstract Algorithms - our mission to make complex algorithms and data structures accessible through clear explanations and practical examples.',
}

export default function AboutPage() {
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
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              About Abstract Algorithms
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Making complex algorithms and data structures accessible through clear explanations, 
              visual examples, and practical implementations.
            </p>
          </div>
        </div>
      </div>

      <div className="wide-container py-16 space-y-20">
        {/* Mission Statement */}
        <section className="text-center max-w-4xl mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Target className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            We believe that understanding algorithms and data structures shouldn't be intimidating or overly academic. 
            Our goal is to bridge the gap between theoretical computer science and practical software development by 
            providing clear, visual, and hands-on explanations that make complex concepts accessible to developers 
            of all levels.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Explanations</h3>
              <p className="text-gray-600">Breaking down complex concepts into digestible, understandable pieces</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Practical Examples</h3>
              <p className="text-gray-600">Real-world implementations and use cases you can apply immediately</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visual Learning</h3>
              <p className="text-gray-600">Diagrams, charts, and visual aids to enhance understanding</p>
            </div>
          </div>
        </section>

        {/* What We Cover */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Cover</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our content spans the fundamental topics that every software engineer should understand
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Algorithms</h3>
              <p className="text-gray-700 mb-4">
                From basic sorting and searching to advanced graph algorithms and dynamic programming techniques.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Sorting & Searching</li>
                <li>• Graph Algorithms</li>
                <li>• Dynamic Programming</li>
                <li>• Greedy Algorithms</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Data Structures</h3>
              <p className="text-gray-700 mb-4">
                Essential data structures that form the building blocks of efficient software systems.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Arrays & Linked Lists</li>
                <li>• Trees & Graphs</li>
                <li>• Hash Tables</li>
                <li>• Heaps & Priority Queues</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">System Design</h3>
              <p className="text-gray-700 mb-4">
                Large-scale system architecture and design patterns for building scalable applications.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Scalability Patterns</li>
                <li>• Database Design</li>
                <li>• Caching Strategies</li>
                <li>• Distributed Systems</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Analysis</h3>
              <p className="text-gray-700 mb-4">
                Understanding algorithm complexity and optimization techniques for better performance.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Big O Notation</li>
                <li>• Time Complexity</li>
                <li>• Space Complexity</li>
                <li>• Optimization Techniques</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Interview Prep</h3>
              <p className="text-gray-700 mb-4">
                Comprehensive guides for technical interviews and coding challenges.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Common Interview Questions</li>
                <li>• Problem-Solving Strategies</li>
                <li>• System Design Interviews</li>
                <li>• Coding Best Practices</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Best Practices</h3>
              <p className="text-gray-700 mb-4">
                Industry best practices and patterns for writing maintainable, efficient code.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Code Organization</li>
                <li>• Design Patterns</li>
                <li>• Testing Strategies</li>
                <li>• Documentation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-12">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Approach</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We believe learning is most effective when it combines theory with practice. Each article includes:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">📝 Clear Explanations</h3>
                <p className="text-gray-700">
                  Every concept is broken down into simple, easy-to-understand explanations with minimal jargon.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🎨 Visual Diagrams</h3>
                <p className="text-gray-700">
                  Custom diagrams and visualizations help illustrate how algorithms and data structures work.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">💻 Code Examples</h3>
                <p className="text-gray-700">
                  Practical implementations in multiple programming languages with detailed comments.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🔍 Real-World Applications</h3>
                <p className="text-gray-700">
                  Examples of how these concepts are used in actual software development scenarios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Learning Community</h2>
          <p className="text-lg text-gray-600 mb-8">
            Start your journey into the world of algorithms and data structures. Whether you're a beginner 
            or looking to deepen your understanding, we have content for every level.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/discover"
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg"
            >
              Explore Content
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
