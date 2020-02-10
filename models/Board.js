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
  category: {
    type: Array,
    required: true,
    default: ["default"]
  },
  lastViewed: {
    type: Date,
    default: null
  },
  styleProperties: {
    type: Object,
    default: { color: "#dce3eb" }
  },
  accessLevel: {
    type: Object,
    required: true,
    default: { private: true, public: false, team: false }
  }
});

module.exports = mongoose.model("Board", BoardSchema);
