const express = require("express");

const app = express();
const dotenv = require("dotenv");

const mongoose = require("mongoose");
const boardRoutes = require("./routes/board");

const cors = require("cors");

dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_LINK,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("We are on the Home page");
});

// Route Middleware
app.use("/boards", boardRoutes);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
