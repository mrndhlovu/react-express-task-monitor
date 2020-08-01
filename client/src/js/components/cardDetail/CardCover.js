import React from "react";
import PropTypes from "prop-types";

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

CardCover.propTypes = {
  card: PropTypes.shape({
    cardCover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardCover;
