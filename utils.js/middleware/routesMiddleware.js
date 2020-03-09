const boardRoutes = require("../../routes/board");
const cardRoutes = require("../../routes/cards");
const uploadRoutes = require("../../routes/awsUpload");
const authRoutes = require("../../routes/auth");

routesConfig = server => {
  server.use("/boards", boardRoutes);
  server.use("/cards", cardRoutes);
  server.use("/upload", uploadRoutes);
  server.use("/auth", authRoutes);
};

module.exports = { routesConfig };
