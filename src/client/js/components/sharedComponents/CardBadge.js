import React from "react";
import styled from "styled-components";

import { Icon, Label } from "semantic-ui-react";

const Badge = styled(Label)`
  font-size: 10px;
  padding-right: 5px;
`;

const CardBadge = ({
  as = "span",
  flipped,
  icon,
  content,
  hasBadge = false,
  color,
  className,
}) => {
  return (
    hasBadge && (
      <Badge color={color} as={as} className={className}>
        <Icon name={icon} flipped={flipped} />
        {content}
      </Badge>
    )
  );
};

export default CardBadge;
