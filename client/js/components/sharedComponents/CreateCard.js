import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Button, Card, TextArea, Icon } from "semantic-ui-react";
import { requestCreateNewCard } from "../../apis/apiRequests";
import { resetForm, emptyFunction } from "../../utils/appUtils";
import { BoardContext } from "../../utils/contextUtils";
import UIWrapper from "./UIWrapper";

const StyledButton = styled.div`
  text-align: left !important;
  background-color: #ebecf0 !important;
  padding: 5px 5px !important;
  border-radius: 3px;
  color: grey !important;
  outline: none !important;
  cursor: pointer;

  display: flex;
  justify-content: space-between;

  &:hover {
    color: #172b30 !important;
    background-color: #00000020 !important;
  }
`;

const Span = styled.span``;

const StyledCard = styled(Card)`
  padding: 5px !important;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5px;
`;

const StyledContainer = styled.div`
  padding-top: 10px;
  min-width: 243px;
`;

const CreateCard = ({
  handleAddCardName,
  closeAddCardOption,
  targetList,
  activeList,
  match,
}) => {
  const { saveBoardChanges } = useContext(BoardContext);
  const [newCard, setNewCard] = useState(null);
  const [save, setSave] = useState(false);
  const { id } = match.params;

  const handleChange = (event) => {
    setNewCard(event.target.value);
  };

  useEffect(() => {
    if (!save) return emptyFunction();

    const card = { title: newCard };
    const createCard = async () =>
      await requestCreateNewCard({ card, listId: targetList.listId }, id)
        .then((res) => {
          setNewCard("");
          saveBoardChanges(res.data);
        })
        .catch((error) => {});
    createCard();
    setSave(false);
    resetForm("create-card-input");
  }, [newCard, save, targetList, saveBoardChanges, id]);

  return (
    <StyledContainer>
      {!activeList ? (
        <StyledButton
          fluid
          basic
          onClick={() => handleAddCardName(targetList.listId)}
        >
          <Span>
            <Icon name="add" />
            Add a card...
          </Span>
          <Icon name="image" />
        </StyledButton>
      ) : (
        <StyledCard fluid>
          <TextArea
            id="create-card-input"
            placeholder="Enter a title for this card..."
            onChange={(e) => handleChange(e)}
            autoFocus
            fluid="true"
            onKeyDown={(e) => (e.key === "Enter" ? setSave(true) : null)}
          />

          <ButtonWrapper>
            <Button
              positive
              size="tiny"
              content="Add Card"
              onClick={() => setSave(true)}
            />

            <UIWrapper>
              <Icon
                name="close"
                onClick={() => closeAddCardOption()}
                size="large"
                link
              />
            </UIWrapper>
          </ButtonWrapper>
        </StyledCard>
      )}
    </StyledContainer>
  );
};

export default withRouter(CreateCard);
