const mongoose = require("mongoose");

const BoardSchema = mongoose.Schema({
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
  },
  description: {
    type: String,
    required: true
  },
  cards: {
    type: Array,
    required: true,
    default: [Object]
  }
});

module.exports = mongoose.model("Board", BoardSchema);
