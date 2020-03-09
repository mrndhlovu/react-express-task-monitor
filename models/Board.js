const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
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
    category: {
      type: Array,
      required: true,
      default: ["default"]
    },
    styleProperties: {
      type: Object,
      default: { color: "#828c90" }
    },
    accessLevel: {
      type: Object,
      required: true,
      default: { private: true, public: false, team: false }
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    archived: {
      type: Object,
      required: true,
      default: false
    },
    activities: {
      type: Array,
      required: true,
      default: []
    }
  },
  {
    timestamps: true
  }
);

BoardSchema.pre("save", async function(next) {
  const board = this;
  board.updatedAt = Date.now();
  next();
});

BoardSchema.methods.updateActivity = async function(updated, user, actions) {
  const board = this;
  if (updated) {
    const getAction = action => {
      switch (action) {
        case "newBoard":
          return `${user} created a new board: ${board.title}`;
        case "title":
          return `${user} changed the board title to '${board.title}'`;
        case "lists":
          return `${user} updated the board lists '${board.title}'`;
        default:
          break;
      }
    };

    actions.forEach(action => board.activities.push(getAction(action)));
  }
};

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
