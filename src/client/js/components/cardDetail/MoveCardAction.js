import React, { useState, useEffect } from "react";

import DropdownButton from "../sharedComponents/DropdownButton";
import MoveCardDialog from "../boardDetail/MoveCardDialog";
import UIContainer from "../sharedComponents/UIContainer";

const MoveCardAction = ({ board, activeCard, sourceId, ...otherProps }) => {
  const [close, setClose] = useState(false);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setClose(false);
      }, 500);
    };
  });

  return (
    <DropdownButton
      upward={true}
      header="Move"
      icon="right arrow"
      buttonText="Move"
      close={close}
    >
      <UIContainer>
        <MoveCardDialog
          originalBoard={board}
          originalCard={activeCard}
          sourceListId={sourceId}
          setClose={() => setClose(true)}
          {...otherProps}
        />
      </UIContainer>
    </DropdownButton>
  );
};

export default MoveCardAction;
