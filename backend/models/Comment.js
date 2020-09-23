const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      type: String,
      required: true,
    },
    emojis: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
