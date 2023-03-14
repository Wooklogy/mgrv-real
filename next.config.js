/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        child_process: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  env: {
    DEV_BACK_URL: "http://localhost:8080/",
    PROD_BACK_URL: "http://3.39.98.42:8080/",
  },
};

module.exports = nextConfig;
