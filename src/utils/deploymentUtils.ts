// Development utility to test deployment banner
// Add this to browser console or create a dev page

export const deploymentUtils = {
  // Show deployment banner
  showBanner: () => {
    localStorage.setItem('deployment-in-progress', 'true')
    window.location.reload()
  },
  
  // Hide deployment banner
  hideBanner: () => {
    localStorage.removeItem('deployment-in-progress')
    window.location.reload()
  },
  
  // Check current status
  checkStatus: () => {
    const status = localStorage.getItem('deployment-in-progress')
    console.log('Deployment banner status:', status === 'true' ? 'ACTIVE' : 'INACTIVE')
    return status === 'true'
  }
}

// Make it available globally for testing
if (typeof window !== 'undefined') {
  (window as any).deploymentUtils = deploymentUtils
}

// Example usage in console:
// deploymentUtils.showBanner()  // Show the banner
// deploymentUtils.hideBanner()  // Hide the banner
// deploymentUtils.checkStatus() // Check current status
