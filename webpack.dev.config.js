const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const HtmlWebPackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");

const shared = require("./webpack.shared");
const webpack = require("webpack");

module.exports = merge(shared, {
  entry: {
    main: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "./client/index.js",
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./client/html/template.html",
      filename: "./index.html",
      excludeChunks: ["server"],
      favicon: "./client/html/favicon.ico",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleAnalyzerPlugin(),
  ],
});
