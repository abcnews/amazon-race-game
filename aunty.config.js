const path = require("path");

module.exports = {
  type: "react",
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback.events = require.resolve("events/");

    return config;
  },
  devServer: {
    publicPath: "/",
    contentBase: path.resolve(__dirname, "dist"),
    https: false,
  },
  serve: {
    hot: false,
  },
};
