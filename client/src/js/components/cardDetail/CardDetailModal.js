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

import {
  BoardListsContext,
  MainContext,
  BoardContext
} from "../../utils/contextUtils";
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
import CheckLists from "./CheckLists";
import DueDate from "./DueDate";

const ModalContent = styled(Modal.Content)``;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1000 !important;
`;

const LeftSideContent = styled(Modal.Description)``;

const Container = styled.div`
  padding: 25px;
`;

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
  const { saveBoardChanges } = useContext(BoardContext);
  const { auth, device } = useContext(MainContext);

  const [activeCover, setActiveCardCover] = useState(null);
  const [card, setCard] = useState(activeCard);
  const [checklist, setCheckList] = useState(false);
  const [deleteAttachment, setDeleteAttachment] = useState(null);
  const [hideActivities, setHideActivities] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [newAttachment, setNewAttachment] = useState(null);
  const [newCover, setNewCover] = useState(null);
  const [removeCover, setRemoveCover] = useState(false);
  const { id } = match.params;

  const hasLabel = card.labels.length !== 0;
  const hasChecklist = card.checklists.length !== 0;
  const hasDueDate = card.dueDate && card.dueDate.date;

  const saveCardChanges = changes => setCard(changes);

  const addCardAttachment = useCallback(
    attachment => {
      const duplicate = checkDuplicate(
        card.attachments.images,
        attachment.imgUrl
      );
      if (!duplicate) {
        let newBoard;
        card.attachments.images.push(attachment);

        newBoard = {
          ...board,
          lists: board.lists.map(list =>
            list.position === listPosition
              ? {
                  ...list,
                  cards: list.cards.map(cardItem =>
                    cardItem.position === card.position
                      ? {
                          ...cardItem,
                          attachments: { ...cardItem.attachments },
                          cardCover: attachment.imgUrl
                        }
                      : { ...cardItem }
                  )
                }
              : { ...list }
          )
        };
        setNewAttachment(newBoard);
        setNewCover(attachment.imgUrl);
      }
    },
    [card, board, listPosition]
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

  const handleCreateChecklist = () => setCheckList(true);

  useEffect(() => {
    if (!removeCover) return;

    const removeCardCover = async () => {
      const body = {
        cardId: card.position,
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
  }, [card, id, listPosition, backendUpdate, removeCover, setRemoveCover]);

  const handleMakeCover = cover => {
    setIsLoading(true);
    setNewCover(cover);
  };

  useEffect(() => {
    if (!newCover) return emptyFunction();
    const body = {
      cardId: card.position,
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
    card,
    id,
    listPosition,
    backendUpdate,
    setNewCover,
    newCover,
    newAttachment
  ]);

  useEffect(() => {
    if (newCover) return;
    setActiveCardCover(card.cardCover);
  }, [card, newCover]);

  const handleDeleteAttachment = imgUrl => {
    setDeleteAttachment(imgUrl);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!deleteAttachment) return emptyFunction();

    const removeAttachment = async () => {
      const body = {
        cardId: card.position,
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
    card,
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

      <Container>
        <ModalHeader
          title={card.title}
          cardPosition={card.position}
          listPosition={listPosition}
          sourceTitle={sourceTitle}
          cardCover={card.cardCover}
        />

        <Grid columns={2} divided stackable>
          <Grid.Row stretched>
            <Grid.Column width={12}>
              <ModalContent image>
                <LeftSideContent>
                  {hasDueDate && (
                    <DueDate
                      activeCard={card}
                      backendUpdate={backendUpdate}
                      getSourceList={getSourceList}
                      listPosition={listPosition}
                      board={board}
                      saveCardChanges={saveCardChanges}
                    />
                  )}
                  {hasLabel && (
                    <CardLabels
                      board={board}
                      backendUpdate={backendUpdate}
                      activeCard={card}
                      listPosition={listPosition}
                      getSourceList={getSourceList}
                    />
                  )}

                  <CardModalDescription
                    board={board}
                    backendUpdate={backendUpdate}
                    listPosition={listPosition}
                    getSourceList={getSourceList}
                    activeCard={card}
                  />
                  {(hasChecklist || checklist) && (
                    <CheckLists
                      activeCard={card}
                      backendUpdate={backendUpdate}
                      board={board}
                      getSourceList={getSourceList}
                      listPosition={listPosition}
                      match={match}
                      saveBoardChanges={saveBoardChanges}
                      saveCardChanges={saveCardChanges}
                    />
                  )}

                  <Attachments
                    activeCover={activeCover}
                    activeCard={card}
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
                activeCard={card}
                addCardAttachment={addCardAttachment}
                backendUpdate={backendUpdate}
                board={board}
                getSourceList={getSourceList}
                handleLoadingAttachment={handleLoadingAttachment}
                handleUploadAttachment={handleUploadAttachment}
                listPosition={listPosition}
                handleCreateChecklist={handleCreateChecklist}
                hasChecklist={hasChecklist}
                hasDueDate={hasDueDate}
                mobile={device.mobile}
                saveCardChanges={saveCardChanges}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Modal>
  );
};

export default withRouter(memo(CardDetailModal));
