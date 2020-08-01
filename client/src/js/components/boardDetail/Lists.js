import React, { useState } from "react";
import update from "immutability-helper";

import { useBoardContext } from "../../utils/hookUtils";
import List from "./List";

const ListGrid = () => {
  const { board, boardUpdateHandler, updateBoardState } = useBoardContext();

  const [draggingCard, setDraggingCard] = useState(undefined);
  const [dragIndex, setDragIndex] = useState(undefined);
  const [hoverIndex, setHoverIndex] = useState(undefined);
  const [lists, setLists] = useState(undefined);
  const [previousIndex, setPreviousIndex] = useState(undefined);

  const boardLists = lists || board.lists;

  const listDropHandler = () => {
    boardUpdateHandler({ ...board, lists: boardLists });
    resetListsState();
  };
  const resetListsState = () => {
    setHoverIndex(undefined);
    setDraggingCard(undefined);
    setPreviousIndex(undefined);
    setDragIndex(undefined);
    setLists(undefined);
  };

  const undoMoveCard = (listHoverIndex) => {
    if (previousIndex > -1) {
      const cardIndex = boardLists[previousIndex].cards.indexOf(draggingCard);
      boardLists[previousIndex].cards.splice(cardIndex, 1);

      moveCard(listHoverIndex, cardIndex, draggingCard);
    }
  };

  const removeCardFromSource = (sourceIndex, cardIndex, cb) => {
    const cards = update(boardLists[sourceIndex].cards, {
      $splice: [[cardIndex, 1]],
    });
    const updatedSource = { ...boardLists[sourceIndex], cards };
    boardLists.splice(sourceIndex, 1, updatedSource);
    cb();
  };

  const moveCard = (listHoverIndex, cardIndex, dragCard) => {
    const targetCards = update(boardLists[listHoverIndex].cards, {
      $splice: [[cardIndex, 0, dragCard]],
    });
    const updatedTarget = { ...boardLists[listHoverIndex], cards: targetCards };
    boardLists.splice(listHoverIndex, 1, updatedTarget);

    setLists(boardLists);
    setPreviousIndex(listHoverIndex);
  };

  const cardToNewListHandler = (cardIndex, listHoverIndex, sourceIndex) => {
    const dragCard = draggingCard || boardLists[sourceIndex].cards[cardIndex];
    !draggingCard && setDraggingCard(dragCard);

    const isOverSource = sourceIndex === listHoverIndex;
    const hasPreviousIndex = previousIndex > -1;
    const skipUndo = hasPreviousIndex && previousIndex === sourceIndex;

    if (hasPreviousIndex || skipUndo || isOverSource)
      return undoMoveCard(listHoverIndex);

    removeCardFromSource(sourceIndex, cardIndex, () =>
      moveCard(listHoverIndex, cardIndex, dragCard)
    );
  };

  const moveListHandler = (hoverIndex) => {
    const dragList = board.lists[dragIndex];

    const updatedLists = update(board.lists, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragList],
      ],
    });
    setLists(updatedLists);
    updateBoardState({ ...board, lists: updatedLists });
  };

  return Object.keys(boardLists).map(
    (list, index) =>
      list && (
        <List
          cardToNewListHandler={cardToNewListHandler}
          dragIndex={dragIndex}
          hoverIndex={hoverIndex}
          key={list}
          list={boardLists[list]}
          listDropHandler={listDropHandler}
          moveListHandler={moveListHandler}
          position={index + 1}
          resetListsState={resetListsState}
          setDragIndex={setDragIndex}
          setHoverIndex={setHoverIndex}
        />
      )
  );
};

export default ListGrid;
