import React, { useContext, useState, useEffect, memo } from "react";
import styled from "styled-components";

import { Modal } from "semantic-ui-react";

import ModalHeader from "./ModalHeader";
import { BoardListsContext } from "../../utils/contextUtils";
import CardModalDescription from "./CardModalDescription";
import CardModalSidebar from "./CardModalSidebar";
import Attachments from "./Attachments";
import ActivitiesHeader from "./ActivitiesHeader";
import CardComment from "./CardComment";
import ModalActivities from "./ModalActivities";

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
    sourceTitle,
    board,
    makeBoardUpdate,
    getSourceList,
    activeCard,
    handleUploadAttachment
  } = useContext(BoardListsContext);

  const [newAttachment, setNewAttachment] = useState(null);
  const [hideActivities, setHideActivities] = useState(true);

  const addCardAttachment = attachment => {
    setNewAttachment(attachment);
  };

  useEffect(() => {
    if (!newAttachment) return;
    else if (!activeCard.attachments.images.includes(newAttachment)) {
      activeCard.attachments.images.push(newAttachment);

      if (!activeCard.cardCover) {
        const newBoard = {
          ...board,
          lists: board.lists.map(list =>
            list.position === listPosition
              ? {
                  ...list,
                  cards: list.cards.map(card =>
                    card.position === activeCard.position
                      ? { ...card, cardCover: newAttachment }
                      : { ...card }
                  )
                }
              : { ...list }
          )
        };
        makeBoardUpdate(newBoard);
        setNewAttachment(null);
      }
    }
  }, [
    newAttachment,
    activeCard,
    board,
    getSourceList,
    listPosition,
    makeBoardUpdate
  ]);

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
        cardPosition={activeCard.position}
        listPosition={listPosition}
        sourceTitle={sourceTitle}
        cardCover={activeCard.cardCover}
      />

      <CardContent>
        <div>
          <CardModalDescription
            board={board}
            makeBoardUpdate={makeBoardUpdate}
            listPosition={listPosition}
            getSourceList={getSourceList}
            activeCard={activeCard}
          />
          <Attachments />
          <ActivitiesHeader
            handleShowDetails={() => setHideActivities(!hideActivities)}
          />

          {!hideActivities && <ModalActivities />}
          <CardComment />
        </div>
        <CardModalSidebar
          addCardAttachment={addCardAttachment}
          handleUploadAttachment={handleUploadAttachment}
        />
      </CardContent>
    </Modal>
  );
};

export default memo(CardDetailModal);
