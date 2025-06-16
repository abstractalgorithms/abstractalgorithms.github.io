'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import TableOfContents from './TableOfContents'

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
  }  return (
    <div className="px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Table of Contents - Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-32">
              <TableOfContents className="max-w-full" />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            {/* Table of Contents - Mobile */}
            <div className="lg:hidden mb-6">
              <TableOfContents />
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8 lg:p-12">
                <div className="prose prose-lg prose-gray max-w-none
                             prose-headings:text-gray-900 prose-headings:font-semibold
                             prose-h1:text-3xl prose-h1:mb-8 prose-h1:mt-0 prose-h1:leading-tight
                             prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3 prose-h2:leading-tight
                             prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-5 prose-h3:leading-tight
                             prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
                             prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                             prose-strong:text-gray-900 prose-strong:font-semibold
                             prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-medium
                             prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-lg prose-pre:shadow-sm
                             prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:my-6
                             prose-ul:my-6 prose-ol:my-6 prose-ul:space-y-2 prose-ol:space-y-2
                             prose-li:my-1 prose-li:leading-relaxed
                             prose-table:text-sm prose-table:shadow-sm prose-table:border prose-table:border-gray-200 prose-table:rounded-lg prose-table:overflow-hidden
                             prose-th:bg-gray-50 prose-th:font-semibold prose-th:text-gray-800 prose-th:px-4 prose-th:py-3
                             prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-gray-200
                             prose-img:rounded-lg prose-img:shadow-md prose-img:my-8">
                  <PostContent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
