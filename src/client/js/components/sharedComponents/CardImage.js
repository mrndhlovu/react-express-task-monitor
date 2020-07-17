import React from "react";
import PropTypes from "prop-types";

import { Image, Segment } from "semantic-ui-react";

const CardImage = ({ image }) => {
  return (
    <Segment>
      <Image size="medium" src={image} alt={image} />
    </Segment>
  );
};

CardImage.propTypes = {
  image: PropTypes.string.isRequired,
};

export default CardImage;
