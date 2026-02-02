/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
    turbo: {
      resolveAlias: {
        "@prisma/client": "@prisma/client/default.js",
      },
    },
  },
};

export default nextConfig;
