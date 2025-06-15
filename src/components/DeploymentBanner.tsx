'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, X, RefreshCw } from 'lucide-react'

interface DeploymentBannerProps {
  isVisible?: boolean
  message?: string
  onDismiss?: () => void
}

export default function DeploymentBanner({ 
  isVisible = false, 
  message = "Site upgrade in progress. Some features may be temporarily unavailable.",
  onDismiss 
}: DeploymentBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
  }

  if (!isVisible || isDismissed) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <RefreshCw className="h-5 w-5 animate-spin" />
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm font-medium">{message}</p>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 rounded-md hover:bg-white/20 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Hook to detect deployment/upgrade status
export function useDeploymentStatus() {
  const [isDeploying, setIsDeploying] = useState(false)

  useEffect(() => {
    // Check for deployment status via various methods
    const checkDeploymentStatus = async () => {
      try {
        // Method 1: Check for a deployment flag in localStorage (for manual testing)
        const manualFlag = localStorage.getItem('deployment-in-progress')
        if (manualFlag === 'true') {
          setIsDeploying(true)
          return
        }

        // Method 2: Check via a status endpoint (if you have one)
        const response = await fetch('/api/deployment-status', { 
          method: 'GET',
          cache: 'no-cache'
        })
        
        if (response.ok) {
          const data = await response.json()
          setIsDeploying(data.isDeploying || false)
        }
      } catch (error) {
        // Method 3: Check via build timestamp or version mismatch
        // This could detect when a new version is available
        console.log('Deployment status check failed:', error)
      }
    }

    // Initial check
    checkDeploymentStatus()

    // Poll every 30 seconds during deployment
    const interval = setInterval(checkDeploymentStatus, 30000)

    return () => clearInterval(interval)
  }, [])

  // Manual methods to control deployment banner
  const showDeploymentBanner = () => {
    setIsDeploying(true)
    localStorage.setItem('deployment-in-progress', 'true')
  }

  const hideDeploymentBanner = () => {
    setIsDeploying(false)
    localStorage.removeItem('deployment-in-progress')
  }

  return {
    isDeploying,
    showDeploymentBanner,
    hideDeploymentBanner
  }
}
