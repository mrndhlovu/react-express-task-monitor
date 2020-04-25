const { environment } = require("./server/utils/config");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

const devMode = environment === "development";

module.exports = {
  entry: {
    server: "./server/server.js",
  },
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "[name].js",
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
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
