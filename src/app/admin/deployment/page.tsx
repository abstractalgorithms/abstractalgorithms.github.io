'use client'

import { useState } from 'react'
import { useDeploymentStatus } from '../../../components/DeploymentBanner'

export default function AdminPage() {
  const { isDeploying, showDeploymentBanner, hideDeploymentBanner } = useDeploymentStatus()
  const [customMessage, setCustomMessage] = useState('')

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Deployment Banner Admin
          </h1>

          <div className="space-y-6">
            {/* Current Status */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Current Status</h2>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                isDeploying 
                  ? 'bg-orange-100 text-orange-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {isDeploying ? '🟡 Deployment Banner Active' : '🟢 Normal Operation'}
              </div>
            </div>

            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={showDeploymentBanner}
                disabled={isDeploying}
                className="w-full bg-orange-600 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Show Deployment Banner
              </button>

              <button
                onClick={hideDeploymentBanner}
                disabled={!isDeploying}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Hide Deployment Banner
              </button>
            </div>

            {/* Environment Variables Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Environment Variables</h2>
              <p className="text-sm text-gray-600 mb-3">
                For production deployments, set these environment variables:
              </p>
              <div className="bg-white p-3 rounded border font-mono text-sm">
                <div><span className="text-blue-600">DEPLOYMENT_IN_PROGRESS</span>=true</div>
                <div><span className="text-blue-600">MAINTENANCE_MODE</span>=true</div>
              </div>
            </div>

            {/* API Test */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">API Status Check</h2>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch('/api/deployment-status')
                    const data = await response.json()
                    alert(JSON.stringify(data, null, 2))
                  } catch (error) {
                    alert('API Error: ' + error)
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Test API Endpoint
              </button>
            </div>

            {/* Instructions */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">🚀 Deployment Integration</h2>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>For CI/CD Integration:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Set <code>DEPLOYMENT_IN_PROGRESS=true</code> at deployment start</li>
                  <li>Deploy your application</li>
                  <li>Remove the environment variable or set to <code>false</code></li>
                  <li>The banner will automatically disappear</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
