const { environment } = require("./utils.js/config");
const merge = require("webpack-merge");
const path = require("path");
const shared = require("./webpack.shared");

const dev = environment === "development";

module.exports = merge(shared, {
  entry: "./server.js",
  output: {
    filename: `${dev ? "server_bundle.js" : "server_bundle.[contentHash].js"}`,
    path: path.resolve(__dirname, "build"),
    publicPath: "/build",
  },
});
