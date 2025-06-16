export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Abstract Algorithms",
    "description": "A comprehensive blog about algorithms, data structures, system design, and software engineering best practices",
    "url": process.env.NODE_ENV === 'production' 
      ? "https://abstractalgorithms.github.io" 
      : "http://localhost:3000",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": process.env.NODE_ENV === 'production' 
          ? "https://abstractalgorithms.github.io/posts/{search_term_string}" 
          : "http://localhost:3000/posts/{search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Abstract Algorithms",
      "url": process.env.NODE_ENV === 'production' 
        ? "https://abstractalgorithms.github.io" 
        : "http://localhost:3000"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
