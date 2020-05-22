import React, {
  useContext,
  useState,
  memo,
  useCallback,
  Suspense,
  lazy,
} from "react";
import { withRouter } from "react-router-dom";

import { Modal, Button, Grid } from "semantic-ui-react";

import {
  BoardListsContext,
  MainContext,
  BoardContext,
} from "../../utils/contextUtils";
import { findArrayItem, stringsEqual } from "../../utils/appUtils";
import { requestCardUpdate } from "../../apis/apiRequests";

import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import CardLabels from "./CardLabels";
import CheckLists from "./CheckLists";
import { useAuth, useAlert } from "../../utils/hookUtils";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import AddAttachment from "./AddAttachment";
import UIWrapper from "../sharedComponents/UIWrapper";

const Attachments = lazy(() => import("./Attachments"));
const CardModalActivities = lazy(() => import("./CardModalActivities"));
const CardModalDescription = lazy(() => import("./CardModalDescription"));
const CardModalSidebar = lazy(() => import("./CardModalSidebar"));
const DueDate = lazy(() => import("./DueDate"));
const ModalHeader = lazy(() => import("./ModalHeader"));
const ModalImageCover = lazy(() => import("./ModalImageCover"));

const CardDetailModal = ({ listId, match, modalOpen, history }) => {
  const {
    activeCard,
    board,
    getSourceList,
    handleBoardUpdate,
    handleCardClick,
    handleUploadAttachment,
  } = useContext(BoardListsContext);
  const { saveBoardChanges } = useContext(BoardContext);
  const { user } = useAuth();
  const { device } = useContext(MainContext);
  const { notify } = useAlert();
  const { id } = match.params;

  const [card, setCard] = useState(activeCard);
  const [hideActivities, setHideActivities] = useState(true);
  const [isLoading, setIsLoading] = useState("");
  const [sourceId, setSourceId] = useState(listId);

  const hasLabel = card && card.labels.length !== 0;
  const hasChecklist = card && card.checklists.length !== 0;
  const hasMembers = board && board.members.length !== 0;
  const hasCover = card && card.cardCover !== "";
  const hasAttachments = card && card.attachments.length !== 0;

  const sourceList = findArrayItem(board.lists, sourceId, "_id");

  const saveCardChanges = (changes) => setCard(changes);

  const handleMakeCover = async (cover) => {
    setIsLoading("cover");
    let newCard = { ...card, cardCover: cover };

    const body = {
      newCard,
      listId: sourceId,
    };

    await requestCardUpdate(body, id).then((res) => {
      saveCardChanges(newCard);
      saveBoardChanges(res.data);
      setIsLoading("");
    });
  };

  const editAttachments = useCallback(
    (attachment, callback, remove) => {
      const attachmentIndex = card.attachments.indexOf(attachment);
      setIsLoading("attachment");

      if (remove) {
        card.attachments.splice(attachmentIndex, 1);
      } else card.attachments.push(attachment);

      const cardIndex = sourceList.cards.indexOf(card);
      const sourceIndex = board.lists.indexOf(sourceList);

      sourceList.cards.splice(cardIndex, 1, card);
      board.lists.splice(sourceIndex, 1, sourceList);

      handleBoardUpdate(board, "lists", "addAttachment");
      setIsLoading("");

      return callback && callback();
    },
    [card, board, sourceId, handleBoardUpdate]
  );

  const handleRemoveCover = async () => {
    setIsLoading("cover");

    const body = {
      cardId: card._id,
      listId: sourceId,
      newCard: { ...card, cardCover: "" },
    };
    await requestCardUpdate(body, id).then((res) => {
      saveCardChanges({ ...card, cardCover: "" });
      saveBoardChanges(res.data);

      setIsLoading("");
    });
  };

  return (
    <Modal
      className="card-detail-container"
      closeOnDocumentClick={true}
      centered={false}
      open={card && modalOpen}
      closeOnRootNodeClick={false}
      closeIcon={
        <Button
          onClick={() => handleCardClick()}
          icon="delete"
          size="tiny"
          className="close-modal-icon"
        />
      }
    >
      <Suspense fallback={<UILoadingSpinner />}>
        <ModalImageCover
          activeCard={card}
          cardCover={card.cardCover}
          handleCardClick={handleCardClick}
          hasCover={hasCover}
          id={id}
          isLoading={stringsEqual(isLoading, "cover")}
          sourceId={sourceId}
          saveCardChanges={saveCardChanges}
          saveBoardChanges={saveBoardChanges}
          handleRemoveCover={handleRemoveCover}
          handleMakeCover={handleMakeCover}
        />

        <UIWrapper>
          <ModalHeader
            title={card.title}
            cardPosition={card._id}
            sourceId={sourceId}
            sourceTitle={sourceList.title}
            cardCover={card.cardCover}
            originalBoard={board}
            originalCard={card}
            history={history}
            handleBoardUpdate={handleBoardUpdate}
            setSourceId={setSourceId}
          />

          <Grid columns={2} divided stackable>
            <Grid.Row stretched>
              <Grid.Column width={12}>
                <Modal.Content image>
                  <Modal.Description>
                    {card.dueDate && card.dueDate.date && (
                      <DueDate
                        activeCard={card}
                        handleBoardUpdate={handleBoardUpdate}
                        getSourceList={getSourceList}
                        sourceId={sourceId}
                        board={board}
                        saveCardChanges={saveCardChanges}
                      />
                    )}

                    {hasLabel && (
                      <CardLabels
                        board={board}
                        handleBoardUpdate={handleBoardUpdate}
                        activeCard={card}
                        sourceId={sourceId}
                        getSourceList={getSourceList}
                      />
                    )}

                    <CardModalDescription
                      board={board}
                      handleBoardUpdate={handleBoardUpdate}
                      sourceId={sourceId}
                      getSourceList={getSourceList}
                      activeCard={card}
                    />
                    {hasChecklist &&
                      card.checklists.map((list, index) => (
                        <CheckLists
                          key={list._id}
                          activeCard={card}
                          checklistName={list.name}
                          checkItem={list}
                          handleBoardUpdate={handleBoardUpdate}
                          board={board}
                          getSourceList={getSourceList}
                          sourceId={sourceId}
                          match={match}
                          saveBoardChanges={saveBoardChanges}
                          saveCardChanges={saveCardChanges}
                          mobile={device.mobile}
                          id={id}
                          listIndex={index}
                        />
                      ))}
                    <CardDetailSegment>
                      <>
                        <div className="div-flex">
                          <CardDetailHeader
                            icon="attach"
                            description="Attachments"
                          />
                        </div>

                        {hasAttachments &&
                          card.attachments.map((attachment, index) => (
                            <Attachments
                              key={index}
                              activeCover={card.cardCover}
                              attachment={attachment}
                              handleMakeCover={handleMakeCover}
                              handleRemoveCover={handleRemoveCover}
                              editAttachments={editAttachments}
                              history={history}
                            />
                          ))}
                        {stringsEqual(isLoading, "attachment") && (
                          <UIWrapper className="loading-attachment-placeholder">
                            Loading...
                          </UIWrapper>
                        )}
                        {hasAttachments && (
                          <AddAttachment
                            activeCard={card}
                            buttonText="Add an attachment"
                            compact={false}
                            direction="right"
                            editAttachments={editAttachments}
                            fluid={false}
                            handleLoadingAttachment={setIsLoading}
                            icon=""
                            id={id}
                            labeled={false}
                            mobile={device.mobile}
                            saveBoardChanges={saveBoardChanges}
                            saveCardChanges={saveCardChanges}
                            sourceId={sourceId}
                          />
                        )}
                      </>
                    </CardDetailSegment>

                    <CardModalActivities
                      activeCard={card}
                      handleBoardUpdate={handleBoardUpdate}
                      board={board}
                      getSourceList={getSourceList}
                      handleShowDetails={() =>
                        setHideActivities(!hideActivities)
                      }
                      hideActivities={hideActivities}
                      id={id}
                      sourceId={sourceId}
                      saveCardChanges={saveCardChanges}
                      user={user.fname}
                    />
                  </Modal.Description>
                </Modal.Content>
              </Grid.Column>
              <Grid.Column width={4}>
                <CardModalSidebar
                  activeCard={card}
                  editAttachments={editAttachments}
                  board={board}
                  boardMembers={board.members}
                  getSourceList={getSourceList}
                  handleBoardUpdate={handleBoardUpdate}
                  handleLoadingAttachment={setIsLoading}
                  handleMakeCover={handleMakeCover}
                  handleRemoveCover={handleRemoveCover}
                  handleUploadAttachment={handleUploadAttachment}
                  hasChecklist={hasChecklist}
                  hasCover={hasCover}
                  hasDueDate={card.dueDate && card.dueDate.date}
                  hasMembers={hasMembers}
                  sourceId={sourceId}
                  mobile={device.mobile}
                  saveBoardChanges={saveBoardChanges}
                  saveCardChanges={saveCardChanges}
                  id={id}
                  history={history}
                  notify={notify}
                  setSourceId={setSourceId}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </UIWrapper>
      </Suspense>
    </Modal>
  );
};

export default withRouter(memo(CardDetailModal));
