const mongoose = require("mongoose");

const CardSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    attachments: {
      type: Object,
      required: true,
      default: {
        images: [],
        documents: [],
        urls: [],
      },
    },
    archived: {
      type: Boolean,
      default: false,
      required: true,
    },
    cardCover: {
      type: String,
      default: "",
      required: true,
    },
    comments: {
      type: Array,
      default: [],
      required: true,
    },
    activities: {
      type: Array,
      default: [],
      required: true,
    },
    labels: {
      type: Array,
      default: [],
      required: true,
    },
    checklists: {
      type: Array,
      default: [],
      required: true,
    },
    shortDescription: {
      type: String,
      default: "",
      required: true,
    },
    description: {
      type: String,
      default: "",
      required: true,
    },
    assignees: {
      type: Array,
      default: [],
      required: true,
    },
    dueDate: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
