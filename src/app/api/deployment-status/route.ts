import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check various indicators of deployment status
    const deploymentIndicators = {
      // Check if there's a deployment flag file (you can create this during CI/CD)
      deploymentFlag: process.env.DEPLOYMENT_IN_PROGRESS === 'true',
      
      // Check if maintenance mode is enabled
      maintenanceMode: process.env.MAINTENANCE_MODE === 'true',
      
      // You could also check for other indicators like:
      // - Recent build timestamp
      // - Version file changes
      // - External deployment service status
    }

    const isDeploying = deploymentIndicators.deploymentFlag || 
                       deploymentIndicators.maintenanceMode

    const customMessage = process.env.DEPLOYMENT_MESSAGE || 
                         "Site upgrade in progress. Some features may be temporarily unavailable."

    return NextResponse.json({
      isDeploying,
      message: isDeploying ? customMessage : "All systems operational",
      timestamp: new Date().toISOString(),
      indicators: deploymentIndicators
    })
  } catch (error) {
    console.error('Error checking deployment status:', error)
    return NextResponse.json(
      { 
        isDeploying: false, 
        message: "Status check failed",
        error: 'Unable to determine deployment status' 
      },
      { status: 500 }
    )
  }
}
