import React from "react";

import CardItem from "./CardItem";

const CardItemWrapper = ({ cards, ...rest }) =>
  cards.map(card => <CardItem key={card.id} card={card} {...rest} />);

export default CardItemWrapper;
