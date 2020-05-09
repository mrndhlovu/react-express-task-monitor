import React, {
  useContext,
  useState,
  lazy,
  Suspense,
  useCallback,
  useEffect,
} from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import update from "immutability-helper";

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

const CardDetailModal = lazy(() => import("../cardDetail/CardDetailModal"));

const StyledListContainer = styled.div`
  display: flex;
  vertical-align: top;
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
`;

const BoardLists = ({ history }) => {
  let { board, handleBoardUpdate, id, saveBoardChanges } = useContext(
    BoardContext
  );
  const { mobile } = useContext(MainContext).device;
  let { lists } = board;
  const modalOpen = parseSearchQuery(getQueryString(history.location))[
    "modal-open"
  ];
  const hasLists = lists.length !== 0;

  const [activeCard, setActiveCard] = useState(false);
  const [activeList, setActiveList] = useState("");
  const [activity, setActivity] = useState(null);
  const [createList, setCreateList] = useState(false);
  const [dragCardId, setDragCardId] = useState("");
  const [hideCardDetail, setHideCardDetail] = useState(true);
  const [newCardName, setNewCardName] = useState("");
  const [newListName, setNewListName] = useState("");
  const [showAddCardInput, setShowAddCardInput] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const [sourceId, setSourceId] = useState(undefined);
  const [sourceTitle, setSourceTitle] = useState("");

  const getSourceList = (id, target) => findArrayItem(lists, id, target);
  const handleAddList = (event) => setNewListName(event.target.value);
  const handleOnChange = (event) => setNewCardName(event.target.value);

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
          setCreateList(false);
          setNewListName("");
        }
      });
    };

    getList();
  }, [createList, newListName, id, saveBoardChanges]);

  const handleAddCardName = (listId) => {
    setShowAddCardInput(true);
    setActiveList(listId);
  };

  const updateBoard = (data, action) => {
    handleBoardUpdate(data, "lists", activity || action);
    setActivity(null);
  };

  const relocateCard = (cards, sourceId) => {
    console.log("relocateCard -> cards", cards, sourceId);
  };

  const moveCard = useCallback(
    (dragIndex, hover, sourceId) => {
      let list = getSourceList(sourceId, "_id");
      const { cardIndex } = hover;

      const dragCard = list.cards[dragIndex];
      const cards = update(list.cards, {
        $splice: [
          [dragIndex, 1],
          [cardIndex, 0, dragCard],
        ],
      });
      list = { ...list, cards };
      lists.splice(lists.indexOf(list), 1, list);
      handleDrop(lists);
    },

    [lists]
  );

  const moveList = useCallback(
    (dragIndex, hoverIndex) => {
      const dragList = lists[dragIndex];
      const updatedLists = update(lists, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragList],
        ],
      });
      handleDrop(updatedLists);
    },
    [lists]
  );

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

  const handleDrop = (updates) => {
    const isValidData = updates[0];
    board = { ...board, lists: isValidData ? updates : lists };

    isValidData && updateBoard(board);

    setDragCardId(undefined);
    setSourceId(undefined);
  };

  const context = {
    activeCard,
    activeList,
    board,
    boardId: id,
    closeAddCardOption: () => setActiveList(""),
    dragCardId,
    getSourceList,
    handleAddCardName,
    handleBoardUpdate,
    handleCardClick,
    handleOnChange,
    hideCardDetail,
    mobile,
    newCardName,
    showAddCardInput,
    sourceTitle,
    updateBoard,
    saveBoardChanges,
    moveCard,
  };

  return (
    <BoardListsContext.Provider value={context}>
      <StyledListContainer className="lists-container">
        <ListGrid
          relocateCard={relocateCard}
          moveCard={moveCard}
          moveList={moveList}
          sourceId={sourceId}
          lists={lists}
          mobile={mobile}
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
              sourceId={sourceId}
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
