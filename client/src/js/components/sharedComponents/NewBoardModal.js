import React from "react";
import styled from "styled-components";

import { Modal, Card, Button, Icon, Input } from "semantic-ui-react";

const StyledDiv = styled.div`
  display: grid;

  background-color: #838c91;
  padding: 9px 9px;
  max-width: 300px;

  &:.ui.tiny.modal {
    width: 300px !important;
  }
`;

const StyledCardContent = styled(Card.Content)`
  padding-top: 10px !important;
  background-color: inherit !important;
`;

const StyledTextArea = styled(Input)`
  width: 100%;
  border-radius: 3px;
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  padding-bottom: 10px;
`;

const NewBoardModal = ({
  showNewBoardModal,
  createBoard,
  handleChange,
  handleCreateClick
}) => {
  return (
    <Modal
      className="board-modal"
      centered={false}
      size="tiny"
      open={createBoard}
    >
      <StyledDiv>
        <TextAreaWrapper>
          <StyledCardContent extra>
            <StyledTextArea
              placeholder="Add board title"
              onChange={e => handleChange(e)}
            />
          </StyledCardContent>
        </TextAreaWrapper>
        <div>
          <Button
            size="tiny"
            content="Create Board"
            onClick={() => handleCreateClick()}
          />
          <Icon name="close" onClick={() => showNewBoardModal()} />
        </div>
      </StyledDiv>
    </Modal>
  );
};

export default NewBoardModal;
