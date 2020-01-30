import React from "react";
import styled from "styled-components";

import { Button, Card, TextArea, Icon } from "semantic-ui-react";

const StyledTextArea = styled(TextArea)`
  width: 100%;
  border-radius: 3px;
  min-height: 80px !important;
  padding-top: 5px;
  padding-left: 5px;
`;

const StyledCardContent = styled(Card.Content)`
  padding-top: 10px !important;
  background-color: #eee !important;
`;

const StyledButton = styled.div`
  text-align: left !important;
  background-color: #ebecf0 !important;
  padding: 5px 5px !important;
  border-radius: 3px;
  color: grey !important;
  outline: none !important;
  cursor: pointer;

  display: grid;
  grid-template-columns: 92% 8%;

  &:hover {
    color: #172b4d !important;
    background-color: #00000026 !important;
  }
`;

const StyleDiv = styled.div``;

const StyledContainer = styled.div`
  min-width: 243px;
`;

const CreateCard = ({
  handleAddCardName,
  handleCreateCard,
  handleCancelAddCard,
  listId,
  activeList,
  handleOnChange
}) => {
  return (
    <StyledContainer>
      {!activeList ? (
        <StyledButton fluid basic onClick={() => handleAddCardName(listId)}>
          <StyleDiv>
            <Icon name="add" />
            Add a card...
          </StyleDiv>
          <StyleDiv>
            <Icon name="image" />
          </StyleDiv>
        </StyledButton>
      ) : (
        <>
          <StyledCardContent extra>
            <StyledTextArea
              placeholder="Enter a title for this card.."
              onChange={e => handleOnChange(e)}
            />
          </StyledCardContent>

          <>
            <Button
              positive
              size="tiny"
              content="Add Card"
              onClick={() => handleCreateCard(listId)}
            />
            <Icon name="close" onClick={() => handleCancelAddCard()} />
          </>
        </>
      )}
    </StyledContainer>
  );
};

export default CreateCard;
