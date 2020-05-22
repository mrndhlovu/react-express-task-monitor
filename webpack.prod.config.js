const HtmlWebPackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const shared = require("./webpack.shared");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(shared, {
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/assets/static-assets/template.html",
      filename: "./index.html",
      favicon: "./src/assets/static-assets/favicon.ico",
    }),
  ],
});
