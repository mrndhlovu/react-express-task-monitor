import React from "react";
import styled from "styled-components";

import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import { Dropdown } from "semantic-ui-react";
import MoveCardDialog from "../boardDetail/MoveCardDialog";
import UIWrapper from "../sharedComponents/UIWrapper";

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

      <Dropdown
        as="small"
        text={`in list ${sourceTitle.toUpperCase()}`}
        multiple
        icon={false}
        className="card-source"
        closeOnChange={false}
      >
        <Dropdown.Menu>
          <UIWrapper>
            <MoveCardDialog
              originalBoard={originalBoard}
              originalCard={originalCard}
              history={history}
              sourceListId={sourceId}
              handleBoardUpdate={handleBoardUpdate}
            />
          </UIWrapper>
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};

export default ModalHeader;
