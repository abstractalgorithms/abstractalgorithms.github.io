import ContentCreatorClient from './ContentCreatorClient'

export const metadata = {
  title: 'Content Creator | Abstract Algorithms',
  description: 'Create new blog posts and learning series with our comprehensive content creation tool.',
  robots: 'noindex, nofollow' // Prevent indexing of the content creator
}

export default function ContentCreatorPage() {
  return <ContentCreatorClient />
}
