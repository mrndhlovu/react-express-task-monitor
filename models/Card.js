const mongoose = require("mongoose");

const CardSchema = mongoose.Schema({
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
  detail: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Card", CardSchema);
