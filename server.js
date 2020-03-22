const { PORT } = require("./utils.js/config");
const { routesConfig } = require("./utils.js/middleware/routesMiddleware");
const { serverConfig } = require("./utils.js/middleware/serverMiddleware");
const { socketConfig } = require("./utils.js/middleware/socketIoMiddleware");
const express = require("express");
const path = require("path");
const log = require("./utils.js/console-alert");
const http = require("http");
require("./utils.js/mongooseDB");

const app = express();
const server = http.createServer(app);

serverConfig(app);
socketConfig(server);
routesConfig(app);
app.use(express.static("/client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

server.listen(PORT, () => log.success(`Server running on port ${PORT}`));
