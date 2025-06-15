'use client'

import { useState } from 'react'
import { Send, MessageSquare } from 'lucide-react'
import Giscus from '../../components/Giscus'
import { giscusConfig, isGiscusConfigured } from '../../lib/giscus-config'

export default function ContactForm() {
  const [showGiscus, setShowGiscus] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, you would handle the form submission here
    // For now, we'll just show a message and suggest using Giscus
    setFormSubmitted(true)
  }

  const giscusConfigured = isGiscusConfigured()

  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Contact Options */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Traditional Contact Form */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <Send className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">Email Form</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Send us a direct message via email form
          </p>
          <button
            onClick={() => setShowGiscus(false)}
            className={`w-full px-4 py-2 rounded-lg border-2 transition-colors ${
              !showGiscus
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Use Email Form
          </button>
        </div>

        {/* Giscus Discussion */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <MessageSquare className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">Community Discussion</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Start a public discussion that others can see and contribute to
          </p>
          <button
            onClick={() => setShowGiscus(true)}
            className={`w-full px-4 py-2 rounded-lg border-2 transition-colors ${
              showGiscus
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            } ${!giscusConfigured ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!giscusConfigured}
          >
            {giscusConfigured ? 'Use Discussion' : 'Setup Required'}
          </button>
        </div>
      </div>

      {/* Content Area */}
      {showGiscus && giscusConfigured ? (
        /* Giscus Discussion */
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Discussion</h2>
            <p className="text-gray-600">
              Start a discussion below. Your question or message will be visible to the community, 
              and others can contribute to the conversation. You'll need a GitHub account to participate.
            </p>
          </div>
          
          <Giscus
            repo={giscusConfig.repo}
            repoId={giscusConfig.repoId}
            category={giscusConfig.category}
            categoryId={giscusConfig.categoryId}
            mapping={giscusConfig.mapping}
            strict={giscusConfig.strict}
            reactionsEnabled={giscusConfig.reactionsEnabled}
            emitMetadata={giscusConfig.emitMetadata}
            inputPosition={giscusConfig.inputPosition}
            theme={giscusConfig.theme}
            lang={giscusConfig.lang}
            loading={giscusConfig.loading}
          />
        </div>
      ) : (
        /* Traditional Contact Form */
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          
          {formSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Message Sent!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for your message. We'll get back to you soon.
              </p>
              {giscusConfigured && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    💡 <strong>Tip:</strong> For faster responses and community input, 
                    consider using our Discussion feature above!
                  </p>
                </div>
              )}
              <button
                onClick={() => setFormSubmitted(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Question</option>
                  <option value="content">Content Suggestion</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="feedback">Feedback</option>
                  <option value="technical">Technical Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-vertical"
                  placeholder="Tell us more about your question or suggestion..."
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="newsletter" className="ml-3 text-sm text-gray-600">
                  I'd like to receive updates about new articles and content
                </label>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg group"
              >
                <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Send Message
              </button>
            </form>
          )}

          {!giscusConfigured && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Want faster responses?</strong> Configure Giscus to enable community discussions! 
                  See the setup instructions in the environment variables.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <strong>Note:</strong> This is a demo contact form. In a real implementation, 
              you would need to add form handling with a backend service or email service provider.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
