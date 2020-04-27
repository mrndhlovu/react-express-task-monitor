import React from "react";

import WrappedCard from "./WrappedCard";

const CardsWrapper = ({ cards, ...rest }) =>
  cards.map((card, index) => (
    <WrappedCard
      key={card._id}
      card={card}
      isLast={cards.length === index + 1}
      {...rest}
    />
  ));

export default CardsWrapper;
