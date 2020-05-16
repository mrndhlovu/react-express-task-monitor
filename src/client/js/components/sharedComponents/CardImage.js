import React from "react";

import { Image, Segment } from "semantic-ui-react";

const CardImage = ({ image }) => {
  return (
    <Segment>
      <Image size="medium" src={image} alt={image} />
    </Segment>
  );
};

export default CardImage;
