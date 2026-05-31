/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'pkg',
            value: 'express',
          },
        ],
        destination: '/contact?service=express-detail',
        permanent: false,
      },
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'pkg',
            value: 'full',
          },
        ],
        destination: '/contact?service=full-detail',
        permanent: false,
      },
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'pkg',
            value: 'interior',
          },
        ],
        destination: '/contact?service=interior-detail',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
