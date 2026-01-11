module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.mixkit.co',
        pathname: '/**',
      },
      // Add other domains as needed
      {
        protocol: 'https',
        hostname: '**.example.com', // For subdomains
        pathname: '/**',
      },
    ],
    // Optional: Adjust image quality
    formats: ['image/webp'],
    // Optional: Configure device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};