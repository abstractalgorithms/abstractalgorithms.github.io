import React from 'react'

interface MDXPreviewProps {
  content: string
  className?: string
}

export default function MDXPreview({ content, className = '' }: MDXPreviewProps) {
  // Simple markdown-like rendering for preview
  const renderPreview = (mdxContent: string) => {
    return mdxContent
      // Convert headers
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-2">$1</h3>')
      
      // Convert bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // Convert links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
      
      // Convert code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>')
      
      // Convert inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
      
      // Convert images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg shadow-md my-4" />')
      
      // Convert lists
      .replace(/^\* (.*$)/gim, '<li class="ml-4">• $1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>')
      
      // Convert line breaks
      .replace(/\n/g, '<br>')
  }

  return (
    <div className={`prose prose-lg prose-gray max-w-none ${className}`}>
      <div 
        dangerouslySetInnerHTML={{ 
          __html: renderPreview(content) 
        }} 
      />
    </div>
  )
}
