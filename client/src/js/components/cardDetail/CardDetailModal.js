import React, { useContext, useState, useEffect, memo } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Modal, Button } from "semantic-ui-react";

import { BoardListsContext, AppContext } from "../../utils/contextUtils";
import { checkDuplicate } from "../../utils/appUtils";
import {
  requestCardCoverUpdate,
  requestDeleteAttachment
} from "../../apis/apiRequests";
import Attachments from "./Attachments";
import CardActivities from "./CardActivities";
import CardModalDescription from "./CardModalDescription";
import CardModalSidebar from "./CardModalSidebar";
import ModalHeader from "./ModalHeader";
import ModalImageCover from "./ModalImageCover";

const CardContent = styled(Modal.Content)``;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1000 !important;
`;

const LeftSideContent = styled(Modal.Description)``;

const StyledIcon = styled(Button)`
  border-radius: 50px !important;
`;

const CardDetailModal = ({ listPosition, match }) => {
  const {
    hideCardDetail,
    handleCardClick,
    sourceTitle,
    board,
    backendUpdate,
    getSourceList,
    activeCard,
    handleUploadAttachment
  } = useContext(BoardListsContext);
  const { auth } = useContext(AppContext);

  const { id } = match.params;
  const [newAttachment, setNewAttachment] = useState(null);
  const [hideActivities, setHideActivities] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [removeCover, setRemoveCover] = useState(false);
  const [newCover, setNewCover] = useState(null);
  const [activeCover, setActiveCardCover] = useState(null);
  const [deleteAttachment, setDeleteAttachment] = useState(null);

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

      backendUpdate(newBoard, true);
      setNewCover(newAttachment.imgUrl);
      setNewAttachment(null);
    }
  }, [
    newAttachment,
    activeCard,
    board,
    getSourceList,
    listPosition,
    backendUpdate
  ]);

  const handleLoadingAttachment = loading => {
    setIsLoading(loading);
  };
  const handleRemoveCover = () => {
    setRemoveCover(true);
    handleLoadingAttachment(true);
  };

  useEffect(() => {
    if (!removeCover) return;

    const removeCardCover = async () => {
      const body = {
        cardId: activeCard.position,
        listId: listPosition,
        cardCover: ""
      };
      await requestCardCoverUpdate(body, id).then(res => {
        backendUpdate(res.data);
        setRemoveCover(false);
        handleLoadingAttachment(false);
        setActiveCardCover(null);
      });
    };
    removeCardCover();
  }, [
    activeCard,
    id,
    listPosition,
    backendUpdate,
    removeCover,
    setRemoveCover
  ]);

  const handleMakeCover = cover => {
    setIsLoading(true);
    setNewCover(cover);
  };

  useEffect(() => {
    if (!newCover) return;
    const body = {
      cardId: activeCard.position,
      listId: listPosition,
      cardCover: newCover
    };
    const attachCardCover = async () => {
      await requestCardCoverUpdate(body, id).then(res => {
        backendUpdate(res.data);
        setIsLoading(false);
        setNewCover(null);
        setActiveCardCover(newCover);
      });
    };
    attachCardCover();
  }, [activeCard, id, listPosition, backendUpdate, setNewCover, newCover]);

  useEffect(() => {
    if (newCover) return;
    setActiveCardCover(activeCard.cardCover);
  }, [activeCard, newCover]);

  const handleDeleteAttachment = imgUrl => {
    setDeleteAttachment(imgUrl);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!deleteAttachment) return;

    const removeAttachment = async () => {
      const body = {
        cardId: activeCard.position,
        listId: listPosition,
        deleteId: deleteAttachment
      };

      await requestDeleteAttachment(body, id).then(res => {
        backendUpdate(res.data);
        setIsLoading(false);
        if (activeCover.localeCompare(deleteAttachment) === 0) {
          setIsLoading(false);
          setNewCover(null);
          setRemoveCover(true);
        }

        setDeleteAttachment(null);
      });
    };
    removeAttachment();
  }, [
    activeCover,
    deleteAttachment,
    activeCard,
    id,
    listPosition,
    backendUpdate,
    newCover
  ]);

  return (
    <Modal
      className="card-detail-container"
      closeOnDocumentClick={true}
      centered={false}
      open={!hideCardDetail}
      closeOnRootNodeClick={false}
      onClose={() => handleCardClick()}
      closeIcon={
        <ButtonWrapper>
          <StyledIcon
            onClick={() => handleCardClick()}
            icon="delete"
            size="tiny"
          />
        </ButtonWrapper>
      }
    >
      <ModalImageCover
        cardCover={activeCover}
        handleCardClick={handleCardClick}
        isLoading={isLoading}
      />
      <ModalHeader
        title={activeCard.title}
        cardPosition={activeCard.position}
        listPosition={listPosition}
        sourceTitle={sourceTitle}
        cardCover={activeCard.cardCover}
      />

      <CardContent image>
        <LeftSideContent>
          <CardModalDescription
            board={board}
            backendUpdate={backendUpdate}
            listPosition={listPosition}
            getSourceList={getSourceList}
            activeCard={activeCard}
          />
          <Attachments
            activeCover={activeCover}
            card={activeCard}
            isLoading={isLoading}
            handleMakeCover={handleMakeCover}
            handleRemoveCover={handleRemoveCover}
            handleDeleteAttachment={handleDeleteAttachment}
          />
          {!auth.loading && (
            <CardActivities
              handleShowDetails={() => setHideActivities(!hideActivities)}
              hideActivities={hideActivities}
              board={board}
              user={auth.data.fname}
            />
          )}
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

export default withRouter(memo(CardDetailModal));
