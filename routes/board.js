const router = require("express").Router();
const Board = require("../models/Board");

router.get("/", async (req, res) => {
  try {
    const boards = await Board.find();
    res.send(boards);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.get("/id/:boardId", async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);

    const now = new Date();
    const lastViewed = new Date(board.lastViewed);
    const created = new Date(board.date);
    const minutesAgo = 5;
    const msPerMinute = 60 * 1000;
    const elapsed = now - created;
    const justCreated = elapsed / msPerMinute < minutesAgo;

    const viewedRecently = (lastViewed - created) / msPerMinute < 20;

    const updateSection =
      (board.section.includes("default") ||
        !board.section.includes("starred")) &&
      !justCreated;

    if (updateSection) board.section.push("recent");
    if (!viewedRecently && board.section.includes("recent"))
      board.section.splice(board.section.indexOf("recent"), 1);

    res.send(board);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.delete("/id/:boardId", async (req, res) => {
  try {
    await Board.deleteOne({ _id: req.params.boardId });
    res.send({ message: "Board deleted" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.patch("/id/:boardId/update", async (req, res) => {
  const { title, lists, section } = req.body;
  const now = new Date();
  try {
    const updatedBoard = await Board.updateOne(
      { _id: req.params.boardId },
      {
        $set: {
          title,
          lists,
          section,
          lastViewed: now
        }
      }
    );
    res.send(updatedBoard);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.post("/api/create", async (req, res) => {
  const { title, lists } = req.body;

  const board = new Board({
    title,
    lists
  });

  try {
    const savedBoard = await board.save();
    res.send(savedBoard);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
