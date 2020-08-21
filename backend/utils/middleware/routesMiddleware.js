const boardRoutes = require("../../routes/board");
const cardRoutes = require("../../routes/cards");
const uploadRoutes = require("../../routes/awsUpload");
const authRoutes = require("../../routes/auth");

const BUILD_DIR = path.join(__dirname, "../../frontend/build");

const routesConfig = (app) => {
  app.use(express.json());
  app.use("/boards", boardRoutes);
  app.use("/cards", cardRoutes);
  app.use("/upload", uploadRoutes);
  app.use("/auth", authRoutes);

  app.use(express.static(BUILD_DIR));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(BUILD_DIR, "index.html"));
  });
};

module.exports = { routesConfig };
