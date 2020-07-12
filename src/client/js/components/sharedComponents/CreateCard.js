import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Button, Card, TextArea } from "semantic-ui-react";
import { requestCreateNewCard } from "../../apis/apiRequests";
import { resetForm, emptyFunction } from "../../utils/appUtils";
import { BoardContext } from "../../utils/contextUtils";
import UIWrapper from "./UIWrapper";
import { X, Plus, CreditCard } from "react-feather";
import { useMainContext, useBoardContext } from "../../utils/hookUtils";

const StyledButton = styled.div`
  text-align: left !important;
  background-color: #ebecf0 !important;
  padding: 5px !important;
  border-radius: 3px;
  color: grey !important;
  outline: none !important;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    color: #172b30 !important;
    background-color: #00000020 !important;
  }
`;

const Span = styled.span`
  display: flex;
  align-items: center;
`;

const StyledCard = styled(Card)`
  padding: 5px !important;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5px;
`;

const StyledContainer = styled.div`
  min-width: 243px;
  margin-top: 6%;
`;

const CreateCard = ({
  handleAddCardName,
  closeAddCardOption,
  targetList,
  activeList,
  match,
}) => {
  const { saveBoardChanges } = useBoardContext();
  const { alertUser } = useMainContext();
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
      await requestCreateNewCard({ card, listId: targetList.listId }, id).then(
        (res) => {
          setNewCard("");
          saveBoardChanges(res.data);
        }
      );

    if (newCard) createCard();
    else alertUser("Add card title");
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
          <Span className="uiDarkText">
            <Plus size={20} className="uiIconDark" />
            Add a card...
          </Span>
          <CreditCard size={15} className="uiIconDark" />
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
              <X onClick={() => closeAddCardOption()} className="uiIconDark" />
            </UIWrapper>
          </ButtonWrapper>
        </StyledCard>
      )}
    </StyledContainer>
  );
};

export default withRouter(CreateCard);
