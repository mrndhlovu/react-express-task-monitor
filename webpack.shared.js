const { environment } = require("./server/utils/config");
const path = require("path");

const devMode = environment === "development";

module.exports = {
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: devMode ? "[name].js" : "[name].[hash].js",
  },
  target: "web",
  devtool: "source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.jpg$/,
        use: [{ loader: "url-loader" }],
      },
    ],
  },
};
