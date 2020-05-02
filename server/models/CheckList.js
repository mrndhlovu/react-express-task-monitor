const mongoose = require("mongoose");

const CheckListSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: "todo",
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tasks: {
      type: Array,
      required: true,
      trim: true,
      default: [],
    },
    archived: {
      type: Boolean,
      required: true,
      default: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const CheckList = mongoose.model("CheckList", CheckListSchema);

module.exports = CheckList;
