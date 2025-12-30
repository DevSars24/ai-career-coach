/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This tells Next.js exactly where your project root is
    outputFileTracingRoot: __dirname, 
  },
  // If using Turbopack locally
  transpilePackages: ['@clerk/nextjs'],
};

export default nextConfig;