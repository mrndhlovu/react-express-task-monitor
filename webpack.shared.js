const { environment } = require("./utils.js/config");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  mode: environment,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: [/\/node_modules\//],
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },
  externals: [webpackNodeExternals()],
};
