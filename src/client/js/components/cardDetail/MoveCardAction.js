import React, { useState } from "react";

import DropdownButton from "../sharedComponents/DropdownButton";
import MoveCardDialog from "../boardDetail/MoveCardDialog";
import UIContainer from "../sharedComponents/UIContainer";
import { useBoardContext, useCardDetailContext } from "../../utils/hookUtils";

const MoveCardAction = () => {
  const { board } = useBoardContext();
  const { card, sourceId, history, setSourceId } = useCardDetailContext();

  const [close, setClose] = useState(false);

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
          originalCard={card}
          sourceListId={sourceId}
          setClose={() => setClose(true)}
          history={history}
          setSourceId={setSourceId}
        />
      </UIContainer>
    </DropdownButton>
  );
};

export default MoveCardAction;
