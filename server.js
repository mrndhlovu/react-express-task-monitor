const { CLIENT_URL } = require("./utils.js/config");
const { PORT } = require("./utils.js/config");
const { routesConfig } = require("./utils.js/middleware/routesMiddleware");
const { socketConfig } = require("./utils.js/middleware/socketIoMiddleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const http = require("http");
const log = require("./utils.js/console-alert");
const path = require("path");
require("./utils.js/mongooseDB");

const app = express();
const server = http.createServer(app);

socketConfig(server);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true
  })
);

app.use(express.static(path.join(__dirname, "client/build")));

routesConfig(app);

server.listen(PORT, () => log.success(`Server running on port ${PORT}`));
