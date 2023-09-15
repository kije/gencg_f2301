const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  basePath: "/gencg_f2301",
  assetPrefix: isProd ? "/gencg_f2301/" : "",
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.task$/,
      use: "binary-loader",
    });
    return config;
  },
};

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  latex: true,
});

module.exports = withNextra(nextConfig);
