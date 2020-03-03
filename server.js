const { PORT } = require("./utils.js/config");
const cors = require("cors");
const express = require("express");
const log = require("./utils.js/console-alert");
const path = require("path");
require("./utils.js/mongooseDB");

const boardRoutes = require("./routes/board");
const cardRoutes = require("./routes/cards");
const uploadRoutes = require("./routes/awsUpload");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

// Route Middleware
app.use("/boards", boardRoutes);
app.use("/cards", cardRoutes);
app.use("/upload", uploadRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => log.success(`Server running on port ${PORT}`));
