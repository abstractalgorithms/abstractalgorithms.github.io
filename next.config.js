import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  
  // Performance optimizations
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Enhanced caching
  onDemandEntries: {
    // Extend keep alive for faster dev rebuilds
    maxInactiveAge: 60 * 1000 * 60, // 1 hour
    pagesBufferLength: 5,
  },
  
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
    // Enable modern features for better performance
    esmExternals: true,
    // Optimize package imports
    optimizePackageImports: ['lucide-react', 'date-fns'],
    // Note: swcFileReading and swcMinifyDebugger are no longer valid in Next.js 14
  },
  
  // Page extensions
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  
  // Webpack optimizations
  webpack: (config, { dev, isServer, webpack }) => {
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
      // Enhanced chunk splitting for better caching
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 250000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 20,
              reuseExistingChunk: true,
            },
            common: {
              minChunks: 2,
              chunks: 'all',
              name: 'common',
              priority: 5,
              reuseExistingChunk: true,
            },
            mdx: {
              test: /\.mdx?$/,
              name: 'mdx-content',
              chunks: 'all',
              priority: 15,
              reuseExistingChunk: true,
            },
          },
        },
        // Improve tree shaking
        usedExports: true,
        sideEffects: false,
      };
    }

    // Development optimizations
    if (dev) {
      // Faster rebuilds in development
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [import.meta.url]
        },
      };
      
      // Optimize resolve for faster builds
      config.resolve.modules = ['node_modules', path.resolve('./src')]
      
      // Reduce module resolution time
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve('./src'),
        '@/components': path.resolve('./src/components'),
        '@/lib': path.resolve('./src/lib'),
        '@/hooks': path.resolve('./src/hooks'),
      }
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
