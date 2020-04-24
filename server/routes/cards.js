const router = require("express").Router();
const Board = require("../models/Board");
const Card = require("../models/Card");
const Comment = require("../models/Comment");
const CheckListItem = require("../models/CheckListItem");
const auth = require("../utils/middleware/authMiddleware").authMiddleware;

const updateBoardLists = (id, newLists) =>
  Board.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        lists: [...newLists],
        lastViewed: Date.now(),
      },
    }
  );

router.patch("/:boardId", auth, async (req, res) => {
  const _id = req.params.boardId;
  const { card, listId } = req.body;
  let board;
  try {
    board = await Board.findOne({ _id, owner: req.user._id });

    if (!board) {
      board = await Board.findOne({ _id });
      board.validateBoardMember(req.user._id);
    }

    const newCardPosition = board.lists[listId - 1].cards.length + 1;

    const newCard = new Card({
      ...card,
      position: newCardPosition,
    });
    board.lists[listId - 1].cards.push(newCard);

    board.updateActivity(req.user.fname, "addNewCard");

    await updateBoardLists(_id, board.lists);

    res.send(board);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.patch("/:boardId/list-item", auth, async (req, res) => {
  const _id = req.params.boardId;
  const { listItem, cardId, listId } = req.body;

  try {
    board = await Board.findOne({ _id, owner: req.user._id });

    if (!board) {
      board = await Board.findOne({ _id });
      board.validateBoardMember(req.user._id);
    }

    const newListItemPosition =
      board.lists[listId - 1].cards[cardId - 1].checklists.length + 1;

    const checkListItem = new CheckListItem({
      ...listItem,
      position: newListItemPosition,
    });

    board.lists[listId - 1].cards[cardId - 1].checklists.push(checkListItem);
    board.updateActivity(req.user.fname, "addChecklistItem");

    await updateBoardLists(_id, board.lists);

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
      position: index + 1,
    }));

    await updateBoardLists(boardId, board.lists);

    res.send(board);
  } catch (error) {
    res.status(400).send({ message: "Failed to delete card" });
  }
});

router.patch("/:boardId/update", auth, async (req, res) => {
  const { newCard, listId } = req.body;
  const { boardId } = req.params;

  try {
    const board = await Board.findById({ _id: boardId });

    const patchedList = board.lists.map((list) =>
      list.position === listId
        ? {
            ...list,
            cards: list.cards.map((card) =>
              card.position === newCard.position
                ? {
                    ...newCard,
                  }
                : { ...card }
            ),
          }
        : { ...list }
    );

    const newBoard = await updateBoardLists(boardId, patchedList);

    res.send(newBoard);
  } catch (error) {
    res.status(400).send({ message: "Failed to update card cover" });
  }
});

router.patch("/delete-attachment/:boardId", async (req, res) => {
  const { cardId, listId, deleteId } = req.body;
  const { boardId } = req.params;

  try {
    const board = await Board.findById({ _id: boardId });

    const patchedList = {
      ...board,
      lists: [
        ...board.lists.map((list) =>
          list.position === listId
            ? {
                ...list,
                cards: list.cards.map((card) =>
                  card.position === cardId
                    ? {
                        ...card,
                        attachments: {
                          ...card.attachments,
                          images: [
                            ...card.attachments.images.filter(
                              (image) =>
                                image.imgUrl.localeCompare(deleteId) !== 0
                            ),
                          ],
                        },
                      }
                    : { ...card }
                ),
              }
            : { ...list }
        ),
      ],
    };

    const newBoard = await updateBoardLists(boardId, patchedList.lists);

    res.send(newBoard);
  } catch (error) {
    res.status(400).send({ message: "Failed to delete attachment card" });
  }
});

router.patch("/:boardId/comment", auth, async (req, res) => {
  const _id = req.params.boardId;
  const { comment, cardId, listId } = req.body;

  try {
    board = await Board.findOne({ _id, owner: req.user._id });

    if (!board) {
      board = await Board.findOne({ _id });
      board.validateBoardMember(req.user._id);
    }

    const newComment = new Comment({
      comment,
      creator: req.user.fname,
    });

    newComment.save();

    board.lists[listId - 1].cards[cardId - 1].comments.push(newComment);
    board.updateActivity(req.user.fname, "addComment");

    await updateBoardLists(_id, board.lists);

    board.save();
    const card = board.lists[listId - 1].cards[cardId - 1];

    res.status(201).send(card);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
module.exports = router;
