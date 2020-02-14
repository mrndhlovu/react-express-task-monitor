import React, { useContext, useState } from "react";
import styled from "styled-components";

import CreateBoard from "../sharedComponents/CreateBoard";
import ListGrid from "./ListGrid";
import { BoardContext, AppContext } from "../../utils/contextUtils";

const StyledListContainer = styled.div`
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  vertical-align: top;
  height: 100vh;
`;

const BoardLists = () => {
  const { board, makeBoardUpdate, id } = useContext(BoardContext);
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

    makeBoardUpdate(board);
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

  function updateBoard(data) {
    return makeBoardUpdate(data);
  }

  function handleCreateCard(listId) {
    const sourceList = lists.filter(list => list.position === listId).shift();

    const newCard = {
      title: newCardName,
      position: sourceList.cards.length + 1
    };

    sourceList.cards.push(newCard);

    makeBoardUpdate(board);
    setActiveList("");
  }

  function handleOnChange(event) {
    setNewCardName(event.target.value);
  }

  function handleChangeCardList() {
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
  }

  function updateHoverIndex(index) {
    setHoverIndex(index);
  }

  function handleCardsReorder() {
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

  function handleCancelAddCard() {
    setActiveList("");
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

  function handleDrop() {
    const updatedList = {
      ...board,
      lists: update
    };
    makeBoardUpdate(updatedList);

    setDropTargetColumnId(undefined);
    setDraggingCardId(undefined);
    setSourceId(undefined);
    setReorderCards(false);
  }

  const getSourceList = id => lists.filter(list => list.position === id);

  const context = {
    activeList,
    boardId: id,
    dragging,
    draggingCardId,
    board,
    getFilteredBoard,
    getSourceList,
    handleAddCardName,
    handleCancelAddCard,
    handleCreateCard,
    handleOnChange,
    handleStartDrag,
    lists: lists,
    newCardName,
    showAddCardInput,
    updateHoverIndex,
    updateBoard
  };

  return (
    <AppContext.Provider value={context}>
      <StyledListContainer>
        <ListGrid
          draggingList={draggingList}
          handleChangeCardList={handleChangeCardList}
          handleDrop={handleDrop}
          reOrderList={reOrderList}
          sourceId={sourceId}
          updateDragOption={updateDragOption}
          updateDropTargetId={updateDropTargetId}
          updateSourceId={updateSourceId}
          reorderCards={reorderCards}
          handleCardsReorder={handleCardsReorder}
        />

        <CreateBoard
          buttonText="Create List"
          placeholder="Enter new list title..."
          ctaText="Add another list"
          handleAddList={() => setShowInputField(!showInputField)}
          showInputField={showInputField}
          handleChange={handleAddList}
          handleCreateClick={handleCreateList}
        />
      </StyledListContainer>
    </AppContext.Provider>
  );
};

export default BoardLists;
