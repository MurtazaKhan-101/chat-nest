/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
      appDir: true,
      swcPlugins: [
        ["next-superjson-plugin", {}]
      ]
    },
    typescript: { ignoreBuildErrors: true },
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