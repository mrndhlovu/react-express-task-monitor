import React from "react";
import styled from "styled-components";

import { Button, Header, Divider } from "semantic-ui-react";
import { ADD_TO_CARD_OPTIONS, CARD_ACTIONS } from "../../constants/constants";

const StyledButton = styled(Button)`
  padding-bottom: 15px;
  background-color: #091e420a;
  text-align: left !important;
`;

const StyledHeader = styled(Header)`
  font-size: 14px !important;
  color: #767676 !important;
`;

const Container = styled.div`
  margin: 10px;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 10px;
`;

const CardModalSidebar = () => {
  return (
    <Container>
      <StyledHeader content="ADD TO CARD" />
      {ADD_TO_CARD_OPTIONS.map(option => (
        <ButtonWrapper key={option.key}>
          <StyledButton icon={`${option.icon}`} fluid content={option.value} />
        </ButtonWrapper>
      ))}

      <Divider />

      <StyledHeader content="ACTIONS" />
      {CARD_ACTIONS.map(option => (
        <ButtonWrapper key={option.key}>
          <StyledButton icon={`${option.icon}`} fluid content={option.value} />
        </ButtonWrapper>
      ))}
    </Container>
  );
};

export default CardModalSidebar;
