const router = require("express").Router();
const Board = require("../models/Board");

router.get("/list", async (req, res) => {
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

router.patch("/id/:boardId", async (req, res) => {
  const { title, cards, position, description } = req.body;

  try {
    const updatedBoard = await Board.updateOne(
      { _id: req.params.boardId },
      {
        $set: {
          title,
          cards,
          position,
          description
        }
      }
    );
    res.send(updatedBoard);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.post("/api/create", async (req, res) => {
  const { title, cards, position, description } = req.body;

  const board = new Board({
    title,
    cards,
    position,
    description
  });

  try {
    const savedBoard = await board.save();
    res.send(savedBoard);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
