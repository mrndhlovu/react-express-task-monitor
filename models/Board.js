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
  },
  lastViewed: {
    type: Date,
    default: Date.now()
  },
  color: {
    type: String,
    default: "#dce3eb"
  },
  visibility: {
    type: Object,
    required: true,
    default: { private: true, public: false, team: false }
  }
});

module.exports = mongoose.model("Board", BoardSchema);
