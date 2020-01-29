import React from "react";

import CardItem from "./CardItem";

const CardItemWrapper = ({ cards, hoverIndex, ...rest }) =>
  cards.map(card => (
    <CardItem
      key={card.position}
      activeCard={card.position === hoverIndex}
      card={card}
      hoverIndex={hoverIndex}
      {...rest}
    />
  ));

export default CardItemWrapper;
