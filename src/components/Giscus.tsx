'use client'

import { useEffect, useRef } from 'react'

interface GiscusProps {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'issue-number' | 'issue-title'
  strict?: '0' | '1'
  reactionsEnabled?: '0' | '1'
  emitMetadata?: '0' | '1'
  inputPosition?: 'top' | 'bottom'
  theme?: 'light' | 'dark' | 'preferred_color_scheme' | 'transparent_dark' | 'dark_dimmed'
  lang?: string
  loading?: 'lazy' | 'eager'
}

export default function Giscus({
  repo,
  repoId,
  category,
  categoryId,
  mapping = 'pathname',
  strict = '0',
  reactionsEnabled = '1',
  emitMetadata = '0',
  inputPosition = 'bottom',
  theme = 'light',
  lang = 'en',
  loading = 'lazy'
}: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Clear any existing giscus
    ref.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', repo)
    script.setAttribute('data-repo-id', repoId)
    script.setAttribute('data-category', category)
    script.setAttribute('data-category-id', categoryId)
    script.setAttribute('data-mapping', mapping)
    script.setAttribute('data-strict', strict)
    script.setAttribute('data-reactions-enabled', reactionsEnabled)
    script.setAttribute('data-emit-metadata', emitMetadata)
    script.setAttribute('data-input-position', inputPosition)
    script.setAttribute('data-theme', theme)
    script.setAttribute('data-lang', lang)
    script.setAttribute('data-loading', loading)
    script.crossOrigin = 'anonymous'
    script.async = true

    ref.current.appendChild(script)

    return () => {
      if (ref.current) {
        ref.current.innerHTML = ''
      }
    }
  }, [repo, repoId, category, categoryId, mapping, strict, reactionsEnabled, emitMetadata, inputPosition, theme, lang, loading])

  return <div ref={ref} />
}
