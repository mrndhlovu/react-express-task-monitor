import config from "../../../../webpack.dev.config";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

const compiler = webpack(config);

const webpackInit = (app) => {
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
    })
  );

  app.use(webpackHotMiddleware(compiler));
};

export default webpackInit;
