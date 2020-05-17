import React from "react";
import styled from "styled-components";

import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import MoveCardDialog from "../boardDetail/MoveCardDialog";
import UIWrapper from "../sharedComponents/UIWrapper";
import DropdownButton from "../sharedComponents/DropdownButton";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 10px;
`;

const ModalHeader = ({
  title,
  sourceTitle,
  originalBoard,
  originalCard,
  sourceId,
  handleBoardUpdate,
  history,
}) => {
  return (
    <Container>
      <CardDetailHeader
        icon="window maximize outline"
        description={title.toUpperCase()}
      />

      <DropdownButton
        buttonText={`in list ${sourceTitle.toUpperCase()}`}
        icon={false}
        className="card-source"
        button={false}
        labeled={false}
        fluid={false}
        color="transparent"
        header="Move Card"
        direction="right"
      >
        <UIWrapper className="move-card-wrapper">
          <MoveCardDialog
            originalBoard={originalBoard}
            originalCard={originalCard}
            history={history}
            sourceListId={sourceId}
            handleBoardUpdate={handleBoardUpdate}
          />
        </UIWrapper>
      </DropdownButton>
    </Container>
  );
};

export default ModalHeader;
