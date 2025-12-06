/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    // ⚠️ Warning: This allows production builds to complete even with ESLint errors.
    ignoreDuringBuilds: true,
  },
   images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
