const { PORT } = require("./utils.js/config");
const { routesConfig } = require("./utils.js/middleware/routesMiddleware");
const { serverConfig } = require("./utils.js/middleware/serverMiddleware");
const { socketConfig } = require("./utils.js/middleware/socketIoMiddleware");
const express = require("express");
const log = require("./utils.js/console-alert");
const http = require("http");
require("./utils.js/mongooseDB");

const app = express();
const server = http.createServer(app);

serverConfig(app);
socketConfig(server);
routesConfig(app);

server.listen(PORT, () => log.success(`Server running on port ${PORT}`));
