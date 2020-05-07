const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const shared = require("./webpack.shared");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(shared, {
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()],
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/assets/static-assets/template.html",
      filename: "./index.html",
      favicon: "./src/assets/static-assets/favicon.ico",
    }),
    new CleanWebpackPlugin(),
  ],
});
