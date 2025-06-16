'use client'

import { useState, useEffect } from 'react'
import { X, Mail, Bell, ArrowRight } from 'lucide-react'

export default function StickyFooterCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if user has already dismissed the CTA
    const dismissed = localStorage.getItem('cta-dismissed')
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Show CTA after user scrolls down a bit
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      if (scrollPosition > windowHeight * 0.5) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('cta-dismissed', 'true')
  }

  const handleSubscribe = () => {
    // This would integrate with your newsletter service
    // For now, we'll just show an alert
    alert('Newsletter signup would be implemented here with your preferred service (ConvertKit, Mailchimp, etc.)')
    handleDismiss()
  }

  if (isDismissed || !isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      {/* Backdrop blur */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/80" />
      
      {/* CTA Content */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl">
        <div className="wide-container py-4 lg:py-6">
          <div className="flex items-center justify-between gap-4">
            {/* Content */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="hidden sm:flex w-12 h-12 bg-white/20 rounded-full items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg lg:text-xl mb-1">
                  Stay Updated with Latest Algorithms & System Design Content
                </h3>
                <p className="text-green-100 text-sm lg:text-base">
                  Get weekly deep dives, interview tips, and exclusive content delivered to your inbox.
                </p>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleSubscribe}
                className="inline-flex items-center bg-white text-green-600 px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors group shadow-lg text-sm lg:text-base"
              >
                <Mail className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Subscribe</span>
                <span className="sm:hidden">Join</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={handleDismiss}
                className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add these styles to your globals.css
/* 
@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
*/
