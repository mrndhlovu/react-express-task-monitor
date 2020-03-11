const router = require("express").Router();
const Board = require("../models/Board");
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
    res.send(req.user.boards);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/id/:boardId", auth, async (req, res) => {
  const _id = req.params.boardId;
  try {
    const board = await Board.findOne({ _id, owner: req.user._id });
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

router.patch("/id/:boardId", auth, async (req, res) => {
  const _id = req.params.boardId;

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
    const board = await Board.findOne({ _id, owner: req.user._id });
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
