import React, { useState, memo, useCallback } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { findArrayItem } from "../utils/appUtils";

import { CardDetailContext } from "../utils/contextUtils";
import { useBoardListContext, useBoardContext } from "../utils/hookUtils";
import CardDetailModal from "../components/cardDetail/CardDetailModal";

const CardDetailContainer = ({ listId, match, history, modalOpen }) => {
  const { activeCard } = useBoardListContext();
  const {
    board,
    boardUpdateHandler,
    cardUpdateRequestHandler,
  } = useBoardContext();

  const { id } = match.params;

  const [card, setCard] = useState(activeCard);
  const [hideActivities, setHideActivities] = useState(true);
  const [isLoading, setIsLoading] = useState("");
  const [sourceId, setSourceId] = useState(listId);
  const sourceList = findArrayItem(board.lists, sourceId, "_id");

  const cardIndex = sourceList.cards.indexOf(activeCard);
  const hasAttachments = card && card.attachments.length !== 0;
  const hasChecklist = card && card.checklists.length !== 0;
  const hasCover = card && card.cardCover !== "";
  const hasDueDate = card && card.dueDate.date;
  const hasLabel = card && card.labels.length !== 0;
  const hasMembers = board && board.members.length !== 0;
  const sourceIndex = board.lists.indexOf(sourceList);

  const saveCardChanges = (changes) => setCard(changes);

  const handleMakeCover = async (cover) => {
    setIsLoading("cover");

    cardUpdateRequestHandler({ ...card, sourceId, cardCover: cover }, () => {
      saveCardChanges({ ...card, cardCover: cover });
      setIsLoading("");
    });
  };

  const updatedCardChanges = (updatedCard) => {
    sourceList.cards.splice(cardIndex, 1, updatedCard);
    updateLists();
  };

  const updateLists = (newBoard) => {
    board.lists.splice(sourceIndex, 1, sourceList);

    boardUpdateHandler(newBoard ? newBoard : board);
  };

  const editAttachments = useCallback(
    (attachment, callback, remove) => {
      const attachmentIndex = card.attachments.indexOf(attachment);
      setIsLoading("attachment");

      if (remove) card.attachments.splice(attachmentIndex, 1);
      else card.attachments.push(attachment);

      const cardIndex = sourceList.cards.indexOf(card);
      const sourceIndex = board.lists.indexOf(sourceList);

      sourceList.cards.splice(cardIndex, 1, card);
      board.lists.splice(sourceIndex, 1, sourceList);

      boardUpdateHandler(board);
      setIsLoading("");

      return callback && callback();
    },
    [card, board, sourceId, boardUpdateHandler]
  );

  const handleRemoveCover = async () => {
    setIsLoading("cover");

    cardUpdateRequestHandler({ ...card, cardCover: "" }, sourceId, () => {
      saveCardChanges({ ...card, cardCover: "" });
      setIsLoading("");
    });
  };

  const context = {
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
  };

  return (
    <CardDetailContext.Provider value={context}>
      <CardDetailModal />
    </CardDetailContext.Provider>
  );
};

CardDetailContainer.propTypes = {
  context: PropTypes.shape({
    card: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
    cardIndex: PropTypes.number.isRequired,
    editAttachments: PropTypes.func.isRequired,
    handleMakeCover: PropTypes.func.isRequired,
    handleRemoveCover: PropTypes.func.isRequired,
    hasAttachments: PropTypes.bool.isRequired,
    hasChecklist: PropTypes.bool.isRequired,
    hasCover: PropTypes.bool.isRequired,
    hasDueDate: PropTypes.bool.isRequired,
    hasLabel: PropTypes.bool.isRequired,
    hasMembers: PropTypes.bool.isRequired,
    hideActivities: PropTypes.bool.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
    }).isRequired,
    modalOpen: PropTypes.bool.isRequired,
    saveCardChanges: PropTypes.func.isRequired,
    setHideActivities: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    setSourceId: PropTypes.func.isRequired,
    sourceId: PropTypes.string.isRequired,
    sourceList: PropTypes.shape({ _id: PropTypes.string.isRequired })
      .isRequired,
    updatedCardChanges: PropTypes.func.isRequired,
  }),
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

export default withRouter(memo(CardDetailContainer));
