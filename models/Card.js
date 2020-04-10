const mongoose = require("mongoose");

const CardSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: Number,
      default: null,
    },
    attachments: {
      type: Object,
      required: true,
      default: {
        images: [],
        documents: [],
      },
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
