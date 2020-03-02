const mongoose = require("mongoose");
const { CONNECTION_URI, LOCAL_MONGO_DB } = require("./config");
const log = require("./console-alert");

mongoose.connect(
  CONNECTION_URI || LOCAL_MONGO_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => log.success("Connected to local DB")
);