import React from "react";

import { Label } from "semantic-ui-react";
import styled from "styled-components";

const StyledLabel = styled(Label)`
  background-color: #fff !important;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  display: block;
  margin-bottom: 5px !important;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 0;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  width: 95%;
  z-index: 0;
`;

const CardItem = ({ cards }) => {
  return cards.map(card => (
    <StyledLabel key={card.id}>
      <Label.Detail>{card.detail}</Label.Detail>
    </StyledLabel>
  ));
};

export default CardItem;
