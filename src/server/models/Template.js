const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    lists: {
      type: Array,
      required: true,
      default: [Object],
    },
    category: {
      type: String,
      required: true,
      default: "",
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    archived: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Template = mongoose.model("Template", TemplateSchema);

module.exports = Template;
