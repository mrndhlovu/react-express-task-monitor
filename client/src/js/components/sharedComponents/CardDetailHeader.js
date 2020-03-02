import React from "react";
import { Header, Icon } from "semantic-ui-react";

const CardDetailHeader = ({ icon, description, flipped }) => {
  return (
    <Header
      icon={<Icon flipped={flipped} name={icon} />}
      content={description}
      as="h5"
    />
  );
};

export default CardDetailHeader;
