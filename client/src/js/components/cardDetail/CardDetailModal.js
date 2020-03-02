import React, { useContext, useState, useEffect, memo } from "react";
import styled from "styled-components";

import { Modal } from "semantic-ui-react";

import { BoardListsContext } from "../../utils/contextUtils";
import { checkDuplicate } from "../../utils/appUtils";
import Attachments from "./Attachments";
import CardActivities from "./CardActivities";
import CardComments from "./CardComments";
import CardModalDescription from "./CardModalDescription";
import CardModalSidebar from "./CardModalSidebar";
import ModalHeader from "./ModalHeader";
import ModalImageCover from "./ModalImageCover";

const CardContent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 65% 30%;
  top: 9%;
  left: 2%;
  height: 70%;
`;

const LeftSideContent = styled.div`
  overflow-y: scroll;
`;

const CardDetailModal = ({ listPosition }) => {
  const {
    hideCardDetail,
    handleCardClick,
    sourceTitle,
    board,
    makeBoardUpdate,
    getSourceList,
    activeCard,
    handleUploadAttachment
  } = useContext(BoardListsContext);

  const [newAttachment, setNewAttachment] = useState(null);
  const [hideActivities, setHideActivities] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const addCardAttachment = attachment => {
    setNewAttachment(attachment);
  };

  useEffect(() => {
    if (!newAttachment) return;
    const duplicate = checkDuplicate(
      activeCard.attachments.images,
      newAttachment.imgUrl
    );
    let newBoard;

    if (!duplicate) {
      activeCard.attachments.images.push(newAttachment);

      newBoard = {
        ...board,
        lists: board.lists.map(list =>
          list.position === listPosition
            ? {
                ...list,
                cards: list.cards.map(card =>
                  card.position === activeCard.position
                    ? { ...card, cardCover: newAttachment.imgUrl }
                    : { ...card }
                )
              }
            : { ...list }
        )
      };

      makeBoardUpdate(newBoard, true);
      setNewAttachment(null);
    }
  }, [
    newAttachment,
    activeCard,
    board,
    getSourceList,
    listPosition,
    makeBoardUpdate
  ]);

  const handleLoadingAttachment = loading => {
    setIsLoading(loading);
  };

  return (
    <Modal
      className="card-detail-container"
      closeOnDocumentClick={true}
      centered={false}
      open={!hideCardDetail}
      onClose={() => handleCardClick()}
      closeIcon={!activeCard.cardCover}
    >
      <ModalImageCover
        cardCover={activeCard.cardCover}
        handleCardClick={handleCardClick}
      />

      <ModalHeader
        title={activeCard.title}
        cardPosition={activeCard.position}
        listPosition={listPosition}
        sourceTitle={sourceTitle}
        cardCover={activeCard.cardCover}
      />
      <CardContent>
        <LeftSideContent>
          <CardModalDescription
            board={board}
            makeBoardUpdate={makeBoardUpdate}
            listPosition={listPosition}
            getSourceList={getSourceList}
            activeCard={activeCard}
          />
          <Attachments card={activeCard} isLoading={isLoading} />
          <CardActivities
            handleShowDetails={() => setHideActivities(!hideActivities)}
            hideActivities={hideActivities}
          />

          <CardComments />
        </LeftSideContent>
        <CardModalSidebar
          addCardAttachment={addCardAttachment}
          handleUploadAttachment={handleUploadAttachment}
          handleLoadingAttachment={handleLoadingAttachment}
        />
      </CardContent>
    </Modal>
  );
};

export default memo(CardDetailModal);
