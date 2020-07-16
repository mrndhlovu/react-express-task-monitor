import React, { useState } from "react";
import update from "immutability-helper";

import WrappedCard from "./WrappedCard";
import { useBoardContext } from "../../utils/hookUtils";

const CardsWrapper = ({
  listPosition,
  sourceListId,
  resetListsState,
  ...rest
}) => {
  const { board, boardUpdateHandler, updateBoardState } = useBoardContext();

  const [lists, setLists] = useState(null);
  const [cards, setCards] = useState(null);

  const sourceListIndex = listPosition - 1;
  const sourceList = (lists || board.lists)[sourceListIndex];

  const cardDropHandler = () => {
    resetListsState();
    setCards(null);
    boardUpdateHandler(board);
  };

  const cardRepositionHandler = (dragIndex, hoverIndex, hoverListIndex) => {
    const dragCard = sourceList.cards[dragIndex];
    const hoverLists = (lists || board.lists)[hoverListIndex];

    if (sourceListIndex !== hoverListIndex) {
      const updatedLists = update(hoverLists, {
        [sourceListIndex]: {
          $splice: [[dragIndex, 1]],
        },
        [hoverListIndex]: {
          $splice: [[hoverIndex, 0, dragCard]],
        },
      });

      setLists(updatedLists);

      updateBoardState({ ...board, lists: updatedLists });
    } else {
      const updatedCards = update(sourceList.cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      });
      setCards(updatedCards);
      board.lists.splice(sourceListIndex, 1, {
        ...sourceList,
        cards: updatedCards,
      });
    }
  };

  return (cards || sourceList.cards).map((card, index) => (
    <WrappedCard
      key={card._id}
      card={card}
      cardIndex={index}
      isLast={sourceList.cards.length === index + 1}
      cardRepositionHandler={cardRepositionHandler}
      sourceListId={sourceListId}
      cardDropHandler={cardDropHandler}
      listPosition={listPosition}
      {...rest}
    />
  ));
};

export default CardsWrapper;
