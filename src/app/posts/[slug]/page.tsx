import { notFound } from 'next/navigation'
import { getPosts, getPostBySlug } from '../../../lib/posts'
import PostHeader from '../../../components/PostHeader'
import PostContent from '../../../components/PostContent'
import RelatedPosts from '../../../components/RelatedPosts'
import GiscusComments from '../../../components/GiscusComments'
import dynamic from 'next/dynamic'

const SeriesNav = dynamic(() => import('../../../components/SeriesNav'), { ssr: false })

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: post.fixedUrl || undefined, // Use fixedUrl if specified
    },
    alternates: post.fixedUrl ? { canonical: post.fixedUrl } : undefined,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const allPosts = await getPosts()
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 6) // Show more posts for a better carousel experience

  return (
    <article className="min-h-screen bg-white">
      <PostHeader post={post} />
      {post.series && (
        <SeriesNav
          seriesName={post.series.name}
          currentOrder={post.series.order}
          total={post.series.total}
          prev={post.series.prev}
          next={post.series.next}
        />
      )}
      <div className="medium-container py-8">
        <div className="max-w-3xl mx-auto">
          <PostContent content={post.content} />
          <GiscusComments />
        </div>
      </div>
      {relatedPosts.length > 0 && (
        <RelatedPosts posts={relatedPosts} />
      )}
    </article>
  )
}
