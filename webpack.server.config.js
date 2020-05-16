const { environment, isDevelopment } = require("./src/server/utils/config");
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const webpack = require("webpack");

const SERVER_PATH = isDevelopment
  ? "./src/server/server.dev.js"
  : "./src/server/server.prod.js";

module.exports = {
  entry: {
    server: [SERVER_PATH],
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
