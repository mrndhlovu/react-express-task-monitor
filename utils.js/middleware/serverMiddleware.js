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
<<<<<<< HEAD
  app.use(express.static(path.join(__dirname, "client/build/")));
  app.use((err, req, res, next) => res.json(err));
=======
  server.use((err, req, res, next) => res.json(err));
  server.use(express.static(path.join(__dirname, "client/build/")));
>>>>>>> eac03e30b4d8a700a9402bf866ec8b0c642fe7dd
};

module.exports = { serverConfig };
