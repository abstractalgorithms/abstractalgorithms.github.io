'use client'

import { useDeploymentStatus } from './DeploymentBanner'
import DeploymentBanner from './DeploymentBanner'
import Header from './Header'
import Footer from './Footer'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isDeploying } = useDeploymentStatus()

  return (
    <div className="min-h-screen flex flex-col">
      <DeploymentBanner isVisible={isDeploying} />
      <div className={isDeploying ? 'mt-12' : ''}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
