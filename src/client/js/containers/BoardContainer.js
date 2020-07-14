import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import isURL from "validator/lib/isURL";

import { BoardContext } from "../utils/contextUtils";
import { PERMISSIONS } from "../constants/constants";
import {
  requestBoardUpdate,
  requestBoardDelete,
  requestBoardDetail,
  requestUserInvite,
  requestUserUpdate,
  requestNewBoardList,
  requestCreateNewCard,
} from "../apis/apiRequests";

import {
  emptyFunction,
  resetForm,
  getUpdatedArray,
  findArrayItem,
} from "../utils/appUtils";
import { useAuth, useMainContext } from "../utils/hookUtils";
import Board from "../components/boardDetail/Board";
import BoardHeader from "../components/boardDetail/BoardHeader";

const StyledContainer = styled.div`
  height: 100vh;
`;

const BoardContainer = ({ match, history, templateBoard }) => {
  const { getNavData, boards, alertUser } = useMainContext();
  const { user, auth } = useAuth();
  const { id } = match.params;

  const [board, setBoard] = useState(null);
  const [invite, setInvite] = useState(null);
  const [inviteDone, setInviteDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [starred, setStarred] = useState(false);
  const [unStarred, setUnStarred] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState();
  const [dragCardId, setDragCardId] = useState("");

  const getSourceList = (sourceId) =>
    findArrayItem(board.lists, sourceId, "_id");

  const handleShowMenuClick = () => setShowSideBar(!showSideBar);

  const boardUpdateHandler = async (
    newBoard,
    fieldId = "lists",
    callback = () => {},
    newId
  ) => {
    if (!newBoard) return setBoard(null);
    updateBoardState(newBoard);

    const body = { [fieldId]: board[fieldId] };

    await requestBoardUpdate(newId ? newId : id, body)
      .then((res) => {
        getNavData(res.data.styleProperties);
        if (callback) callback();
      })
      .catch((error) => alertUser(error.response.data.message));
  };

  const updateBoardState = (newBoard) => setBoard(newBoard);

  const changeBoardAccessLevel = (option) => {
    const newBoard = {
      ...board,
      accessLevel: { ...PERMISSIONS, [option]: true },
    };

    boardUpdateHandler(newBoard, "accessLevel");
  };

  const handleDeleteBoard = useCallback(async () => {
    await requestBoardDelete(id)
      .then((res) => {
        auth.authListener(res.data.user, history.push("/"));
      })
      .catch((error) => alertUser(error.message));
  }, [history, id]);

  const handleSelectedBackground = (option) => {
    const isImageURL = isURL(option);
    let newBoard;

    if (isImageURL)
      newBoard = {
        ...board,
        styleProperties: { ...board.styleProperties, image: option, color: "" },
      };
    else
      newBoard = {
        ...board,
        styleProperties: { ...board.styleProperties, color: option, image: "" },
      };
    if (boards) {
      const source = findArrayItem(boards, board._id, "_id");
      const removeIndex = boards.indexOf(source);

      getNavData(null, getUpdatedArray(boards, removeIndex, newBoard));
    }

    boardUpdateHandler(newBoard, "styleProperties");
  };

  const starBoardHandler = () => {
    if (user.starred.includes(id)) {
      user.starred.splice(user.starred.indexOf(id), 1);
      setUnStarred(true);
    } else {
      user.starred.push(id);
      setStarred(true);
    }
  };

  useEffect(() => {
    if (!starred && !unStarred) return emptyFunction();

    const updateUser = async () => {
      await requestUserUpdate({ starred: user.starred });
      return () => {
        setStarred(false);
        setUnStarred(false);
      };
    };

    updateUser();
  }, [starred, user, unStarred]);

  useEffect(() => {
    if (!invite) return emptyFunction();
    setLoading(true);
    const inviteUser = async () => {
      await requestUserInvite(id, invite)
        .then(() => {
          setInviteDone(true);
          setLoading(false);
          setInvite(null);
          resetForm("invite-input");
        })
        .catch((error) => alertUser(error.response.data.message));
    };

    inviteUser();
  }, [invite, id]);

  const handleInviteClick = (email) => setInvite(email);

  useEffect(() => {
    if (board) return emptyFunction();
    const fetchBoard = async () => {
      if (templateBoard) {
        setBoard(templateBoard);
        return getNavData(templateBoard.styleProperties, boards);
      }

      await requestBoardDetail(id)
        .then((res) => {
          setBoard(res.data);
          return getNavData(res.data.styleProperties, boards);
        })
        .catch((error) => alertUser(error.response.data.message));
    };

    fetchBoard();
  }, [board, boards, id, history, getNavData, templateBoard, alertUser]);

  const createListHandler = async (listData, callback = () => {}) => {
    if (!listData || !listData.title) return alertUser("Add list title");

    await requestNewBoardList(listData, id)
      .then((res) => {
        updateBoardState(res.data);
        resetForm("create-item-form");
        callback();
      })
      .catch((error) => alertUser(error.response.data.message));
  };

  const createCardHandler = async (newCard, listId) => {
    if (!newCard) alertUser("Add card title");

    const card = { title: newCard };
    await requestCreateNewCard({ card, listId }, id)
      .then((res) => {
        updateBoardState(res.data);
        resetForm("create-card-input");
      })
      .catch((error) => alertUser(error.response.data.message));
  };

  const handleDeleteList = (listPosition) => {
    board.lists.splice(listPosition, 1);
    boardUpdateHandler(board);
  };

  const cardToNewListHandler = (sourceId, dropProps) => {
    const dropTargetList = getSourceList(dropProps.listId);
    const sourceList = getSourceList(sourceId);
    const sourceIndex = board.lists.indexOf(sourceList);
    const dropTargetListIndex = board.lists.indexOf(dropTargetList);
    const dropTargetCardIndex = dropTargetList.cards.indexOf(dropTargetCard);

    const card = findArrayItem(sourceList.cards, dragCardId, "_id");

    const dropTargetCard = findArrayItem(
      sourceList.cards,
      dropProps.cardId,
      "_id"
    );

    sourceList.cards.splice(sourceList.cards.indexOf(card), 1);

    board.lists.splice(sourceIndex, 1, sourceList);

    dropTargetList.cards.splice(dropTargetCardIndex, 0, card);
    board.lists.splice(dropTargetListIndex, 1, dropTargetList);
  };

  return (
    board && (
      <BoardContext.Provider
        value={{
          board,
          boardId: id,
          boardUpdateHandler,
          cardToNewListHandler,
          changeBoardAccessLevel,
          createCardHandler,
          createListHandler,
          dragCardId,
          getSourceList,
          starBoardHandler,
          handleDeleteBoard,
          handleDeleteList,
          handleInviteClick,
          handleSelectedBackground,
          handleShowMenuClick,
          history,
          inviteDone,
          loading,
          setShowMobileMenu,
          showMobileMenu,
          showSideBar,
          updateBoardState,
          setDragCardId,
        }}
      >
        <StyledContainer>
          <div className="board-content">
            <BoardHeader />
            <Board />
          </div>
        </StyledContainer>
      </BoardContext.Provider>
    )
  );
};

export default withRouter(BoardContainer);
