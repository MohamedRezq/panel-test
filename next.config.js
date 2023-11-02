/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["todoorstep.s3.amazonaws.com", "images.todoorstep.com"],
  },
  env: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
    __NEXT_PRIVATE_PREBUNDLED_REACT:
      process.env.__NEXT_PRIVATE_PREBUNDLED_REACT,
  },
};

module.exports = nextConfig;
