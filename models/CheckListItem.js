const mongoose = require("mongoose");

const CheckListItemSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: Number,
      default: null
    },
    status: {
      type: String,
      required: true,
      default: "todo",
      trim: true
    },
    name: {
      type: String,
      required: true,
      default: "Checklist",
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const CheckListItem = mongoose.model("CheckListItem", CheckListItemSchema);

module.exports = CheckListItem;
