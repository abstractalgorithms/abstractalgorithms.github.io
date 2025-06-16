# Deployment Workflow

## Overview
The Abstract Algorithms blog is now fully configured for automated deployment to GitHub Pages with proper sitemap generation.

## Deployment Process

### Automated Sitemap Generation
- **Sitemap Script**: `scripts/generate-sitemap.js` automatically generates `public/sitemap.xml` from post metadata
- **Prebuild Hook**: `package.json` includes a `prebuild` script that runs `generate:sitemap` before every build
- **CI Integration**: `.github/workflows/deploy.yml` now uses `npm run build` instead of `next build`, ensuring the prebuild hook runs

### Workflow Steps
1. **Code Push**: Developer pushes to `main` branch
2. **CI Trigger**: GitHub Actions workflow starts
3. **Dependencies**: Install npm dependencies
4. **Prebuild**: Automatically runs `npm run generate:sitemap` to update sitemap
5. **Build**: Next.js builds the static site with the fresh sitemap
6. **Deploy**: Static files (including sitemap) are deployed to GitHub Pages

### Key Files
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow
- `scripts/generate-sitemap.js` - Sitemap generation script
- `public/sitemap.xml` - Generated sitemap (auto-updated)
- `public/robots.txt` - Static robots file

### SEO Features
- **Sitemap**: Automatically updated with all blog posts
- **Robots.txt**: Properly configured for search engines
- **Structured Data**: JSON-LD markup for blog posts
- **Meta Tags**: Complete OpenGraph and Twitter Card support

## Manual Commands

### Generate Sitemap
```bash
npm run generate:sitemap
```

### Build with Sitemap
```bash
npm run build  # Includes prebuild step
```

### Development
```bash
npm run dev
```

## Verification
- ✅ Sitemap accessible at `/sitemap.xml`
- ✅ Robots.txt accessible at `/robots.txt`
- ✅ Automated sitemap generation on build
- ✅ SEO-optimized with structured data
- ✅ GitHub Pages deployment ready

## Production URLs
- **Site**: https://abstractalgorithms.github.io
- **Sitemap**: https://abstractalgorithms.github.io/sitemap.xml
- **Robots**: https://abstractalgorithms.github.io/robots.txt

## MDX Components Configuration

### Available Components in MDX
The blog uses custom React components within MDX files. These components are configured in `mdx-components.tsx`:

- **SeriesNav**: Navigation component for blog post series
- **GiscusComments**: Comment system integration

### Adding New MDX Components
To add new components for use in MDX files:

1. Create the component in `src/components/`
2. Import and export it in `mdx-components.tsx`
3. Use it directly in any `.mdx` content file

Example:
```tsx
// In mdx-components.tsx
import NewComponent from './src/components/NewComponent'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    SeriesNav,
    GiscusComments,
    NewComponent,  // Add new component here
    ...components,
  }
}
```
