/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
      appDir: true,
      swcPlugins: [
        ["next-superjson-plugin", {}]
      ]
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    }
  };

module.exports = nextConfig;


