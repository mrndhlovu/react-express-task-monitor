import React, { useContext, useState } from "react";
import styled from "styled-components";

import CreateItemForm from "../sharedComponents/CreateItemForm";
import ListGrid from "./ListGrid";
import { BoardContext, BoardListsContext } from "../../utils/contextUtils";
import CardDetailModal from "../cardDetail/CardDetailModal";

const StyledListContainer = styled.div`
  display: flex;
  vertical-align: top;
  overflow-x: auto;
  overflow-y: hidden;
`;

const BoardLists = () => {
  const { board, backendUpdate, id } = useContext(BoardContext);
  const { lists } = board;

  const [activeList, setActiveList] = useState("");
  const [dragging, setDragging] = useState(false);
  const [draggingCardId, setDraggingCardId] = useState("");
  const [draggingList, setDraggingList] = useState(false);
  const [dropTargetId, setDropTargetColumnId] = useState(undefined);
  const [hoverIndex, setHoverIndex] = useState("");
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

  function handleAddList(event) {
    setNewListName(event.target.value);
  }

  function handleCreateList() {
    const newList = {
      title: newListName,
      cards: [],
      position: lists.length + 1
    };

    lists.push(newList);

    updateBoard(board, "newList");
    setShowInputField(!showInputField);
  }

  function handleAddCardName(listId) {
    setShowAddCardInput(true);
    setActiveList(listId);
  }

  function getFilteredBoard(filterId) {
    return {
      ...board,
      lists: [...lists.filter(list => list.position !== filterId)]
    };
  }

  const updateBoard = (data, action) => {
    setUpdate(data.lists);
    backendUpdate(data, "lists", activity || action);
    setActivity(null);
  };

  function handleOnChange(event) {
    setNewCardName(event.target.value);
  }

  function handleMoveCardToNewList() {
    const newCards = [];
    let newList;
    let updatedSourceList;

    const dropTargetLists = lists.filter(list => list.position !== sourceId);
    const sourceList = getSourceList(sourceId).shift();

    const draggingCard = sourceList.cards.find(
      card => card.position === draggingCardId
    );

    sourceList.cards
      .filter(card => card.position !== draggingCardId)
      .forEach((obj, index) => newCards.push({ ...obj, position: index + 1 }));

    updatedSourceList = {
      ...sourceList,
      cards: newCards
    };

    dropTargetLists.find(
      list =>
        list.position === dropTargetId &&
        list.cards.push({
          ...draggingCard,
          position: list.cards.length + 1
        })
    );

    newList = [updatedSourceList, ...dropTargetLists].sort(
      (a, b) => a.position - b.position
    );

    setUpdate(newList);
    setActivity("movedCard");
  }

  function updateHoverIndex(index) {
    setHoverIndex(index);
  }

  function moveCardToNewPosition() {
    const sourceList = getSourceList(sourceId).shift();

    const newList = lists.filter(list => list.position !== sourceId);

    let adjustedCardPositions = [];

    sourceList.cards.filter(card => {
      const newCard = {
        ...card,
        position:
          card.position === draggingCardId
            ? hoverIndex
            : card.position === hoverIndex
            ? draggingCardId
            : card.position
      };
      return adjustedCardPositions.push(newCard);
    });

    adjustedCardPositions.sort((a, b) => a.position - b.position);

    const updatedSourceList = { ...sourceList, cards: adjustedCardPositions };

    newList.push(updatedSourceList);
    newList.sort((a, b) => a.position - b.position);

    setUpdate(newList);
    setDraggingCardId(draggingCardId);
  }

  function updateDropTargetId(id) {
    setDropTargetColumnId(id);
    updateHoverIndex(id);
    if (dropTargetId === sourceId) setReorderCards(true);
    else setReorderCards(false);
  }

  function updateSourceId(id) {
    setSourceId(id);
  }

  function handleStartDrag(id, cardId) {
    setDraggingCardId(cardId);
    setDragging(true);
    updateSourceId(id);
    updateDropTargetId(id);
  }

  function updateDragOption() {
    setDraggingList(!draggingList);
  }

  function reOrderList() {
    let updatedList = [];

    const dropTargetList = lists
      .filter(list => list.position === dropTargetId)
      .map(obj => ({ ...obj, position: sourceId }))
      .shift();

    const draggingList = lists
      .filter(list => list.position === sourceId)
      .map(obj => ({ ...obj, position: dropTargetId }))
      .shift();

    let newList = lists.filter(
      list => list.position !== sourceId && list.position !== dropTargetId
    );

    updatedList.push(draggingList, dropTargetList, ...newList);

    updatedList.sort((a, b) => a.position - b.position);

    setUpdate(updatedList);
  }

  const handleCardClick = (card, sourceId, listTitle) => {
    if (sourceId) {
      setActiveCard(card);
      setSourceId(sourceId);
      setSourceTitle(listTitle);
    }
    setHideCardDetail(!hideCardDetail);
  };

  const handleDrop = () => {
    const updatedList = {
      ...board,
      lists: update
    };
    updateBoard(updatedList);

    setDropTargetColumnId(undefined);
    setDraggingCardId(undefined);
    setSourceId(undefined);
    setReorderCards(false);
  };

  const getSourceList = id => lists.filter(list => list.position === id);

  const context = {
    activeCard,
    activeList,
    board,
    boardId: id,
    closeAddCardOption: () => setActiveList(""),
    dragging,
    draggingCardId,
    getFilteredBoard,
    getSourceList,
    handleAddCardName,
    handleCardClick,
    handleOnChange,
    handleStartDrag,
    hideCardDetail,
    lists,
    backendUpdate,
    newCardName,
    showAddCardInput,
    sourceTitle,
    updateBoard,
    updateHoverIndex
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
          ctaText="Add another list"
          handleAddList={() => setShowInputField(!showInputField)}
          showInputField={showInputField}
          handleChange={handleAddList}
          handleCreateClick={handleCreateList}
        />

        <CardDetailModal listPosition={sourceId} />
      </StyledListContainer>
    </BoardListsContext.Provider>
  );
};

export default BoardLists;
