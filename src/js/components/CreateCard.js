import React from "react";
import styled from "styled-components";

import { Button, Card, TextArea, Icon, Container } from "semantic-ui-react";

const StyledTextArea = styled(TextArea)`
  width: 100%;
  border-radius: 5px;
  min-height: 80px !important;
`;

const StyledCardContent = styled(Card.Content)`
  padding: 0px !important;
  background-color: #eee !important;
  border: none !important;
`;

const StyledButton = styled(Container)`
  text-align: left !important;
  background-color: #ebecf0 !important;
  padding: 0 !important;
  border: none !important;
  color: grey !important;
  outline: none !important;

  :hover {
    color: grey;
  }
`;

const StyleSpan = styled.span`
  margin-left: 44%;
`;

const CreateCard = ({
  handleAddCardName,
  handleCreateCard,
  handleCancelAddCard,
  columnId,
  activeColumn,
  handleOnChange
}) => {
  return (
    <Card>
      {!activeColumn ? (
        <StyledButton
          as="a"
          fluid
          basic
          onClick={() => handleAddCardName(columnId)}
        >
          <Icon name="add" />
          Add a card...
          <StyleSpan>
            <Icon name="image" />
          </StyleSpan>
        </StyledButton>
      ) : (
        <StyledCardContent extra>
          <StyledTextArea
            placeholder="Enter a title for this card.."
            onChange={e => handleOnChange(e)}
          />
          <Button
            color="green"
            size="tiny"
            content="Add Card"
            onClick={() => handleCreateCard()}
          />
          <Icon name="close" onClick={() => handleCancelAddCard()} />
        </StyledCardContent>
      )}
    </Card>
  );
};

export default CreateCard;
