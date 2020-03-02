const router = require("express").Router();
const Board = require("../models/Board");
const Card = require("../models/Card");

router.patch("/:boardId", async (req, res) => {
  try {
    const { card, listId } = req.body;
    const board = await Board.findById(req.params.boardId);
    const newCardPosition = board.lists[listId - 1].cards.length + 1;

    const newCard = new Card({
      ...card,
      position: newCardPosition
    });
    board.lists[listId - 1].cards.push(newCard);

    await Board.findByIdAndUpdate(
      { _id: req.params.boardId },
      {
        $set: {
          lists: [...board.lists]
        }
      }
    );

    res.send(board);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.patch("/delete/:boardId", async (req, res) => {
  const { cardId, listId } = req.body;

  try {
    const board = await Board.findById({ _id: req.params.boardId });

    board.lists[listId - 1].cards.splice(cardId - 1, 1);

    board.lists[listId - 1].cards.map((card, index) => ({
      ...card,
      position: index + 1
    }));

    await Board.findByIdAndUpdate(
      { _id: req.params.boardId },
      {
        $set: {
          lists: [...board.lists],
          lastViewed: Date.now()
        }
      }
    );
    res.send(board);
  } catch (error) {
    res.status(400).send({ message: "Failed to delete" });
  }
});

module.exports = router;
