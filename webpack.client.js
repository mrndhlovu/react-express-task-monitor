const { environment } = require("./utils.js/config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const path = require("path");
const shared = require("./webpack.shared");

const dev = environment === "development";

module.exports = merge(shared, {
  entry: "./client/src/index.js",
  output: {
    filename: `${dev ? "client_bundle.js" : "client_bundle.[contentHash].js"}`,
    path: path.resolve(__dirname, "build/public"),
    publicPath: "/build/public/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./client/src/html/template.html",
    }),
  ],
});
