'use client'

import { useState, useEffect } from 'react'
import { Award, Star, Calendar, CheckCircle } from 'lucide-react'

interface Badge {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  earnedDate?: string
}

interface BadgeDisplayProps {
  badgeId: string
  inline?: boolean
}

const availableBadges: Record<string, Badge> = {
  'learning-terraform-completion': {
    id: 'learning-terraform-completion',
    name: 'Terraform Master',
    description: 'Completed the Learning Terraform series with 70% or higher on the final quiz',
    icon: <Award className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-600'
  },
  'database-indexes-guide-completion': {
    id: 'database-indexes-guide-completion',
    name: 'Database Expert',
    description: 'Completed the Database Indexes series with 70% or higher on the final quiz',
    icon: <Star className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-600'
  }
}

export function BadgeDisplay({ badgeId, inline = false }: BadgeDisplayProps) {
  const [isEarned, setIsEarned] = useState(false)
  const [earnedDate, setEarnedDate] = useState<string>('')

  useEffect(() => {
    const badges = JSON.parse(localStorage.getItem('earnedBadges') || '[]')
    const badgeInfo = JSON.parse(localStorage.getItem('badgeDetails') || '{}')
    
    if (badges.includes(badgeId)) {
      setIsEarned(true)
      setEarnedDate(badgeInfo[badgeId]?.earnedDate || new Date().toLocaleDateString())
    }
  }, [badgeId])

  const badge = availableBadges[badgeId]
  if (!badge) return null

  if (inline) {
    return isEarned ? (
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-semibold">
        <Award className="w-4 h-4" />
        <span>Badge Earned!</span>
      </div>
    ) : null
  }

  return (
    <div className={`
      relative p-6 rounded-xl border-2 transition-all duration-300
      ${isEarned 
        ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg' 
        : 'border-gray-200 bg-gray-50 opacity-60'
      }
    `}>
      {/* Badge Icon */}
      <div className={`
        w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto
        bg-gradient-to-r ${badge.color} text-white
        ${isEarned ? 'shadow-lg' : 'grayscale'}
      `}>
        {badge.icon}
      </div>

      {/* Badge Info */}
      <div className="text-center">
        <h3 className="font-bold text-gray-800 mb-2">{badge.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
        
        {isEarned ? (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-semibold">Earned {earnedDate}</span>
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            Complete the series to earn this badge
          </div>
        )}
      </div>

      {/* Earned Overlay */}
      {isEarned && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  )
}

export function BadgeCollection() {
  const [earnedBadges, setEarnedBadges] = useState<string[]>([])

  useEffect(() => {
    const badges = JSON.parse(localStorage.getItem('earnedBadges') || '[]')
    setEarnedBadges(badges)
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Learning Badges</h2>
        <p className="text-gray-600">
          Collect badges by completing learning series and passing quizzes
        </p>
        <div className="mt-4">
          <span className="text-3xl font-bold text-green-600">{earnedBadges.length}</span>
          <span className="text-gray-600 ml-2">/ {Object.keys(availableBadges).length} badges earned</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(availableBadges).map(badge => (
          <BadgeDisplay key={badge.id} badgeId={badge.id} />
        ))}
      </div>
    </div>
  )
}
