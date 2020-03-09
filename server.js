const { PORT } = require("./utils.js/config");
const { routesConfig } = require("./utils.js/middleware/routesMiddleware");
const { serverConfig } = require("./utils.js/middleware/serverMiddleware");
const express = require("express");
const log = require("./utils.js/console-alert");
require("./utils.js/mongooseDB");

const server = express();

serverConfig(server);
routesConfig(server);

server.listen(PORT, () => log.success(`Server running on port ${PORT}`));
