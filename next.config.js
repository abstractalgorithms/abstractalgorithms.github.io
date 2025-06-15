import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Add basePath and assetPrefix for GitHub Pages (only in production)
  basePath: process.env.NODE_ENV === 'production' ? '/abstractalgorithms.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/abstractalgorithms.github.io/' : '',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
    return config;
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
