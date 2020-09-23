const express = require("express");
const passport = require("passport");
const http = require("http");

const { PORT } = require("./utils/config");
const log = require("./utils/console-alert");
const mongooseDBConfig = require("./utils/middleware/mongooseDBMiddleware");
const { routesConfig } = require("./utils/middleware/routesMiddleware");
const { socketIOConfig } = require("./utils/middleware/socketIoMiddleware");
const serverConfig = require("./utils/middleware/serverConfigMiddleware");
const passportConfig = require("./utils/middleware/socialAuthMiddleware");

mongooseDBConfig();
passportConfig(passport);

const app = express();
const server = http.createServer(app);

socketIOConfig(server);
serverConfig(app, passport);

routesConfig(app, express);
server.listen(PORT, () => log.success(`Server listening on port ${PORT}`));
process.on("exit", () => log.warning("Server shutdown."));
