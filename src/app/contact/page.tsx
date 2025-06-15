import Link from 'next/link'
import { ArrowLeft, Mail, MessageSquare, Github, Linkedin, Twitter, Send, Clock, MapPin } from 'lucide-react'
import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact - Abstract Algorithms',
  description: 'Get in touch with Abstract Algorithms. Have questions, suggestions, or want to collaborate? We\'d love to hear from you.',
}

export default function ContactPage() {
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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions, suggestions, or want to collaborate? We'd love to hear from you.
            </p>
          </div>
        </div>
      </div>

      <div className="wide-container py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Let's Connect</h2>
              <p className="text-gray-600 mb-8">
                Whether you have questions about algorithms, want to suggest a topic, 
                or are interested in collaborating, we're here to help.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 mb-2">Send us an email anytime</p>
                  <a 
                    href="mailto:contact@abstractalgorithms.dev"
                    className="text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    contact@abstractalgorithms.dev
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Discussions</h3>
                  <p className="text-gray-600 mb-2">Join community discussions</p>
                  <a 
                    href="https://github.com/abstractalgorithms/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    GitHub Discussions
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Response Time</h3>
                  <p className="text-gray-600">
                    We typically respond within 24-48 hours during business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/abstractalgorithms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors group"
                >
                  <Github className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
                </a>
                <a
                  href="https://twitter.com/abstractalgs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-xl flex items-center justify-center transition-colors group"
                >
                  <Twitter className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                </a>
                <a
                  href="https://linkedin.com/company/abstractalgorithms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-xl flex items-center justify-center transition-colors group"
                >
                  <Linkedin className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                </a>
              </div>
            </div>
          </div>          {/* Contact Form */}
          <ContactForm />
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I suggest topics for new articles?
              </h3>
              <p className="text-gray-600">
                Absolutely! We welcome topic suggestions from our community. 
                Send us an email or use the contact form above to share your ideas.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How often do you publish new content?
              </h3>
              <p className="text-gray-600">
                We aim to publish new articles regularly, typically 1-2 times per week. 
                Follow us on social media or subscribe to our newsletter for updates.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Are you open to guest contributions?
              </h3>
              <p className="text-gray-600">
                Yes! We're interested in high-quality guest posts that align with our mission. 
                Please reach out with your proposal and writing samples.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I use your content for educational purposes?
              </h3>
              <p className="text-gray-600">
                Our content is designed to be educational. Please contact us for specific 
                use cases and we'll be happy to discuss appropriate usage and attribution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
