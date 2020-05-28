const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { isDevelopment, environment } = require("./src/server/utils/config");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: ["./src/client/index.js", "./src/assets/scss/style.scss"],
  },
  output: {
    path: path.join(__dirname, "./build"),
    publicPath: "/",
    filename: isDevelopment ? "[name].bundle.js" : "[name].[hash].bundle.js",
    hotUpdateChunkFilename: ".hot/[id].[hash].hot-update.js",
    hotUpdateMainFilename: ".hot/[hash].hot-update.json",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
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
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
    }),
    new CleanWebpackPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new webpack.DefinePlugin({
      __isBrowser__: "true",
    }),
  ],
};
