const { environment } = require("./src/server/utils/config");
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const webpack = require("webpack");

const SERVER_PATH = "./src/server/server.js";

module.exports = () => {
  const webpack = require("webpack");
  const dotenv = require("dotenv");
  const env = dotenv.config().parsed,
    envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});

  return {
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
      new webpack.DefinePlugin(envKeys),
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
};
