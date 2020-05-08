const equals = require("validator/lib/equals");
const auth = require("../utils/middleware/authMiddleware").authMiddleware;
const Board = require("../models/Board");
const Card = require("../models/Card");
const CheckList = require("../models/CheckList");
const ChecklistTask = require("../models/ChecklistTask");
const Comment = require("../models/Comment");
const ObjectID = require("mongodb").ObjectID;
const router = require("express").Router();

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

const getSourceList = (lists, id) => {
  const listId = new ObjectID(id);
  const sourceList = lists.filter((list) => listId.equals(list._id));
  return sourceList[0];
};

router.patch("/:boardId/new-card", auth, async (req, res) => {
  const _id = req.params.boardId;
  const { card, listId } = req.body;
  let board;
  try {
    board = await Board.findOne({ _id, owner: req.user._id });

    if (!board) {
      board = await Board.findOne({ _id });
      board.validateBoardMember(req.user._id);
    }

    const newCard = new Card({ ...card });
    const sourceList = getSourceList(board.lists, listId);
    sourceList.cards.push(newCard);

    board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

    board.updateActivity(req.user.fname, "addNewCard");

    await updateBoardLists(_id, board.lists);

    res.send(board);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.patch("/:boardId/create-checklist", auth, async (req, res) => {
  const _id = req.params.boardId;
  const { checklist, cardId, listId } = req.body;
  let board;
  try {
    board = await Board.findOne({ _id, owner: req.user._id });

    if (!board) {
      board = await Board.findOne({ _id });
      board.validateBoardMember(req.user._id);
    }

    const checkListItem = new CheckList({ ...checklist });

    const sourceList = getSourceList(board.lists, listId);
    const sourceCard = getSourceList(sourceList.cards, cardId);

    sourceCard.checklists.push(checkListItem);

    sourceList.cards.splice(
      sourceList.cards.indexOf(sourceCard),
      1,
      sourceCard
    );

    board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

    board.updateActivity(req.user.fname, "addChecklistItem");
    await updateBoardLists(_id, board.lists);

    res.send(board);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/:boardId/checklist-task", auth, async (req, res) => {
  const { task } = req.body;

  try {
    const taskItem = new ChecklistTask({ ...task });

    res.status(203).send(taskItem);
  } catch (error) {
    res.status(400).send({ message: "Failed to create checklist task!" });
  }
});

router.patch("/:boardId/update-card", auth, async (req, res) => {
  const { newCard, listId } = req.body;
  const { boardId } = req.params;

  try {
    const board = await Board.findById({ _id: boardId });

    const sourceList = getSourceList(board.lists, listId);
    const sourceCard = getSourceList(sourceList.cards, newCard._id);

    sourceList.cards.splice(sourceList.cards.indexOf(sourceCard), 1, newCard);
    board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

    const newBoard = await updateBoardLists(boardId, board.lists);

    res.send(newBoard);
  } catch (error) {
    res.status(400).send({ message: "Failed to update card" });
  }
});

router.patch("/:boardId/delete-attachment", async (req, res) => {
  const { cardId, listId, deleteId } = req.body;
  const { boardId } = req.params;

  try {
    const board = await Board.findById({ _id: boardId });
    const sourceList = getSourceList(board.lists, listId);
    let sourceCard = getSourceList(sourceList.cards, cardId);

    sourceCard.attachments.images.map((image, index) =>
      equals(image.imgUrl, deleteId)
        ? sourceCard.attachments.images.splice(index, 1)
        : { ...image }
    );

    if (equals(sourceCard.cardCover, deleteId))
      sourceCard = { ...sourceCard, cardCover: "" };

    sourceList.cards.splice(
      sourceList.cards.indexOf(sourceCard),
      1,
      sourceCard
    );

    board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

    const newBoard = await updateBoardLists(boardId, board.lists);

    res.send(newBoard);
  } catch (error) {
    res.status(400).send({ message: "Failed to delete card attachment" });
  }
});

router.patch("/:boardId/comment", auth, async (req, res) => {
  const _id = req.params.boardId;
  const { comment, cardId, listId } = req.body;
  let board;
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

    const sourceList = getSourceList(board.lists, listId);
    const sourceCard = getSourceList(sourceList.cards, cardId);

    sourceCard.comments.push(newComment);

    sourceList.cards.splice(
      sourceList.cards.indexOf(sourceCard),
      1,
      sourceCard
    );

    board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);
    board.updateActivity(req.user.fname, "addComment");

    await updateBoardLists(_id, board.lists);

    board.save();

    res.status(201).send(sourceCard);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
module.exports = router;
