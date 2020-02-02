import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { filterObject } from "../../utils/appUtils";
import CreateBoard from "../sharedComponents/CreateBoard";
import ListGrid from "./ListGrid";
import { BoardContext, BoardListContext } from "../../utils/contextUtils";

const StyledListContainer = styled.div`
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  vertical-align: top;
`;

const BoardLists = () => {
  const { board, makeBoardUpdate } = useContext(BoardContext);
  const id = board.data._id;
  const allowed = ["title", "lists"];

  const [lists, setLists] = useState(board.data.lists);
  const [activeList, setActiveList] = useState("");
  const [dragging, setDragging] = useState(false);
  const [draggingCardId, setDraggingCardId] = useState("");
  const [dropTargetId, setDropTargetColumnId] = useState(undefined);
  const [hoverIndex, setHoverIndex] = useState("");
  const [newCardName, setNewCardName] = useState("");
  const [newListName, setNewListName] = useState("");
  const [showAddCardInput, setShowAddCardInput] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const [sourceId, setSourceId] = useState(undefined);
  const [draggingList, setDraggingList] = useState(false);

  function handleAddList(event) {
    setNewListName(event.target.value);
  }

  function handleCreateList() {
    const copyBoard = { ...board.data };

    const data = {
      title: newListName,

      cards: [],
      position: copyBoard.lists.length + 1
    };

    copyBoard.lists.push(data);

    const filtered = filterObject(copyBoard, allowed);

    makeBoardUpdate(id, filtered);
  }

  function handleAddCardName(listId) {
    setShowAddCardInput(true);
    setActiveList(listId);
  }

  function handleCreateCard(listId) {
    const sourceList = lists.filter(list => list.position === listId).shift();

    const newCard = {
      title: newCardName,
      position: sourceList.cards.length + 1
    };

    sourceList.cards.push(newCard);
    const filteredBoard = filterObject(board.data, allowed);

    makeBoardUpdate(id, filteredBoard);
  }

  function handleOnChange(event) {
    setNewCardName(event.target.value);
  }

  function handleChangeCardList() {
    const changeCardList = sourceId !== dropTargetId;
    console.log("sourceId: ", sourceId, dropTargetId);

    if (changeCardList) {
      console.log("changeCardList: ", changeCardList);
      const adjustedCardPositions = [];
      let newList;
      let updatedSourceList;

      const dropTargetLists = lists.filter(list => list.position !== sourceId);

      const sourceList = lists
        .filter(list => list.position === sourceId)
        .shift();

      const draggingCard = sourceList.cards.find(
        card => card.position === draggingCardId
      );

      sourceList.cards
        .filter(card => card.position !== draggingCardId)
        .forEach((obj, index) =>
          adjustedCardPositions.push({ ...obj, position: index + 1 })
        );

      updatedSourceList = {
        ...sourceList,
        cards: adjustedCardPositions
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

      setLists(newList);
      setDropTargetColumnId(undefined);
      setSourceId(undefined);
    }
  }

  function handleCardsReorder(hoverIndex, draggingCardId) {
    const changeCardsOrder = sourceId === dropTargetId;

    if (changeCardsOrder) {
      console.log("changeCardsOrder: ", changeCardsOrder);
      const sourceList = lists
        .filter(list => list.position === sourceId)
        .shift();

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

      setLists(newList);
      setDraggingCardId(draggingCardId);
    }
  }

  function updateDropTargetId(id) {
    setDropTargetColumnId(id);
  }

  function updateSourceId(id) {
    setSourceId(id);
  }

  function handleStartDrag(id, draggingCardId) {
    setDraggingCardId(draggingCardId);
    setDragging(true);
    updateSourceId(id);
    updateDropTargetId(id);
  }

  function handleDrop() {
    const filteredBoard = filterObject(board.data, allowed);

    const updatedList = {
      ...filteredBoard,
      lists
    };
    // makeBoardUpdate(id, updatedList);
    console.log("updatedList: ", updatedList);
  }

  function handleCancelAddCard() {
    setActiveList("");
  }

  function updateDragOption() {
    setDraggingList(!draggingList);
  }

  function reOrderList() {
    const changeListOrder = sourceId !== dropTargetId;

    if (changeListOrder && draggingList) {
      console.log("changeListOrder: ", changeListOrder);
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

      setLists(updatedList);
      setDropTargetColumnId(undefined);
      setSourceId(undefined);
    }
  }

  const context = {
    activeList,
    dragging,
    draggingCardId,
    handleAddCardName,
    handleCancelAddCard,
    handleCardsReorder,
    handleCreateCard,
    handleOnChange,
    handleStartDrag,
    lists,
    newCardName,
    showAddCardInput
  };

  return (
    <BoardListContext.Provider value={context}>
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
    </BoardListContext.Provider>
  );
};

export default BoardLists;
