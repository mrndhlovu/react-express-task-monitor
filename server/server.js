import "./utils/mongooseDB";
import "@babel/polyfill";
import config from "../webpack.dev.config.js";
import cors from "cors";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

import { ROOT_URL, PORT } from "./utils/config";
import { routesConfig } from "./utils/middleware/routesMiddleware";
import { socketConfig } from "./utils/middleware/socketIoMiddleware";
import cookieParser from "cookie-parser";
import express from "express";
import http from "http";
import log from "./utils/console-alert";
import path from "path";

const app = express();
const server = http.createServer(app);
const compiler = webpack(config);
const BUILD_DIR = __dirname;

socketConfig(server);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ROOT_URL,
    credentials: true,
  })
);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.use(webpackHotMiddleware(compiler));

app.use(express.static(path.join(BUILD_DIR, "build")));

routesConfig(app);

server.listen(PORT, () => log.success(`Server running on port ${PORT}`));

process.on("exit", () => log.warning("Server shutdown."));
