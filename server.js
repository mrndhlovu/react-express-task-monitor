const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");

const mongoose = require("mongoose");
const CONNECTION_URI = process.env.MONGODB_URI;

const boardRoutes = require("./routes/board");

const cors = require("cors");

dotenv.config();

// Connect to DB
mongoose.connect(
  CONNECTION_URI || process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

// Middleware
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));
app.get("/", (req, res) => {
  res.send("We are on the Home page");
});

// Route Middleware
app.use("/boards", boardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
