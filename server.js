const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const log = require("./utils.js/console-alert");
const { CONNECTION_URI, LOCAL_MONGO_DB, PORT } = require("./utils.js/config");

const boardRoutes = require("./routes/board");
const uploadRoutes = require("./routes/awsUpload");

const app = express();

mongoose.connect(
  CONNECTION_URI || LOCAL_MONGO_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => log.success("Connected to local DB")
);

// Middleware
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

// Route Middleware
app.use("/boards", boardRoutes);
app.use("/upload", uploadRoutes);

app.listen(PORT, () => log.success(`Server running on port ${PORT}`));
