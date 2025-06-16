# SEO and Sitemap Maintenance

## Overview
This project uses static sitemap generation compatible with GitHub Pages (`output: 'export'`).

## Files
- **Sitemap**: `public/sitemap.xml` (static file)
- **Robots**: `public/robots.txt` (static file) 
- **Generator**: `scripts/generate-sitemap.js` (maintenance script)

## How It Works

### Automatic Generation
The sitemap is automatically regenerated before each build:
```bash
npm run build  # Automatically runs generate:sitemap first
```

### Manual Generation
Update sitemap manually when adding new posts:
```bash
npm run generate:sitemap
```

### What Gets Included
- ✅ Home page (`/`)
- ✅ About page (`/about/`)
- ✅ All blog posts from `src/posts/*/metadata.ts`
- ✅ Proper priorities and change frequencies
- ✅ Last modified dates from post metadata

## Adding New Posts

When you add a new post with the standard structure:
```
src/posts/new-post-slug/
├── metadata.ts
└── content.mdx
```

The sitemap will automatically include it on the next build or manual generation.

## SEO Features Included

### Structured Data
- **Website Schema**: Added to every page
- **BlogPost Schema**: Added to all blog posts
- **Rich Snippets**: Enhanced search result appearance

### Meta Tags
- **Open Graph**: Social media link previews
- **Twitter Cards**: Optimized Twitter sharing
- **SEO Keywords**: Comprehensive keyword coverage
- **Author Information**: Proper attribution

### Search Engine Optimization
- **Static Sitemap**: Fast loading, GitHub Pages compatible
- **Robots.txt**: Proper crawl guidance
- **Priority Settings**: Important pages prioritized
- **Change Frequencies**: Optimized crawl scheduling

## Production URLs
- Sitemap: `https://abstractalgorithms.github.io/sitemap.xml`
- Robots: `https://abstractalgorithms.github.io/robots.txt`

## Notes
- Compatible with `output: 'export'` for static site generation
- No server-side functionality required
- Automatically maintained through build process
- GitHub Pages ready
