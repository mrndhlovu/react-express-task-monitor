const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const HtmlWebPackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");

const shared = require("./webpack.shared");
const webpack = require("webpack");

module.exports = merge(shared, {
  entry: {
    main: ["webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000"],
  },
  devServer: {
    port: 3000,
    contentBase: ["/build"],
    inline: true,
    hot: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/assets/static-assets/template.html",
      filename: "./index.html",
      excludeChunks: ["server"],
      favicon: "./src/assets/static-assets/favicon.ico",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // new BundleAnalyzerPlugin(),
  ],
});
