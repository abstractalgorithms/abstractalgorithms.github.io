'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'

interface PostContentWrapperProps {
  slug: string
}

// Create dynamic components that properly process MDX with all plugins
const createMDXComponent = (slug: string) => {
  return dynamic(
    () => import(`../posts/${slug}/content.mdx`),
    { 
      ssr: false,
      loading: () => <div className="animate-pulse h-64 bg-gray-100 rounded"></div>
    }
  )
}

export default function PostContentWrapper({ slug }: PostContentWrapperProps) {
  const PostContent = useMemo(() => {
    return createMDXComponent(slug)
  }, [slug])

  if (!PostContent) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Content not found for slug: {slug}</p>
        <p className="text-sm text-gray-400 mt-2">
          Available posts: hash-tables-ultimate-guide, database-indexes-guide, big-o-notation-guide, latency-numbers, learning-terraform-series, little's-law, system-design-interview
        </p>
      </div>
    )
  }

  return (
    <div className="prose-medium">
      <PostContent />
    </div>
  )
}
