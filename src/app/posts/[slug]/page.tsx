import { notFound } from 'next/navigation'
import { getPosts, getPostBySlug } from '../../../lib/posts'
import PostHeader from '../../../components/PostHeader'
import RelatedPosts from '../../../components/RelatedPosts'
import GiscusComments from '../../../components/GiscusComments'
import PostContentWrapper from '../../../components/PostContentWrapper'
import BlogPostStructuredData from '../../../components/BlogPostStructuredData'
import DynamicSeriesContent from '../../../components/DynamicSeriesContent'
import dynamic from 'next/dynamic'

const SeriesNav = dynamic(() => import('../../../components/SeriesNav'), { ssr: false })

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  // Only generate static params for posts that should be directly accessible
  // This includes non-series posts and the first part of series (order = 1 or undefined)
  return posts
    .filter(post => !post.series || post.series.order === 1)
    .map((post) => ({
      slug: post.slug,
    }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: post.fixedUrl || undefined,
    },
    alternates: post.fixedUrl ? { canonical: post.fixedUrl } : undefined,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  // Prevent direct access to series parts (order > 1)
  // Only the first part of a series should be directly accessible
  if (post.series && post.series.order > 1) {
    notFound()
  }

  const allPosts = await getPosts()
  
  // If this is a series post, render with dynamic content
  if (post.series && post.series.total > 1) {
    // Get all parts of this series
    const seriesParts = allPosts.filter(p => 
      p.series && 
      p.series.name === post.series?.name
    ).sort((a, b) => (a.series?.order || 0) - (b.series?.order || 0))

    return (
      <>
        <DynamicSeriesContent 
          initialPost={post} 
          allSeriesParts={seriesParts} 
        />
        <div className="max-w-6xl mx-auto px-6 pb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <GiscusComments />
          </div>
        </div>
        <BlogPostStructuredData 
          title={post.title}
          description={post.excerpt}
          datePublished={post.date}
          author={post.author}
          url={`${process.env.NODE_ENV === 'production' 
            ? 'https://abstractalgorithms.github.io' 
            : 'http://localhost:3000'}/posts/${post.slug}`}
          image={post.coverImage ? 
            `${process.env.NODE_ENV === 'production' 
              ? 'https://abstractalgorithms.github.io' 
              : 'http://localhost:3000'}${post.coverImage}` 
            : undefined}
        />
      </>
    )
  }

  // Regular post rendering
  const relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 6)

  return (
    <article className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <PostHeader post={post} />
      <div className="py-8">
        <PostContentWrapper slug={params.slug} />
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <GiscusComments />
          </div>
        </div>
      </div>
      {relatedPosts.length > 0 && (
        <div className="bg-white border-t border-gray-200">
          <RelatedPosts posts={relatedPosts} />
        </div>
      )}
      <BlogPostStructuredData 
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        author={post.author}
        url={`${process.env.NODE_ENV === 'production' 
          ? 'https://abstractalgorithms.github.io' 
          : 'http://localhost:3000'}/posts/${post.slug}`}
        image={post.coverImage ? 
          `${process.env.NODE_ENV === 'production' 
            ? 'https://abstractalgorithms.github.io' 
            : 'http://localhost:3000'}${post.coverImage}` 
          : undefined}
      />
    </article>
  )
}
