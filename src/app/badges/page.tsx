import { BadgeCollection } from '../../components/BadgeSystem'

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16">
        <BadgeCollection />
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Learning Badges - Abstract Algorithms',
  description: 'View your earned learning badges and track your progress through our series',
}
