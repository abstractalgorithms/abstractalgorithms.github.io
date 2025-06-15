// Giscus configuration
// To get these values, visit https://giscus.app and follow the setup instructions

export const giscusConfig = {
  // Your GitHub repository (e.g., "abstractalgorithms/abstractalgorithms.github.io")
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO || '',
  
  // Repository ID (get from giscus.app)
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '',
  
  // Discussion category (e.g., "General", "Q&A", "Contact")
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'General',
  
  // Category ID (get from giscus.app)
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
  
  // Other settings
  mapping: 'pathname' as const,
  strict: '0' as const,
  reactionsEnabled: '1' as const,
  emitMetadata: '0' as const,
  inputPosition: 'bottom' as const,
  theme: 'light' as const,
  lang: 'en',
  loading: 'lazy' as const
}

// Validation function to check if Giscus is properly configured
export function isGiscusConfigured(): boolean {
  return !!(giscusConfig.repo && giscusConfig.repoId && giscusConfig.categoryId)
}
