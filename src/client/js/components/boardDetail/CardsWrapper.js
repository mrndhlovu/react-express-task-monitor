import React, { useState } from "react";
import update from "immutability-helper";

import WrappedCard from "./WrappedCard";
import { useBoardContext } from "../../utils/hookUtils";

const CardsWrapper = ({ listPosition, sourceListId, ...rest }) => {
  const { board, boardUpdateHandler, getSourceList } = useBoardContext();

  const [cards, setCards] = useState(null);

  const sourceList = getSourceList(sourceListId);
  const listIndex = listPosition - 1;

  const cardDropHandler = () =>
    boardUpdateHandler(board, undefined, setCards(null));

  const cardRepositionHandler = (dragIndex, hoverIndex) => {
    const dragCard = sourceList.cards[dragIndex];

    const updatedCards = update(sourceList.cards, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    });

    setCards(updatedCards);
    board.lists.splice(listIndex, 1, { ...sourceList, cards: updatedCards });
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
      {...rest}
    />
  ));
};

export default CardsWrapper;
