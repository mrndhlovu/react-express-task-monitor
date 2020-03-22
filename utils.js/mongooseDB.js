const mongoose = require("mongoose");
const { CONNECTION_URI, LOCAL_MONGO_DB } = require("./config");
const log = require("./console-alert");

mongoose
  .connect(CONNECTION_URI || LOCAL_MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => log.success("Connected to DB"))
  .catch(err => log.warning(err, "Error connecting to DB"));
