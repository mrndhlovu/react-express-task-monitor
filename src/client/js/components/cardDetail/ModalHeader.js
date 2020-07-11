import React, { useState, useEffect } from "react";
import styled from "styled-components";

import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import MoveCardDialog from "../boardDetail/MoveCardDialog";
import UIWrapper from "../sharedComponents/UIWrapper";
import DropdownButton from "../sharedComponents/DropdownButton";
import { useCardDetailContext, useBoardContext } from "../../utils/hookUtils";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
`;

const ModalHeader = () => {
  const {
    card,
    sourceList,
    sourceId,
    history,
    setSourceId,
  } = useCardDetailContext();
  const { board } = useBoardContext();
  const [close, setClose] = useState(false);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setClose(false);
      }, 500);
    };
  });

  return (
    <>
      <CardDetailHeader
        description={card.title.toUpperCase()}
        section="Header"
      />
      <Container>
        <DropdownButton
          buttonText={`in list ${sourceList.title.toUpperCase()}`}
          icon={false}
          className="card-source"
          button={false}
          labeled={false}
          fluid={false}
          color="transparent"
          header="Move Card"
          direction="right"
          close={close}
        >
          <UIWrapper className="move-card-wrapper">
            <MoveCardDialog
              originalBoard={board}
              originalCard={card}
              sourceListId={sourceId}
              setClose={() => setClose(true)}
              history={history}
              setSourceId={setSourceId}
            />
          </UIWrapper>
        </DropdownButton>
      </Container>
    </>
  );
};

export default ModalHeader;
