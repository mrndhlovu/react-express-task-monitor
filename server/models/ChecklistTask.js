const mongoose = require("mongoose");

const ChecklistTaskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      default: "doing",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ChecklistTask = mongoose.model("ChecklistTask", ChecklistTaskSchema);

module.exports = ChecklistTask;
