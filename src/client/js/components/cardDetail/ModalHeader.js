import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { CreditCard } from "react-feather";

import { useCardDetailContext, useBoardContext } from "../../utils/hookUtils";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import DropdownButton from "../sharedComponents/DropdownButton";
import MoveCardDialog from "../boardDetail/MoveCardDialog";
import UIWrapper from "../sharedComponents/UIWrapper";

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
    updatedCardChanges,
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
        handleEditTitle={updatedCardChanges}
        editable
        editItem={card}
        fontSize="15px"
        icon={() => <CreditCard />}
      />
      <Container>
        <DropdownButton
          buttonText={`in list ${sourceList.title.toUpperCase()}`}
          className="card-source"
          button={false}
          labeled={false}
          fluid={false}
          color="transparent"
          header="Move Card"
          direction="right"
          close={close}
          icon={null}
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
