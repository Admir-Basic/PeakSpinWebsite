import type { NextConfig } from 'next';

/**
 * Statična stranica (`next build` → out/): može na bilo koji hosting (Netlify, Vercel, Cloudflare Pages, nginx).
 * trailingSlash: /bs/privacy/ → out/bs/privacy/index.html, radi i na običnom statičnom serveru.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
