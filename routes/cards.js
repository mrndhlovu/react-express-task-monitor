const router = require("express").Router();
const Board = require("../models/Board");
const Card = require("../models/Card");

const updateBoardLists = (id, newLists) =>
  Board.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        lists: [...newLists],
        lastViewed: Date.now()
      }
    }
  );

router.patch("/:boardId", async (req, res) => {
  const { boardId } = req.params;

  try {
    const { card, listId } = req.body;
    const board = await Board.findById(req.params.boardId);
    const newCardPosition = board.lists[listId - 1].cards.length + 1;

    const newCard = new Card({
      ...card,
      position: newCardPosition
    });
    board.lists[listId - 1].cards.push(newCard);

    await updateBoardLists(boardId, board.lists);

    res.send(board);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.patch("/delete/:boardId", async (req, res) => {
  const { cardId, listId } = req.body;
  const { boardId } = req.params;

  try {
    const board = await Board.findById({ _id: boardId });

    board.lists[listId - 1].cards.splice(cardId - 1, 1);

    board.lists[listId - 1].cards.map((card, index) => ({
      ...card,
      position: index + 1
    }));

    await updateBoardLists(boardId, board.lists);

    res.send(board);
  } catch (error) {
    res.status(400).send({ message: "Failed to delete card" });
  }
});

router.patch("/cover/:boardId", async (req, res) => {
  const { cardId, listId, cardCover } = req.body;
  const { boardId } = req.params;

  try {
    const board = await Board.findById({ _id: boardId });

    const patchedList = {
      ...board,
      lists: [
        ...board.lists.map(list =>
          list.position === listId
            ? {
                ...list,
                cards: list.cards.map(card =>
                  card.position === cardId
                    ? {
                        ...card,
                        cardCover
                      }
                    : { ...card }
                )
              }
            : { ...list }
        )
      ]
    };

    const newBoard = await updateBoardLists(boardId, patchedList.lists);

    res.send(newBoard);
  } catch (error) {
    res.status(400).send({ message: "Failed to update card cover" });
  }
});

module.exports = router;
