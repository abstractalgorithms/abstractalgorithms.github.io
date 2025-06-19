import Link from 'next/link'
import { 
  BookOpen, 
  Code, 
  MessageSquare, 
  Star, 
  Users, 
  Target, 
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Github,
  Mail,
  Edit3
} from 'lucide-react'

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contribute to Abstract Algorithms
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community of developers, writers, and learners. There are many ways to contribute, 
            regardless of your experience level.
          </p>
        </div>

        {/* Quick Start for New Contributors */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-12">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-blue-900">New Contributor?</h2>
          </div>
          <p className="text-blue-800 mb-6">
            Start here for a guided introduction to contributing to our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/contribute#guide"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <BookOpen className="mr-2 w-5 h-5" />
              Read Contributor Guide
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link 
              href="/contribute#templates"
              className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <Edit3 className="mr-2 w-5 h-5" />
              View Templates
            </Link>
          </div>
        </div>

        {/* Contribution Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Write Content */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mr-4">
                <Edit3 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Write Content</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Share your knowledge by writing tutorials, explanations, or deep-dives into algorithms and data structures.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Algorithm explanations and walkthroughs
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                System design case studies
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Programming language guides
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Interview preparation tips
              </div>
            </div>
            <Link 
              href="/content-creator"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors w-full justify-center"
            >
              <Edit3 className="mr-2 w-5 h-5" />
              Start Writing
            </Link>
          </div>

          {/* Code Contributions */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mr-4">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Code & Examples</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Contribute code examples, algorithm implementations, or help improve the platform itself.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Algorithm implementations
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Code examples and demos
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Bug fixes and improvements
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                New features and tools
              </div>
            </div>
            <a 
              href="https://github.com/abstractalgorithms"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors w-full justify-center"
            >
              <Github className="mr-2 w-5 h-5" />
              View on GitHub
            </a>
          </div>

          {/* Community Support */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Community Support</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Help other learners by answering questions, providing feedback, and sharing your experience.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Answer questions in discussions
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Review and provide feedback
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Share learning resources
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Mentor newcomers
              </div>
            </div>
            <a 
              href="mailto:community@abstractalgorithms.com"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors w-full justify-center"
            >
              <Mail className="mr-2 w-5 h-5" />
              Join Community
            </a>
          </div>

          {/* Feedback & Ideas */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mr-4">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Ideas & Feedback</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Share your ideas for new topics, suggest improvements, or report issues to help us grow.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Suggest new topics or series
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Report bugs or issues
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Propose platform improvements
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Share user experience feedback
              </div>
            </div>
            <a 
              href="mailto:feedback@abstractalgorithms.com"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors w-full justify-center"
            >
              <MessageSquare className="mr-2 w-5 h-5" />
              Share Feedback
            </a>
          </div>
        </div>

        {/* Contributor Guide Section */}
        <div id="guide" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contributor Guide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-1 text-sm font-semibold">1</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Choose Your Topic</h4>
                    <p className="text-gray-600 text-sm">Pick an algorithm, data structure, or concept you're passionate about</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-1 text-sm font-semibold">2</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Plan Your Content</h4>
                    <p className="text-gray-600 text-sm">Outline your approach and consider your target audience</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-1 text-sm font-semibold">3</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Write & Submit</h4>
                    <p className="text-gray-600 text-sm">Use our content creator tool or submit via GitHub</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Content Guidelines</h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Clear, beginner-friendly explanations
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Include practical examples and code
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Proper citations and references
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Original content or proper attribution
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Accurate technical information
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div id="templates" className="bg-gray-100 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Content Templates</h2>
          <p className="text-gray-600 mb-8">
            Use these templates as starting points for your articles. They include structure, examples, and best practices.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Algorithm Explanation</h3>
              <p className="text-gray-600 text-sm mb-4">
                Template for explaining how algorithms work with examples and analysis.
              </p>
              <Link 
                href="/templates/algorithm"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Template →
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Structure Guide</h3>
              <p className="text-gray-600 text-sm mb-4">
                Structure for comprehensive data structure explanations with operations.
              </p>
              <Link 
                href="/templates/data-structure"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Template →
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">System Design</h3>
              <p className="text-gray-600 text-sm mb-4">
                Framework for system design articles with scalability considerations.
              </p>
              <Link 
                href="/templates/system-design"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Template →
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Contribute?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of contributors and help make algorithms accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/content-creator"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Edit3 className="mr-2 w-5 h-5" />
              Start Writing Now
            </Link>
            <a 
              href="mailto:contributors@abstractalgorithms.com"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-colors"
            >
              <Mail className="mr-2 w-5 h-5" />
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
