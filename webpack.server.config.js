const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { environment } = require("./src/server/utils/config");
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    server: ["./src/server/server.js"],
  },
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "[name].js",
    hotUpdateChunkFilename: ".hot/[id].[hash].hot-update.js",
    hotUpdateMainFilename: ".hot/[hash].hot-update.json",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
  ],
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  mode: environment,
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
