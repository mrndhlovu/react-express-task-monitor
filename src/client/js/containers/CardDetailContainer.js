import React, { useState, memo, useCallback } from "react";
import { withRouter } from "react-router-dom";

import { findArrayItem } from "../utils/appUtils";
import { requestCardUpdate } from "../apis/apiRequests";

import { useBoardListContext, useBoardContext } from "../utils/hookUtils";
import CardDetailModal from "../components/cardDetail/CardDetailModal";
import { CardDetailContext } from "../utils/contextUtils";

const CardDetailContainer = ({ listId, match, history, modalOpen }) => {
  const { activeCard, board, handleBoardUpdate } = useBoardListContext();

  const { saveBoardChanges } = useBoardContext();
  const { id } = match.params;

  const [card, setCard] = useState(activeCard);
  const [hideActivities, setHideActivities] = useState(true);
  const [isLoading, setIsLoading] = useState("");
  const [sourceId, setSourceId] = useState(listId);

  const hasLabel = card && card.labels.length !== 0;
  const hasChecklist = card && card.checklists.length !== 0;
  const hasMembers = board && board.members.length !== 0;
  const hasCover = card && card.cardCover !== "";
  const hasDueDate = card && card.dueDate.date;
  const hasAttachments = card && card.attachments.length !== 0;
  const sourceList = findArrayItem(board.lists, sourceId, "_id");
  const sourceIndex = board.lists.indexOf(sourceList);
  const cardIndex = sourceList.cards.indexOf(activeCard);

  const portalRoot = document.getElementById("portal");

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

  const updatedCardChanges = (updatedCard) => {
    sourceList.cards.splice(cardIndex, 1, updatedCard);
    updateLists();
  };

  const updateLists = (newBoard) => {
    board.lists.splice(sourceIndex, 1, sourceList);

    handleBoardUpdate(newBoard ? newBoard : board, "lists");
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
    <CardDetailContext.Provider
      value={{
        card,
        cardIndex,
        editAttachments,
        handleMakeCover,
        handleRemoveCover,
        hasAttachments,
        hasChecklist,
        hasCover,
        hasDueDate,
        hasLabel,
        hasMembers,
        hideActivities,
        history,
        id,
        isLoading,
        match,
        modalOpen,
        saveCardChanges,
        setHideActivities,
        setIsLoading,
        setSourceId,
        sourceId,
        sourceList,
        updatedCardChanges,
        board,
        portalRoot,
      }}
    >
      <CardDetailModal />
    </CardDetailContext.Provider>
  );
};

export default withRouter(memo(CardDetailContainer));
