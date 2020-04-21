const router = require("express").Router();
const Board = require("../models/Board");
const User = require("../models/User");
const auth = require("../utils.js/middleware/authMiddleware").authMiddleware;
const lastViewed = require("../utils.js/middleware/boardMiddleWare")
  .viewedRecentMiddleWare;

const {
  sendInvitationEmail,
} = require("../utils.js/middleware/emailMiddleware");
const { CLIENT_URL } = require("../utils.js/config");
const ObjectID = require("mongodb").ObjectID;

router.get("/", auth, async (req, res) => {
  const match = {};
  if (req.query.archived) match.archived = req.query.archived === "true";

  try {
    let boards = [];
    const userId = new ObjectID(req.user._id);

    const getBoards = async () => {
      const allBoards = await Board.find();

      Object.keys(allBoards).map((index) => {
        allBoards[index].members.map((member) => {
          const boardId = new ObjectID(member.id);
          boardId.equals(userId) &&
            boards.push(allBoards[index]) &&
            allBoards[index].populate("owner").execPopulate();
        });
      });
    };

    await getBoards();

    res.send(boards);
  } catch (error) {
    res.status(400).send("Failed to retrieve user boards!");
  }
});

router.get("/id/:boardId", auth, lastViewed, async (req, res) => {
  const _id = req.params.boardId;

  let board;
  try {
    board = await Board.findOne({ _id, owner: req.user._id });

    if (!board) {
      board = await Board.findOne({ _id });
      board.validateBoardMember(req.user._id);
    }

    await board.populate("owner").execPopulate();

    res.send(board);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/id/:boardId", auth, async (req, res) => {
  const _id = req.params.boardId;

  try {
    await Board.findById({ _id }).then((board) => {
      board.members.map((member) => {
        if (member.isAdmin) return board.delete();
        throw "Access level limited! Only admin can delete a board!";
      });
    });

    res.send({ message: "Board deleted" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.patch("/id/:boardId/invite", auth, async (req, res) => {
  const _id = req.params.boardId;
  const { email } = req.body;
  const redirectLink = `${CLIENT_URL}/#/boards/id/${_id}?via=invite`;

  const DEFAULT_ACCESS_LEVELS = { private: false, public: false, team: false };
  try {
    const board = await Board.findOne({ _id, owner: req.user._id });
    const invitedUser = await User.findOne({ email });

    const member = {
      id: invitedUser._id,
      isAdmin: false,
      fname: invitedUser.fname,
    };
    board.members.push(member);

    board.accessLevel = {
      ...board.accessLevel,
      ...DEFAULT_ACCESS_LEVELS,
      team: true,
    };
    sendInvitationEmail(email, req.user.fname, "admin", redirectLink);
    board.save();
    res.send({ message: "User invited and added to board members!" });
  } catch (error) {
    res.status(400).send({ message: "User with that email not found!" });
  }
});

router.patch("/id/:boardId", auth, async (req, res) => {
  const _id = req.params.boardId;
  console.log("_id: ", _id);
  let board;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "accessLevel",
    "activities",
    "archived",
    "category",
    "comments",
    "description",
    "labels",
    "lists",
    "styleProperties",
    "title",
  ];
  const isValidField = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidField)
    return res.status(400).send({ message: "Invalid update field" });
  try {
    board = await Board.findOne({ _id, owner: req.user._id });

    if (!board) {
      try {
        board = await Board.findOne({ _id });
        board.validateBoardMember(req.user._id);
      } catch (error) {
        return res.status(400).send({ message: error.message });
      }
    }

    updates.forEach((update) => (board[update] = req.body[update]));
    board.save();
    res.send(board);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/create", auth, async (req, res) => {
  const board = new Board({
    ...req.body,
    owner: req.user._id,
  });
  const member = {
    id: `${req.user._id}`,
    isAdmin: true,
    fname: req.user.fname,
  };
  board.members.push(member);

  try {
    const savedBoard = await board.save();
    res.send(savedBoard);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
