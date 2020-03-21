const router = require("express").Router();
const Board = require("../models/Board");
const User = require("../models/User");
const auth = require("../utils.js/middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  const match = {};
  if (req.query.archived) match.archived = req.query.archived === "true";

  try {
    await req.user
      .populate({
        path: "boards",
        match
      })
      .execPopulate();
    const boards = req.user.boards;

    let invitedBoards = [];

    const userId = req.user._id;

    const getInvitedBoards = async () => {
      await Board.find({}).then(allBoards =>
        Object.keys(allBoards).map(index => {
          if (allBoards[index].members.includes(userId)) {
            invitedBoards.push(allBoards[index]);
            allBoards[index].populate("owner").execPopulate();
          }
        })
      );
    };

    await getInvitedBoards();

    const data = [...boards, ...invitedBoards];

    res.send(data);
  } catch (error) {
    res.status(400).send("Failed to retrieve user boards!");
  }
});

router.get("/id/:boardId", auth, async (req, res) => {
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
    await Board.deleteOne({ _id, owner: req.user._id });
    res.send({ message: "Board deleted" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.patch("/id/:boardId/invite", auth, async (req, res) => {
  const _id = req.params.boardId;
  const { email } = req.body;
  const DEFAULT_ACCESS_LEVELS = { private: false, public: false, team: false };
  try {
    const board = await Board.findOne({ _id, owner: req.user._id });
    const user = await User.findOne({ email });
    board.members.push(user._id);
    board.accessLevel = {
      ...board.accessLevel,
      ...DEFAULT_ACCESS_LEVELS,
      team: true
    };
    board.save();
    res.send({ message: "User invited and added to board members!" });
  } catch (error) {
    res.status(400).send({ message: "User email not found" });
  }
});

router.patch("/id/:boardId", auth, async (req, res) => {
  const _id = req.params.boardId;
  let board;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "lists",
    "category",
    "styleProperties",
    "accessLevel",
    "archived",
    "activities"
  ];
  const isValidField = updates.every(update => allowedUpdates.includes(update));

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

    updates.forEach(update => (board[update] = req.body[update]));
    board.save();
    res.send(board);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/create", auth, async (req, res) => {
  const board = new Board({
    ...req.body,
    owner: req.user._id
  });

  try {
    const savedBoard = await board.save();
    res.send(savedBoard);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
