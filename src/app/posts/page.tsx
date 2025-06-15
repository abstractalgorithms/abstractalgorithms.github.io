import { getPosts } from '../../lib/posts'
import PostsPageClient from './PostsPageClient'

export const metadata = {
  title: 'All Posts - Abstract Algorithms',
  description: 'Browse all articles about algorithms, data structures, and software engineering concepts.',
}

export default async function AllPostsPage() {
  const posts = await getPosts()

  return <PostsPageClient posts={posts} />
}
