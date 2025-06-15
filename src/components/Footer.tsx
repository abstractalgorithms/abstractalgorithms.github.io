import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="medium-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Abstract Algorithms</h3>
            <p className="text-gray-600 mb-4 max-w-md">
              Exploring the fascinating world of algorithms, data structures, and software engineering 
              through clear explanations and practical examples.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/abstractalgorithms" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/abstractalgs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/company/abstractalgorithms" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@abstractalgorithms.dev"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Topics</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tag/algorithms" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Algorithms
                </Link>
              </li>
              <li>
                <Link href="/tag/data-structures" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Data Structures
                </Link>
              </li>
              <li>
                <Link href="/tag/system-design" className="text-gray-600 hover:text-gray-900 transition-colors">
                  System Design
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} Abstract Algorithms. Built with Next.js and hosted on GitHub Pages.
          </p>
        </div>
      </div>
    </footer>
  )
}
