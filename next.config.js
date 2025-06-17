import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  
  // Performance optimizations
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Image optimization
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression and caching
  compress: true,
  
  // Bundle analysis
  env: {
    ANALYZE: process.env.ANALYZE,
  },
  
  // Bundle analysis and optimization
  experimental: {
    // optimizeCss: true, // Disabled - causes critters module error in static export
    scrollRestoration: true,
    // Enable modern features
    esmExternals: true,
  },
  
  // Page extensions
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Bundle analyzer
    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      )
    }
    
    // Fallback for Node.js modules
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
    
    // Production optimizations
    if (!dev && !isServer) {
      // Split chunks for better caching
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              minChunks: 2,
              chunks: 'all',
              name: 'common',
              priority: 5,
            },
          },
        },
      };
    }
    
    return config;
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
