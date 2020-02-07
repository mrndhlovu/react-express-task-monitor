const mongoose = require("mongoose");

const BoardListSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("BoardList", BoardListSchema);
