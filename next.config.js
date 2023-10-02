module.exports = {
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: {
    dirs: ["."],
  },
  distDir: "out",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.kml$/,
      use: [
        {
          loader: "file-loader",
        },
      ],
    });

    return config;
  },
};
