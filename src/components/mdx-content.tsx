import React from 'react'

interface MDXContentProps {
  content: string
  className?: string
}

export function MDXContent({ content, className = "prose-medium" }: MDXContentProps) {
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  )
}

export default MDXContent