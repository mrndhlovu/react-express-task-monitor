import React, {
  useContext,
  useState,
  useEffect,
  memo,
  useCallback,
  Suspense,
  lazy,
} from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Modal, Button, Grid } from "semantic-ui-react";

import {
  BoardListsContext,
  MainContext,
  BoardContext,
} from "../../utils/contextUtils";
import { checkDuplicate, emptyFunction } from "../../utils/appUtils";
import {
  requestCardUpdate,
  requestDeleteAttachment,
} from "../../apis/apiRequests";
import Attachments from "./Attachments";
import CardModalActivities from "./CardModalActivities";
import CardModalDescription from "./CardModalDescription";
import CardModalSidebar from "./CardModalSidebar";
import ModalHeader from "./ModalHeader";
import CardLabels from "./CardLabels";
import CheckLists from "./CheckLists";
const DueDate = lazy(() => import("./DueDate"));
const ModalImageCover = lazy(() => import("./ModalImageCover"));

const ModalContent = styled(Modal.Content)``;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
`;

const LeftSideContent = styled(Modal.Description)``;

const Container = styled.div`
  padding: 25px;
`;

const StyledIcon = styled(Button)`
  border-radius: 50px !important;
`;

const CardDetailModal = ({ listPosition, match, modalOpen }) => {
  const {
    handleCardClick,
    sourceTitle,
    board,
    handleBoardUpdate,
    getSourceList,
    activeCard,
    handleUploadAttachment,
  } = useContext(BoardListsContext);
  const { saveBoardChanges, auth } = useContext(BoardContext);
  const { device } = useContext(MainContext);
  const { id } = match.params;

  const [activeCover, setActiveCardCover] = useState(null);
  const [card, setCard] = useState(activeCard);
  const [checklist, setCheckList] = useState(false);
  const [deleteAttachment, setDeleteAttachment] = useState(null);
  const [hideActivities, setHideActivities] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [newAttachment, setNewAttachment] = useState(null);
  const [newCover, setNewCover] = useState(null);
  const [removeCover, setRemoveCover] = useState(false);

  const hasLabel = card && card.labels.length !== 0;
  const hasChecklist = card && card.checklists.length !== 0;
  const hasMembers = board && board.members.length !== 0;
  const hasCover = card && card.cardCover.localeCompare("") !== 0;

  const saveCardChanges = (changes) => setCard(changes);

  const handleCreateChecklist = () => setCheckList(true);

  const handleMakeCover = (coverUrl) => setNewCover(coverUrl);

  const handleDeleteAttachment = (imgUrl) => {
    setDeleteAttachment(imgUrl);
    setIsLoading(true);
  };

  const addCardAttachment = useCallback(
    (attachment) => {
      const duplicate = checkDuplicate(
        card.attachments.images,
        attachment.imgUrl
      );
      if (!duplicate) {
        let newBoard;
        card.attachments.images.push(attachment);

        newBoard = {
          ...board,
          lists: board.lists.map((list) =>
            list.position === listPosition
              ? {
                  ...list,
                  cards: list.cards.map((cardItem) =>
                    cardItem.position === card.position
                      ? {
                          ...cardItem,
                          attachments: { ...cardItem.attachments },
                          cardCover: attachment.imgUrl,
                        }
                      : { ...cardItem }
                  ),
                }
              : { ...list }
          ),
        };
        setNewAttachment(newBoard);
        setNewCover(attachment.imgUrl);
      }
    },
    [card, board, listPosition]
  );

  useEffect(() => {
    if (!newAttachment) return emptyFunction();

    handleBoardUpdate(newAttachment, "lists", "addAttachment");
    setNewAttachment(false);
  }, [handleBoardUpdate, newAttachment]);

  const handleLoadingAttachment = (loading) => {
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
        cardId: card.position,
        listId: listPosition,
        cardCover: "",
      };
      await requestCardUpdate(body, id).then((res) => {
        setCard({ ...card, cardCover: "" });
        saveBoardChanges(res.data);
        setRemoveCover(false);
        handleLoadingAttachment(false);
        setActiveCardCover(null);
      });
    };
    removeCardCover();
  }, [
    card,
    id,
    listPosition,
    handleBoardUpdate,
    removeCover,
    setRemoveCover,
    saveBoardChanges,
  ]);

  useEffect(() => {
    if (!newCover) return emptyFunction();

    const attachCardCover = async () => {
      let newCard = { ...card, cardCover: newCover };

      const body = {
        newCard,
        listId: listPosition,
      };

      await requestCardUpdate(body, id).then((res) => {
        setCard(newCard);
        saveBoardChanges(res.data);
        setActiveCardCover(newCard.cardCover);
      });
    };
    attachCardCover();
    return () => setNewCover(null);
  }, [
    card,
    id,
    listPosition,
    handleBoardUpdate,
    setNewCover,
    newCover,
    newAttachment,
    saveBoardChanges,
  ]);

  useEffect(() => {
    if (newCover) return;
    setActiveCardCover(card.cardCover);
  }, [card, newCover]);

  useEffect(() => {
    if (!deleteAttachment) return emptyFunction();

    const removeAttachment = async () => {
      const body = {
        cardId: card.position,
        listId: listPosition,
        deleteId: deleteAttachment,
      };

      await requestDeleteAttachment(body, id).then((res) => {
        handleBoardUpdate(res.data);
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
    handleBoardUpdate,
    newCover,
  ]);

  return (
    <Modal
      className="card-detail-container"
      closeOnDocumentClick={true}
      centered={false}
      open={card && modalOpen}
      closeOnRootNodeClick={false}
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
      <Suspense fallback={<div>Loading...</div>}>
        <ModalImageCover
          activeCard={card}
          cardCover={activeCover}
          handleCardClick={handleCardClick}
          hasCover={hasCover}
          id={id}
          isLoading={isLoading}
          listPosition={listPosition}
          saveCardChanges={saveCardChanges}
          saveBoardChanges={saveBoardChanges}
          handleRemoveCover={handleRemoveCover}
          handleMakeCover={handleMakeCover}
        />
      </Suspense>
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
                  <Suspense fallback={<div>Loading...</div>}>
                    {card.dueDate && card.dueDate.date && (
                      <DueDate
                        activeCard={card}
                        handleBoardUpdate={handleBoardUpdate}
                        getSourceList={getSourceList}
                        listPosition={listPosition}
                        board={board}
                        saveCardChanges={saveCardChanges}
                      />
                    )}
                  </Suspense>
                  {hasLabel && (
                    <CardLabels
                      board={board}
                      handleBoardUpdate={handleBoardUpdate}
                      activeCard={card}
                      listPosition={listPosition}
                      getSourceList={getSourceList}
                    />
                  )}

                  <CardModalDescription
                    board={board}
                    handleBoardUpdate={handleBoardUpdate}
                    listPosition={listPosition}
                    getSourceList={getSourceList}
                    activeCard={card}
                  />
                  {(hasChecklist || checklist) && (
                    <CheckLists
                      activeCard={card}
                      handleBoardUpdate={handleBoardUpdate}
                      board={board}
                      getSourceList={getSourceList}
                      listPosition={listPosition}
                      match={match}
                      saveBoardChanges={saveBoardChanges}
                      saveCardChanges={saveCardChanges}
                      mobile={device.mobile}
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
                    activeCard={card}
                    handleBoardUpdate={handleBoardUpdate}
                    board={board}
                    getSourceList={getSourceList}
                    handleShowDetails={() => setHideActivities(!hideActivities)}
                    hideActivities={hideActivities}
                    id={id}
                    listPosition={listPosition}
                    saveCardChanges={saveCardChanges}
                    user={auth.data.data.fname}
                  />
                </LeftSideContent>
              </ModalContent>
            </Grid.Column>
            <Grid.Column width={4}>
              <CardModalSidebar
                activeCard={card}
                addCardAttachment={addCardAttachment}
                board={board}
                boardMembers={board.members}
                getSourceList={getSourceList}
                handleBoardUpdate={handleBoardUpdate}
                handleCreateChecklist={handleCreateChecklist}
                handleLoadingAttachment={handleLoadingAttachment}
                handleMakeCover={handleMakeCover}
                handleRemoveCover={handleRemoveCover}
                handleUploadAttachment={handleUploadAttachment}
                hasChecklist={hasChecklist}
                hasCover={hasCover}
                hasDueDate={card.dueDate && card.dueDate.date}
                hasMembers={hasMembers}
                listPosition={listPosition}
                mobile={device.mobile}
                saveBoardChanges={saveBoardChanges}
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
