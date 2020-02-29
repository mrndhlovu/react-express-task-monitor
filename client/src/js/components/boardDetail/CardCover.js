import React from "react";

import { Image } from "semantic-ui-react";

const CardCover = ({ card }) => {
  return (
    card.cardCover && (
      <Image
        src={card.cardCover}
        alt={`card-${card.title.toLowerCase()}-cover`}
      />
    )
  );
};

export default CardCover;
