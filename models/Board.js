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
    comments: {
      type: Array,
      required: true,
      default: []
    },
    activities: {
      type: Array,
      required: true,
      default: []
    },
    members: {
      type: Array,
      required: true,
      default: []
    },
    invitedBoards: {
      type: Array,
      required: true,
      default: []
    },
    labels: {
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

BoardSchema.methods.validateBoardMember = async function(userId) {
  const board = this;
  const isValidBoardMember = board.members.includes(userId);

  if (!isValidBoardMember)
    return res.status(400).send({ message: "Access to the board is denied!" });
  await board.populate("owner").execPopulate();
};

BoardSchema.methods.updateActivity = async function(user, action) {
  const board = this;
  const BOARD_ACTIVITIES = {
    cardHeader: "changed card header to",
    addNewCard: "added new card",
    addAttachment: "attached",
    addChecklist: "added Checklist to this card"
  };

  const getAction = action => {
    switch (action) {
      case "addNewCard":
        return `${user} ${BOARD_ACTIVITIES.addNewCard}: `;
      case "cardHeader":
        return `${user} ${BOARD_ACTIVITIES.cardHeader}: `;
      case "addAttachment":
        return `${user} ${BOARD_ACTIVITIES.addAttachment}: `;
      case "addChecklist":
        return `${user} ${BOARD_ACTIVITIES.addChecklist}: `;
      default:
        break;
    }
  };

  const userAction = { activity: getAction(action), createdAt: Date.now() };

  await board.activities.push(userAction);
};

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
