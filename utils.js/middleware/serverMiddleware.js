const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { CLIENT_URL } = require("../config");

serverConfig = app => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: CLIENT_URL,
      credentials: true
    })
  );
  app.use(express.static(path.join(__dirname, "client/build/")));
  app.use((err, req, res, next) => res.json(err));
};

module.exports = { serverConfig };
