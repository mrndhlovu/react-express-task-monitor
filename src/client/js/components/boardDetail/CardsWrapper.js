import React, { useState, useCallback } from "react";
import update from "immutability-helper";

import WrappedCard from "./WrappedCard";
import _debounce from "debounce";

const CardsWrapper = ({
  sourceListId,
  moveCardToNewPosition,
  listPosition,
  listCards,
  ...rest
}) => {
  const [cards, setCards] = useState(listCards);

  const moveCardToNewList = (dragIndex, hoverIndex) => {
    console.log("moveCardToNewList ->", dragIndex, hoverIndex);
  };

  const sortCards = useCallback(
    (dragIndex, hoverIndex) => {
      if (!hoverIndex.list === listPosition)
        return moveCardToNewList(dragIndex, hoverIndex);

      const dragCard = cards[dragIndex];

      const updatedCards = update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex.card, 0, dragCard],
        ],
      });

      setCards(updatedCards);

      _debounce(moveCardToNewPosition(updatedCards, sourceListId), 1000);
    },
    [cards, sourceListId, listPosition]
  );

  return cards.map((card, index) => {
    return (
      <WrappedCard
        card={card}
        cardPosition={index + 1}
        id
        index={index}
        isLast={cards.length === index + 1}
        key={card._id}
        listPosition={listPosition}
        sourceListId={sourceListId}
        sortCards={sortCards}
        {...rest}
      />
    );
  });
};

export default CardsWrapper;
