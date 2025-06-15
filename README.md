# Abstract Algorithms Blog

A modern, Medium-style blogging platform built with Next.js 14, featuring static site generation and GitHub Pages deployment.

## Features

- 🎨 **Modern Design**: Clean, Medium-inspired interface with beautiful typography
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🚀 **Fast Performance**: Static site generation with Next.js for optimal performance
- 📝 **MDX Support**: Write posts in MDX with full markdown and React component support
- 🏷️ **Tagging System**: Organize content with tags and categories
- 🔍 **SEO Optimized**: Built-in meta tags, Open Graph, and structured data
- 📊 **Reading Time**: Automatic reading time estimation for posts
- 🎯 **GitHub Pages**: Easy deployment with GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/abstractalgorithms.github.io.git
cd abstractalgorithms.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Writing Posts

Posts are written in MDX format and stored in the `public/posts/` directory. Each post should be in its own folder with an `index.mdx` file.

### Post Structure

```
public/posts/
├── my-post-slug/
│   ├── index.mdx
│   └── assets/
│       └── image.png
```

### Post Frontmatter

Each post must include frontmatter with the following fields:

```yaml
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description of your post"
author: "Your Name"
tags: ["tag1", "tag2", "tag3"]
coverImage: "/posts/my-post-slug/assets/cover.jpg" # optional
---
```

### Example Post

```mdx
---
title: "Understanding Binary Search Trees"
date: "2024-01-15"
excerpt: "A comprehensive guide to Binary Search Trees and their applications"
author: "Alex Thompson"
tags: ["data-structures", "algorithms", "trees"]
coverImage: "/posts/bst-guide/assets/cover.png"
---

# Understanding Binary Search Trees

Binary Search Trees are fundamental data structures...

## Key Properties

1. Left subtree values are less than the root
2. Right subtree values are greater than the root
3. Both subtrees are also BSTs

```javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
```
```

## Deployment

The site is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic GitHub Pages Setup

1. **Repository Settings**:
   - Go to your repository Settings → Pages
   - Under "Source", select **"GitHub Actions"**
   - The workflow will automatically deploy when you push to the main branch

2. **First Deployment**:
   ```bash
   git add .
   git commit -m "Initial blog setup"
   git push origin main
   ```

3. **The GitHub Action will**:
   - Install dependencies
   - Build the Next.js project with static export
   - Deploy to GitHub Pages
   - Your site will be available at `https://yourusername.github.io/repositoryname`

### Manual Deployment

If you prefer manual deployment:

```bash
npm run build
# The 'out' directory contains the static files ready for deployment
```

### Environment Variables

If you need environment variables for production:

1. Go to repository Settings → Secrets and variables → Actions
2. Add any required environment variables
3. Reference them in the GitHub Actions workflow if needed

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom Medium-style components
- **Content**: MDX for blog posts
- **Typography**: Inter font with Tailwind Typography
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with GitHub Actions

## Project Structure

```
├── public/
│   ├── posts/           # Blog posts in MDX format
│   └── assets/          # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   ├── lib/             # Utility functions and data fetching
│   └── styles/          # Global styles
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Customization

### Styling

The design uses Tailwind CSS with custom components. Key styling files:

- `src/app/globals.css` - Global styles and custom CSS classes
- `tailwind.config.js` - Tailwind configuration and custom theme
- Individual components use Tailwind utility classes

### Content

- Modify `src/components/Hero.tsx` for the homepage hero section
- Update `src/components/Header.tsx` and `src/components/Footer.tsx` for navigation
- Customize metadata in `src/app/layout.tsx`

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For questions or support, please open an issue on GitHub.
