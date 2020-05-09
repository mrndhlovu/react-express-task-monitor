import React from "react";

import WrappedCard from "./WrappedCard";

const CardsWrapper = ({ sourceListId, cards, ...rest }) =>
  cards.map((card, index) => (
    <WrappedCard
      card={card}
      cardPosition={index + 1}
      id
      index={index}
      isLast={cards.length === index + 1}
      key={card._id}
      sourceListId={sourceListId}
      {...rest}
    />
  ));

export default CardsWrapper;
