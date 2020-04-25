const { environment } = require("./server/utils/config");
const path = require("path");

const devMode = environment === "development";

module.exports = {
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: devMode ? "[name].bundle.js" : "[name].[hash].bundle.js",
    chunkFilename: "[name].[chunkhash].chunk.js",
  },
  target: "web",
  mode: environment,
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "node_modules"),
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
};
