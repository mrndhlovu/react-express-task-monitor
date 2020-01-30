import React from "react";

import CardItem from "./CardItem";

const CardItemWrapper = ({ cards, hoverIndex, ...rest }) =>
  cards.map(card => (
    <CardItem
      key={card.position}
      card={card}
      hoverIndex={hoverIndex}
      {...rest}
    />
  ));

export default CardItemWrapper;
