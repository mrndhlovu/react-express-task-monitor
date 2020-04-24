const boardRoutes = require("../../routes/board");
const cardRoutes = require("../../routes/cards");
const uploadRoutes = require("../../routes/awsUpload");
const authRoutes = require("../../routes/auth");

const routesConfig = (app) => {
  app.use("/boards", boardRoutes);
  app.use("/cards", cardRoutes);
  app.use("/upload", uploadRoutes);
  app.use("/auth", authRoutes);
};

module.exports = { routesConfig };
