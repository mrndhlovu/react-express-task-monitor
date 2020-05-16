import React from "react";

import DropdownButton from "../sharedComponents/DropdownButton";
import MoveCardDialog from "../boardDetail/MoveCardDialog";
import UIContainer from "../sharedComponents/UIContainer";

const MoveCardAction = ({
  board,
  activeCard,
  history,
  sourceId,
  handleBoardUpdate,
}) => {
  return (
    <DropdownButton
      upward={true}
      header="Move"
      icon="right arrow"
      buttonText="Move"
    >
      <UIContainer>
        <MoveCardDialog
          originalBoard={board}
          originalCard={activeCard}
          history={history}
          sourceListId={sourceId}
          handleBoardUpdate={handleBoardUpdate}
        />
      </UIContainer>
    </DropdownButton>
  );
};

export default MoveCardAction;
