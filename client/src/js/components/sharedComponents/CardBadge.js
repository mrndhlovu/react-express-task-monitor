import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";

const Badge = styled.span`
  font-size: 10px;
  padding-right: 5px;
`;

const CardBadge = ({ flipped, icon, content, hasBadge = false }) => {
  return (
    hasBadge && (
      <Badge>
        <Icon name={icon} flipped={flipped} />
        {content}
      </Badge>
    )
  );
};

export default CardBadge;
