const express = require("express");
const path = require("path");
const cors = require("cors");

serverConfig = server => {
  server.use(express.json());
  server.use(cors());
  server.use(express.static(path.join(__dirname, "client/src/html")));
};

module.exports = { serverConfig };
