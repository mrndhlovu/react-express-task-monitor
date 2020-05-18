import React from "react";

import { Image } from "semantic-ui-react";

const CardCover = ({ card }) => {
  return (
    card.cardCover && (
      <Image
        id={`card-cover-${card.cardCover}`}
        src={card.cardCover}
        alt={`card-${card.title.toLowerCase()}-cover`}
        className="card-cover"
      />
    )
  );
};

export default CardCover;
