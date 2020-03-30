import React, {
  useContext,
  useState,
  useEffect,
  memo,
  useCallback
} from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Modal, Button, Grid } from "semantic-ui-react";

import { BoardListsContext, AppContext } from "../../utils/contextUtils";
import { checkDuplicate, emptyFunction } from "../../utils/appUtils";
import {
  requestCardCoverUpdate,
  requestDeleteAttachment
} from "../../apis/apiRequests";
import Attachments from "./Attachments";
import CardModalActivities from "./CardModalActivities";
import CardModalDescription from "./CardModalDescription";
import CardModalSidebar from "./CardModalSidebar";
import ModalHeader from "./ModalHeader";
import ModalImageCover from "./ModalImageCover";
import CardLabels from "./CardLabels";

const ModalContent = styled(Modal.Content)``;

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

  const [activeCover, setActiveCardCover] = useState(null);
  const [deleteAttachment, setDeleteAttachment] = useState(null);
  const [hideActivities, setHideActivities] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [newAttachment, setNewAttachment] = useState(null);
  const [newCover, setNewCover] = useState(null);
  const [removeCover, setRemoveCover] = useState(false);
  const { id } = match.params;

  const addCardAttachment = useCallback(
    attachment => {
      const duplicate = checkDuplicate(
        activeCard.attachments.images,
        attachment.imgUrl
      );
      if (!duplicate) {
        let newBoard;
        activeCard.attachments.images.push(attachment);

        newBoard = {
          ...board,
          lists: board.lists.map(list =>
            list.position === listPosition
              ? {
                  ...list,
                  cards: list.cards.map(card =>
                    card.position === activeCard.position
                      ? {
                          ...card,
                          attachments: { ...activeCard.attachments },
                          cardCover: attachment.imgUrl
                        }
                      : { ...card }
                  )
                }
              : { ...list }
          )
        };
        setNewAttachment(newBoard);
        setNewCover(attachment.imgUrl);
      }
    },
    [activeCard, board, listPosition]
  );

  useEffect(() => {
    if (!newAttachment) return emptyFunction();

    backendUpdate(newAttachment, "lists", "addAttachment");
    setNewAttachment(false);
  }, [backendUpdate, newAttachment]);

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
    if (!newCover) return emptyFunction();
    const body = {
      cardId: activeCard.position,
      listId: listPosition,
      cardCover: newCover
    };
    const attachCardCover = async () => {
      await requestCardCoverUpdate(body, id).then(res => {
        setIsLoading(false);

        setActiveCardCover(newCover);
      });
    };
    attachCardCover();
    setNewCover(null);
  }, [
    activeCard,
    id,
    listPosition,
    backendUpdate,
    setNewCover,
    newCover,
    newAttachment
  ]);

  useEffect(() => {
    if (newCover) return;
    setActiveCardCover(activeCard.cardCover);
  }, [activeCard, newCover]);

  const handleDeleteAttachment = imgUrl => {
    setDeleteAttachment(imgUrl);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!deleteAttachment) return emptyFunction();

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
      <Grid columns={2} divided stackable>
        <Grid.Row stretched>
          <Grid.Column width={12}>
            <ModalContent image>
              <LeftSideContent>
                <CardLabels
                  board={board}
                  backendUpdate={backendUpdate}
                  colors={board.labels}
                />
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

                <CardModalActivities
                  handleShowDetails={() => setHideActivities(!hideActivities)}
                  hideActivities={hideActivities}
                  board={board}
                  user={auth.user.fname}
                />
              </LeftSideContent>
            </ModalContent>
          </Grid.Column>
          <Grid.Column width={4}>
            <CardModalSidebar
              addCardAttachment={addCardAttachment}
              handleUploadAttachment={handleUploadAttachment}
              handleLoadingAttachment={handleLoadingAttachment}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Modal>
  );
};

export default withRouter(memo(CardDetailModal));
