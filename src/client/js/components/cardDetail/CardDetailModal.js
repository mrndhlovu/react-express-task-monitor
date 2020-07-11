import React, { Suspense, lazy } from "react";

import { Grid } from "semantic-ui-react";

import { stringsEqual } from "../../utils/appUtils";
import {
  useAuth,
  useAlert,
  useCardDetailContext,
  useMainContext,
  useBoardListContext,
  useBoardContext,
} from "../../utils/hookUtils";
import AddAttachment from "./AddAttachment";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import CardLabels from "./CardLabels";
import CheckLists from "./CheckLists";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import UIWrapper from "../sharedComponents/UIWrapper";
import UIModal from "../sharedComponents/UIModal";

const Attachments = lazy(() => import("./Attachments"));
const CardModalActivities = lazy(() => import("./CardModalActivities"));
const CardModalDescription = lazy(() => import("./CardModalDescription"));
const CardModalSidebar = lazy(() => import("./CardModalSidebar"));
const DueDate = lazy(() => import("./DueDate"));
const ModalHeader = lazy(() => import("./ModalHeader"));
const ModalImageCover = lazy(() => import("./ModalImageCover"));

const CardDetailModal = () => {
  const {
    card,
    editAttachments,
    handleMakeCover,
    handleRemoveCover,
    hasAttachments,
    hasChecklist,
    hasCover,
    hasLabel,
    id,
    isLoading,
    match,
    modalOpen,
    saveCardChanges,
    setIsLoading,
    sourceId,
    sourceList,
    updatedChanges,
    setSourceId,
    setHideActivities,
    hideActivities,
    hasMembers,
  } = useCardDetailContext();

  const {
    board,
    getSourceList,
    handleBoardUpdate,
    handleCardClick,
    handleUploadAttachment,
  } = useBoardListContext();
  const { saveBoardChanges } = useBoardContext();
  const { user } = useAuth();
  const { device } = useMainContext();
  const { notify } = useAlert();

  const CARD_DETAIL_MODAL_STYLE = {
    top: "3%",
    left: "28%",
    bottom: "1%",
    padding: "0px",
    width: "45%",
    border: "none",
  };

  return (
    <UIModal
      isOpen={card && modalOpen}
      onClose={handleCardClick}
      closeIcon
      modalStyle={CARD_DETAIL_MODAL_STYLE}
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
          notify={notify}
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
                <div>
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
                  <>
                    <CardDetailHeader description="Attachments" />
                    <CardDetailSegment>
                      {hasAttachments &&
                        card.attachments.map((attachment, index) => (
                          <Attachments
                            attachment={attachment}
                            board={board}
                            editAttachments={editAttachments}
                            handleBoardUpdate={handleBoardUpdate}
                            handleMakeCover={handleMakeCover}
                            handleRemoveCover={handleRemoveCover}
                            history={history}
                            key={index}
                            attachmentIndex={index}
                            sourceId={sourceId}
                            activeCard={card}
                            updatedChanges={updatedChanges}
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
                    </CardDetailSegment>
                  </>

                  <CardModalActivities
                    activeCard={card}
                    handleBoardUpdate={handleBoardUpdate}
                    board={board}
                    getSourceList={getSourceList}
                    handleShowDetails={() => setHideActivities(!hideActivities)}
                    hideActivities={hideActivities}
                    id={id}
                    sourceId={sourceId}
                    saveCardChanges={saveCardChanges}
                    user={user.fname}
                  />
                </div>
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
    </UIModal>
  );
};

export default CardDetailModal;
