/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/why-sosync',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
