import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _debounce from "debounce";

import { Icon, TextArea, Form, Button } from "semantic-ui-react";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import { useCardDetailContext } from "../../utils/hookUtils";

const Description = styled.div``;

const StyledTextArea = styled(TextArea)`
  background-color: #091e420a !important;
`;

const ButtonsWrapper = styled.div`
  margin-top: 10px;
`;

const DescriptionContent = styled.div`
  margin-bottom: 60px;
`;

const DescriptionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardModalDescription = () => {
  const { card, updatedCardChanges } = useCardDetailContext();

  const [hideSaveButton, setHideSaveButton] = useState(true);
  const [description, setDescription] = useState(card.description);
  const [editing, setEditing] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    description && updatedCardChanges({ ...card, description });
    setHideSaveButton(!hideSaveButton);
    setUpdated(true);
  };

  useEffect(() => {
    if (!updated) return;
    setEditing(false);
  }, [updated, card, description]);

  return (
    <>
      <DescriptionHeader>
        <CardDetailHeader description="Description" />
        <Button
          onClick={() => setEditing(!editing)}
          size="tiny"
          content="Edit"
          floated="right"
        />
      </DescriptionHeader>
      <CardDetailSegment>
        <Description>
          {editing && (
            <Form>
              <StyledTextArea
                placeholder="Add a more detailed description"
                defaultValue={description}
                onFocus={() => setHideSaveButton(!hideSaveButton)}
                onBlur={_debounce(
                  () => setHideSaveButton(!hideSaveButton),
                  1000
                )}
                onChange={(e) => handleChange(e)}
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
          )}

          {description && !editing && (
            <DescriptionContent>
              <p>{description}</p>
            </DescriptionContent>
          )}
        </Description>
      </CardDetailSegment>
    </>
  );
};

export default CardModalDescription;
