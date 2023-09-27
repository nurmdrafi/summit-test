module.exports = {
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: {
    dirs: ["."],
  },
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
