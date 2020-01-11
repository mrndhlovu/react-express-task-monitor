import React from "react";

import CardItem from "./CardItem";

const CardItemWrapper = ({ cards, ...rest }) =>
  cards.map(card => (
    <div key={card.id}>
      <CardItem card={card} {...rest} />
    </div>
  ));

export default CardItemWrapper;
