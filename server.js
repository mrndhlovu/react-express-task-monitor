const express = require("express");
const passport = require("passport");
const http = require("http");

const { PORT } = require("./server/utils/config");
const log = require("./server/utils/console-alert");
const mongooseDBConfig = require("./server/utils/middleware/mongooseDBMiddleware");
const { routesConfig } = require("./server/utils/middleware/routesMiddleware");
const {
  socketIOConfig,
} = require("./server/utils/middleware/socketIoMiddleware");
const serverConfig = require("./server/utils/middleware/serverConfigMiddleware");
const passportConfig = require("./server/utils/middleware/socialAuthMiddleware");

mongooseDBConfig();
passportConfig(passport);

const app = express();
const server = http.createServer(app);

socketIOConfig(server);
serverConfig(app, express, passport);

routesConfig(app, express);
server.listen(PORT, () => log.success(`Server listening on port ${PORT}`));
process.on("exit", () => log.warning("Server shutdown."));
