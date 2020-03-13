const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { CLIENT_URL } = require("../config");

serverConfig = server => {
  server.use(express.json());
  server.use(cookieParser());
  server.use(
    cors({
      origin: CLIENT_URL,
      credentials: true
    })
  );
  server.use(express.static(path.join(__dirname, "client/build")));
  server.use((err, req, res, next) => res.json(err));
};

module.exports = { serverConfig };
