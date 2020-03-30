import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Button, Card, TextArea, Icon } from "semantic-ui-react";
import { requestCreateNewCard } from "../../apis/apiRequests";
import { resetForm, emptyFunction } from "../../utils/appUtils";
import { BoardContext } from "../../utils/contextUtils";

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
  padding-top: 10px;
  min-width: 243px;
`;

const CreateCard = ({
  handleAddCardName,
  closeAddCardOption,
  listId,
  activeList,
  match
}) => {
  const { saveBoardChanges } = useContext(BoardContext);
  const [newCard, setNewCard] = useState(null);
  const [save, setSave] = useState(false);
  const { id } = match.params;

  const handleChange = event => {
    setNewCard(event.target.value);
  };

  useEffect(() => {
    if (!save) return emptyFunction();

    const card = { title: newCard };
    const createCard = async () =>
      await requestCreateNewCard({ card, listId }, id)
        .then(res => {
          setNewCard("");
          saveBoardChanges(res.data);
        })
        .catch(error => {});
    createCard();
    setSave(false);
    resetForm("create-card-input");
  }, [newCard, save, listId, saveBoardChanges, id]);

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
        <form>
          <StyledCardContent extra>
            <StyledTextArea
              id="create-card-input"
              placeholder="Enter a title for this card..."
              onChange={e => handleChange(e)}
              autoFocus
              onKeyDown={e => (e.key === "Enter" ? setSave(true) : null)}
            />
          </StyledCardContent>

          <>
            <Button
              positive
              size="tiny"
              content="Add Card"
              onClick={() => setSave(true)}
            />
            <Icon name="close" onClick={() => closeAddCardOption()} />
          </>
        </form>
      )}
    </StyledContainer>
  );
};

export default withRouter(CreateCard);
