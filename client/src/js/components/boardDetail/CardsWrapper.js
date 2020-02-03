import React from "react";

import WrappedCard from "./WrappedCard";

const CardsWrapper = ({ cards, ...rest }) =>
  cards.map(card => <WrappedCard key={card.position} card={card} {...rest} />);

export default CardsWrapper;
