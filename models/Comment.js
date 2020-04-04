const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: String,
    required: true
  },
  emojis: {
    type: Array,
    required: true,
    default: []
  },
  createdAt: {
    type: Number,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Number,
    required: true,
    default: Date.now
  }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
