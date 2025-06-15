import Link from 'next/link'
import { ArrowRight, Code, Database, Layers } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="medium-container">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Master the Art of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Algorithms
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Dive deep into algorithms, data structures, and system design with clear explanations, 
            visual examples, and practical implementations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link 
              href="#latest" 
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors group"
            >
              Start Reading
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/about" 
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Algorithms</h3>
              <p className="text-gray-600 text-sm">
                From sorting to graph traversal, master the fundamental algorithms
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Structures</h3>
              <p className="text-gray-600 text-sm">
                Learn about trees, graphs, hashmaps and advanced data structures
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">System Design</h3>
              <p className="text-gray-600 text-sm">
                Understand how to design scalable and robust systems
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
