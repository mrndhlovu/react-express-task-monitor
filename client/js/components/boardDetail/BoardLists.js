import React, { useContext, useState, lazy, Suspense } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import {
  BoardContext,
  BoardListsContext,
  MainContext,
} from "../../utils/contextUtils";

import CreateItemForm from "../sharedComponents/CreateItemForm";
import ListGrid from "./ListGrid";
import { parseSearchQuery, getQueryString } from "../../utils/urls";
import { findArrayItem, updatedPosition } from "../../utils/appUtils";

const CardDetailModal = lazy(() => import("../cardDetail/CardDetailModal"));

const StyledListContainer = styled.div`
  display: flex;
  vertical-align: top;
  overflow-x: auto;
  overflow-y: hidden;
`;

const BoardLists = ({ history }) => {
  const { board, handleBoardUpdate, id } = useContext(BoardContext);
  const { mobile } = useContext(MainContext).device;

  const { lists } = board;
  const modalOpen = parseSearchQuery(getQueryString(history.location))[
    "modal-open"
  ];
  const hasLists = lists.length !== 0;

  const [activeList, setActiveList] = useState("");
  const [draggingCardId, setDraggingCardId] = useState("");
  const [draggingList, setDraggingList] = useState(false);
  const [dropTargetId, setDropTargetId] = useState({
    listId: null,
    cardId: null,
  });

  const [newCardName, setNewCardName] = useState("");
  const [newListName, setNewListName] = useState("");
  const [reorderCards, setReorderCards] = useState(false);
  const [showAddCardInput, setShowAddCardInput] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const [sourceId, setSourceId] = useState(undefined);
  const [update, setUpdate] = useState("");
  const [hideCardDetail, setHideCardDetail] = useState(true);
  const [activeCard, setActiveCard] = useState(false);
  const [sourceTitle, setSourceTitle] = useState("");
  const [activity, setActivity] = useState(null);

  const getSourceList = (id) => findArrayItem(lists, id);
  const handleAddList = (event) => setNewListName(event.target.value);
  const handleOnChange = (event) => setNewCardName(event.target.value);
  const updateDragOption = () => setDraggingList(!draggingList);

  const updateSourceId = (id) => setSourceId(id);

  const handleCreateList = () => {
    const newList = {
      title: newListName,
      cards: [],
      position: lists.length + 1,
    };

    lists.push(newList);

    updateBoard(board, "newList");
    setShowInputField(!showInputField);
  };

  const handleAddCardName = (listId) => {
    setShowAddCardInput(true);
    setActiveList(listId);
  };

  const getFilteredBoard = (filterId) => {
    return {
      ...board,
      lists: [...lists.filter((list) => list.position !== filterId)],
    };
  };

  const updateBoard = (data, action) => {
    setUpdate(data.lists);
    handleBoardUpdate(data, "lists", activity || action);
    setActivity(null);
  };

  const handleMoveCardToNewList = () => {
    const sourceList = getSourceList(sourceId).shift();

    const dropTargetList = findArrayItem(lists, dropTargetId.listId).shift();
    const draggingCard = findArrayItem(
      sourceList.cards,
      draggingCardId
    ).shift();

    sourceList.cards.splice(sourceList.cards.indexOf(draggingCard), 1);
    const sourceListCards = updatedPosition(sourceList.cards);
    const updatedSourceList = {
      ...sourceList,
      cards: sourceListCards,
    };
    lists.splice(sourceId - 1, 1, updatedSourceList);

    dropTargetList.cards.splice(dropTargetId.cardId - 1, 0, draggingCard);

    const dropTargetCards = updatedPosition(dropTargetList.cards);
    const updatedDropTarget = { ...dropTargetList, cards: dropTargetCards };

    lists.splice(dropTargetId.listId - 1, 1, updatedDropTarget);

    setUpdate(lists);
    setActivity("movedCard");
  };

  const moveCardToNewPosition = () => {
    const sourceList = getSourceList(sourceId).shift();

    const draggingCard = findArrayItem(
      sourceList.cards,
      draggingCardId
    ).shift();

    sourceList.cards.splice(draggingCardId - 1, 1);
    sourceList.cards.splice(dropTargetId.cardId - 1, 0, draggingCard);

    const updatedCards = updatedPosition(sourceList.cards);
    const updateList = { ...sourceList, cards: updatedCards };
    lists.splice(sourceId - 1, 1, updateList);

    setUpdate(lists);
    setDraggingCardId(draggingCardId);
  };

  const updateDropTargetId = (listId, cardId) => {
    listId && setDropTargetId({ ...dropTargetId, listId });
    cardId && setDropTargetId({ ...dropTargetId, cardId });

    if (dropTargetId.listId === sourceId) setReorderCards(true);
    else setReorderCards(false);
  };

  const handleStartDrag = (id, cardId) => {
    setDraggingCardId(cardId);
    updateSourceId(id);
    updateDropTargetId(id, cardId);
  };

  const reOrderList = () => {
    const sourceList = getSourceList(sourceId).shift();
    lists.splice(sourceId - 1, 1);
    lists.splice(dropTargetId.listId - 1, 0, sourceList);

    const updatedList = updatedPosition(lists);
    setUpdate(updatedList);
  };

  const handleCardClick = (card, sourceId, listTitle) => {
    const { pathname } = history.location;

    if (sourceId) {
      setActiveCard(card);
      setSourceId(sourceId);
      setSourceTitle(listTitle);
    }
    setHideCardDetail(!hideCardDetail);
    if (!hideCardDetail) return history.push(`${pathname}?modal-open=false`);
    history.push(`${pathname}?modal-open=true`);
  };

  const handleDrop = () => {
    const isValidData = update[0];
    const updatedList = {
      ...board,
      lists: isValidData ? update : lists,
    };
    isValidData && updateBoard(updatedList);

    setDropTargetId({ ...dropTargetId, listId: null, cardId: null });
    setDraggingCardId(undefined);
    setSourceId(undefined);
    setReorderCards(false);
  };

  const context = {
    activeCard,
    activeList,
    board,
    boardId: id,
    closeAddCardOption: () => setActiveList(""),
    draggingCardId,
    getFilteredBoard,
    getSourceList,
    handleAddCardName,
    handleBoardUpdate,
    handleCardClick,
    handleOnChange,
    handleStartDrag,
    hideCardDetail,
    lists,
    mobile,
    newCardName,
    showAddCardInput,
    sourceTitle,
    updateBoard,
  };

  return (
    <BoardListsContext.Provider value={context}>
      <StyledListContainer className="lists-container">
        <ListGrid
          draggingList={draggingList}
          handleMoveCardToNewList={handleMoveCardToNewList}
          handleDrop={handleDrop}
          reOrderList={reOrderList}
          sourceId={sourceId}
          updateDragOption={updateDragOption}
          updateDropTargetId={updateDropTargetId}
          updateSourceId={updateSourceId}
          reorderCards={reorderCards}
          moveCardToNewPosition={moveCardToNewPosition}
          getSourceList={getSourceList}
        />

        <CreateItemForm
          buttonText="Create List"
          placeholder="Enter new list title..."
          ctaText={hasLists ? "Add another list" : "Add a list"}
          handleAddList={() => setShowInputField(!showInputField)}
          showInputField={showInputField}
          handleChange={handleAddList}
          handleCreateClick={handleCreateList}
        />

        {modalOpen && !hideCardDetail && (
          <Suspense fallback={<div>Loading...</div>}>
            <CardDetailModal
              listPosition={sourceId}
              history={history}
              modalOpen={modalOpen}
            />
          </Suspense>
        )}
      </StyledListContainer>
    </BoardListsContext.Provider>
  );
};

export default withRouter(BoardLists);