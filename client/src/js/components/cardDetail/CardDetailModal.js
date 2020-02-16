import React, { useContext } from "react";
import styled from "styled-components";

import { Modal } from "semantic-ui-react";

import ModalHeader from "./ModalHeader";
import { BoardListsContext } from "../../utils/contextUtils";
import CardModalDescription from "./CardModalDescription";
import CardModalSidebar from "./CardModalSidebar";

const CardContent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 65% 30%;
  top: 14%;
  left: 2%;
`;
const CardDetailModal = ({ listPosition }) => {
  const {
    hideCardDetail,
    handleCardClick,
    sourceId,
    sourceTitle,
    board,
    makeBoardUpdate,
    getSourceList,
    activeCard
  } = useContext(BoardListsContext);

  return (
    <Modal
      className="card-detail-container"
      closeOnDocumentClick={true}
      centered={false}
      open={!hideCardDetail}
      closeIcon
      onClose={() => handleCardClick()}
    >
      <ModalHeader
        title={activeCard.title}
        listPosition={listPosition}
        cardPosition={activeCard.position}
        sourceId={sourceId}
        sourceTitle={sourceTitle}
      />
      <CardContent>
        <CardModalDescription
          board={board}
          makeBoardUpdate={makeBoardUpdate}
          listPosition={listPosition}
          getSourceList={getSourceList}
          activeCard={activeCard}
        />
        <CardModalSidebar />
      </CardContent>
    </Modal>
  );
};

export default CardDetailModal;
