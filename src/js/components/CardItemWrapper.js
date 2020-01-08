import React from "react";

import CardItem from "./CardItem";

const CardItemWrapper = ({ cards, ...rest }) => {
  return cards.map(card => {
    return (
      <div key={card.id}>
        <CardItem card={card} {...rest} />
      </div>
    );
  });
};

export default CardItemWrapper;
