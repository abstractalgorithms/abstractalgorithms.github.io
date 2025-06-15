interface PostContentProps {
  content: string
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div 
      className="prose-medium"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
