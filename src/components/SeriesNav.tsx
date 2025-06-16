import Link from 'next/link'

interface SeriesNavProps {
  seriesName: string
  currentOrder: number
  total: number
  prev: string | null
  next: string | null
}

export default function SeriesNav({ seriesName, currentOrder, total, prev, next }: SeriesNavProps) {
  return (
    <nav className="flex flex-col items-center my-8">
      <div className="text-sm text-gray-500 mb-2">{seriesName} (Part {currentOrder} of {total})</div>
      <div className="flex gap-4">
        {prev ? (
          <Link href={prev} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-gray-700 font-medium transition-colors">← Previous</Link>
        ) : (
          <span className="px-4 py-2 text-gray-400 bg-gray-50 rounded cursor-not-allowed">← Previous</span>
        )}
        <span className="px-4 py-2 text-green-700 font-semibold">Current</span>
        {next ? (
          <Link href={next} className="px-4 py-2 bg-green-100 rounded hover:bg-green-200 text-green-700 font-medium transition-colors">Next →</Link>
        ) : (
          <span className="px-4 py-2 text-gray-400 bg-gray-50 rounded cursor-not-allowed">Next →</span>
        )}
      </div>
    </nav>
  )
}
