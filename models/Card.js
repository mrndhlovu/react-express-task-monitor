const mongoose = require("mongoose");

const CardSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: Number,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
    required: true
  },
  attachments: {
    type: Object,
    required: true,
    default: {
      images: [],
      documents: []
    }
  },
  cardCover: {
    type: String,
    default: "",
    required: true
  },
  comments: {
    type: Array,
    default: [],
    required: true
  },
  activities: {
    type: Array,
    default: [],
    required: true
  },
  labels: {
    type: Array,
    default: [],
    required: true
  },
  checklist: {
    type: Array,
    default: [],
    required: true
  }
});

module.exports = mongoose.model("Card", CardSchema);
