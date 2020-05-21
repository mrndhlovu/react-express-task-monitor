import React, { useContext, useState, Suspense, lazy, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router";

import {
  BoardContext,
  BoardListsContext,
  MainContext,
} from "../../utils/contextUtils";

import CreateItemForm from "../sharedComponents/CreateItemForm";
import ListGrid from "./ListGrid";
import { parseSearchQuery, getQueryString } from "../../utils/urls";
import { findArrayItem, emptyFunction } from "../../utils/appUtils";
import { requestNewBoardList } from "../../apis/apiRequests";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const CardDetailModal = lazy(() => import("../cardDetail/CardDetailModal"));

const StyledListContainer = styled.div`
  display: flex;
  vertical-align: top;
  overflow-x: auto;
  overflow-y: hidden;
`;

const BoardLists = ({ history }) => {
  const { board, handleBoardUpdate, id, saveBoardChanges } = useContext(
    BoardContext
  );
  const { mobile } = useContext(MainContext).device;

  const { lists } = board;
  const modalOpen = parseSearchQuery(getQueryString(history.location))[
    "modal-open"
  ];
  const hasLists = lists.length !== 0;

  const [activeCard, setActiveCard] = useState(false);
  const [activeList, setActiveList] = useState("");
  const [activity, setActivity] = useState(null);
  const [createList, setCreateList] = useState(false);
  const [dragCardId, setDragCardId] = useState("");
  const [draggingList, setDraggingList] = useState(false);
  const [dropProps, setDropProps] = useState({ listId: null, cardId: null });
  const [hideCardDetail, setHideCardDetail] = useState(true);
  const [newCardName, setNewCardName] = useState("");
  const [newListName, setNewListName] = useState("");
  const [reorderCards, setReorderCards] = useState(false);
  const [showAddCardInput, setShowAddCardInput] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const [sourceId, setSourceId] = useState(undefined);
  const [update, setUpdate] = useState("");

  const getSourceList = (id, target) => findArrayItem(lists, id, target);
  const handleAddList = (event) => setNewListName(event.target.value);
  const handleOnChange = (event) => setNewCardName(event.target.value);
  const updateDragOption = () => setDraggingList(!draggingList);
  const updateSourceId = (id) => setSourceId(id);

  const handleCreateList = () => {
    setCreateList(true);
    setShowInputField(!showInputField);
  };

  useEffect(() => {
    if (!createList) return emptyFunction();
    const getList = async () => {
      const newList = { title: newListName };
      setCreateList(false);
      await requestNewBoardList(newList, id).then((res) => {
        setCreateList(false);
        try {
          saveBoardChanges(res.data);
        } catch (error) {
          return () => {
            setCreateList(false);
            setNewListName("");
          };
        }
      });
    };

    getList();
  }, [createList, newListName, id, saveBoardChanges]);

  const handleAddCardName = (listId) => {
    setShowAddCardInput(true);
    setActiveList(listId);
  };

  const getFilteredBoard = (filterId) => {
    return {
      ...board,
      lists: [...lists.filter((list) => list._id !== filterId)],
    };
  };

  const updateBoard = (data, action) => {
    setUpdate(data.lists);
    handleBoardUpdate(data, "lists", activity || action);
    setActivity(null);
  };

  const handleMoveCardToNewList = () => {
    let sourceList = getSourceList(sourceId, "_id");
    const dropTargetList = findArrayItem(lists, dropProps.listId, "_id");
    const card = findArrayItem(sourceList.cards, dragCardId, "_id");

    const dropTargetCard = findArrayItem(
      sourceList.cards,
      dropProps.cardId,
      "_id"
    );

    sourceList.cards.splice(sourceList.cards.indexOf(card), 1);

    lists.splice(lists.indexOf(sourceList), 1, sourceList);

    dropTargetList.cards.splice(
      dropTargetList.cards.indexOf(dropTargetCard),
      0,
      card
    );

    lists.splice(lists.indexOf(dropTargetList), 1, dropTargetList);

    setUpdate(lists);
    setActivity("movedCard");
  };

  const moveCardToNewPosition = () => {
    let sourceList = getSourceList(sourceId, "_id");
    const card = findArrayItem(sourceList.cards, dragCardId, "_id");

    const dropTarget = findArrayItem(sourceList.cards, dropProps.cardId, "_id");

    sourceList.cards.splice(sourceList.cards.indexOf(card), 1);
    sourceList.cards.splice(sourceList.cards.indexOf(dropTarget), 0, card);

    lists.splice(lists.indexOf(sourceList), 1, sourceList);

    setUpdate(lists);
    setDragCardId(dragCardId);
  };

  const updateDropTargetId = (listId, cardId) => {
    listId && setDropProps({ ...dropProps, listId });
    cardId && setDropProps({ ...dropProps, cardId });

    if (dropProps.listId === sourceId) setReorderCards(true);
    else setReorderCards(false);
  };

  const handleStartDrag = (listId, cardId) => {
    setDragCardId(cardId);
    updateSourceId(listId);
    updateDropTargetId(listId, cardId);
  };

  const reOrderList = () => {
    const sourceList = getSourceList(sourceId, "_id");
    const dropTarget = getSourceList(dropProps.listId, "_id");
    const moveForward = lists.indexOf(sourceList) < lists.indexOf(dropTarget);

    lists.splice(lists.indexOf(sourceList), 1);

    lists.splice(
      moveForward ? lists.indexOf(dropTarget) + 1 : lists.indexOf(dropTarget),
      0,
      sourceList
    );
    setUpdate(lists);
  };

  const handleCardClick = (card, sourceId) => {
    const { pathname } = history.location;

    if (sourceId) {
      setActiveCard(card);
      setSourceId(sourceId);
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

    setDropProps({ ...dropProps, listId: null, cardId: null });
    setDragCardId(undefined);
    setSourceId(undefined);
    setReorderCards(false);
  };

  const context = {
    activeCard,
    activeList,
    board,
    boardId: id,
    closeAddCardOption: () => setActiveList(""),
    dragCardId,
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
          <Suspense fallback={<UILoadingSpinner />}>
            <CardDetailModal
              listId={sourceId}
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
