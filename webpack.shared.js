const { environment } = require("./server/utils/config");
const path = require("path");

module.exports = {
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "[name].js",
  },
  target: "web",
  devtool: "source-map",
  mode: environment,
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
