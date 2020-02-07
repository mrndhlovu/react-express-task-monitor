const mongoose = require("mongoose");

const BoardSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  lists: {
    type: Array,
    required: true,
    default: [Object]
  },
  section: {
    type: Array,
    required: true,
    default: ["default"]
  }
});

module.exports = mongoose.model("Board", BoardSchema);
