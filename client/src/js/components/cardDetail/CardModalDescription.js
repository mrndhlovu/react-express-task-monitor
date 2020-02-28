import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { debounce } from "lodash";

import { Header, Icon, TextArea, Form, Button } from "semantic-ui-react";

const IconWrapper = styled.i`
  font-size: 19px;
`;

const StyledHeader = styled(Header)`
  font-size: 16px !important;
`;

const Description = styled.div`
  margin-left: 33px;
`;

const StyledTextArea = styled(TextArea)`
  background-color: #091e420a !important;
`;

const Span = styled.span`
  letter-spacing: 1px;
`;

const Container = styled.div`
  letter-spacing: 1px;
  margin: 10px;
`;

const ButtonsWrapper = styled.div`
  margin-top: 10px;
`;

const DescriptionContent = styled.div`
  margin-bottom: 60px;
`;

const DescriptionHeader = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  width: 100%;
`;

const CardModalDescription = ({
  board,
  makeBoardUpdate,
  listPosition,
  activeCard
}) => {
  const [hideSaveButton, setHideSaveButton] = useState(true);
  const [description, setDescription] = useState(activeCard.description);
  const [editing, setEditing] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleChange = e => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    let newBoard;

    newBoard = {
      ...board,
      lists: [
        ...board.lists.map(list =>
          list.position === listPosition
            ? {
                ...list,
                cards: [
                  ...list.cards.map(card =>
                    card.position === activeCard.position
                      ? { ...card, description }
                      : { ...card }
                  )
                ]
              }
            : list
        )
      ]
    };

    description && makeBoardUpdate(newBoard);
    setHideSaveButton(!hideSaveButton);
    setUpdated(true);
  };

  useEffect(() => {
    if (!updated) return;
    setEditing(false);
  }, [updated, activeCard, description]);

  return (
    <Container>
      <StyledHeader>
        <DescriptionHeader>
          <div>
            <IconWrapper>
              <Icon flipped="vertically" name="align left" />
            </IconWrapper>
            <Span>Description</Span>
          </div>
          <div>
            <Button
              onClick={() => setEditing(!editing)}
              size="tiny"
              content="Edit"
              floated="right"
            />
          </div>
        </DescriptionHeader>
      </StyledHeader>
      <Description>
        {editing ? (
          <Form>
            <StyledTextArea
              placeholder="Add more detailed description"
              defaultValue={description}
              onFocus={() => setHideSaveButton(!hideSaveButton)}
              onBlur={() =>
                debounce(() => setHideSaveButton(!hideSaveButton), 500)
              }
              onChange={e => handleChange(e)}
            />
            {!hideSaveButton && (
              <ButtonsWrapper>
                <Button
                  content="Save"
                  positive
                  size="tiny"
                  onClick={() => handleSave()}
                />
                <Icon
                  onClick={() => setHideSaveButton(!hideSaveButton)}
                  name="close"
                />
              </ButtonsWrapper>
            )}
          </Form>
        ) : (
          <DescriptionContent>
            <p>{description}</p>
          </DescriptionContent>
        )}
      </Description>
    </Container>
  );
};

export default CardModalDescription;
