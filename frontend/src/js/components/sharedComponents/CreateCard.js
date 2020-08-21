import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Button, Card } from "semantic-ui-react";
import { X, Plus, CreditCard } from "react-feather";

import { useBoardContext, useBoardListContext } from "../../utils/hookUtils";
import UIFormInput from "./UIFormInput";
import UIWrapper from "./UIWrapper";

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

const CreateCard = ({ targetList, activeListId }) => {
  const { createCardHandler } = useBoardContext();
  const { setActiveListId, closeAddCardOption } = useBoardListContext();

  const [newCard, setNewCard] = useState(null);

  const handleChange = (event) => {
    setNewCard(event.target.value);
  };

  return (
    <StyledContainer>
      {!activeListId ? (
        <StyledButton
          fluid
          basic
          onClick={() => setActiveListId(targetList.listId)}
        >
          <Span className="uiDarkText">
            <Plus size={20} className="uiIconDark" />
            Add a card...
          </Span>
          <CreditCard size={15} className="uiIconDark" />
        </StyledButton>
      ) : (
        <StyledCard fluid>
          <UIFormInput
            id="create-card-input"
            placeholder="Enter a title for this card..."
            onChange={(e) => handleChange(e)}
            autoFocus
            onKeyDown={(e) =>
              e.key === "Enter"
                ? createCardHandler(newCard, targetList.listId)
                : null
            }
          />

          <ButtonWrapper>
            <Button
              positive
              size="tiny"
              content="Add Card"
              onClick={() => createCardHandler(newCard, targetList.listId)}
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

CreateCard.propTypes = {
  activeListId: PropTypes.bool.isRequired,
  targetList: PropTypes.shape({ listId: PropTypes.string.isRequired })
    .isRequired,
};

export default withRouter(CreateCard);
