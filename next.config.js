// const path = require('path')

module.exports = {
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: {
    dirs: ["."],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.kml$/,
      // use: path.resolve(__dirname, 'kml-loader.js')
      use: [
        {
          loader: "file-loader",
        },
      ],
    });

    return config;
  },
};
