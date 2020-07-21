import React, { useEffect, useState, useCallback } from "react";
import { withRouter } from "react-router-dom";
import isURL from "validator/lib/isURL";
import PropTypes from "prop-types";

import { BoardContext } from "../utils/contextUtils";
import { PERMISSIONS } from "../constants/constants";
import {
  requestBoardUpdate,
  requestBoardDelete,
  requestBoardDetail,
  requestUserInvite,
  requestNewBoardList,
  requestCreateNewCard,
  requestCardUpdate,
} from "../apis/apiRequests";

import { resetForm, getUpdatedArray, findArrayItem } from "../utils/appUtils";
import { useAuth, useMainContext, useFetch } from "../utils/hookUtils";
import Board from "../components/boardDetail/Board";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";

const BoardContainer = ({ match, history, templateBoard }) => {
  const {
    navDataHandler,
    boards,
    alertUser,
    updateUserRequestHandler,
  } = useMainContext();
  const { user, auth } = useAuth();
  const { id } = match.params;
  const [data] = useFetch(
    !templateBoard && (() => requestBoardDetail(id)),
    alertUser
  );

  const [board, setBoard] = useState(undefined);
  const [inviteDone, setInviteDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

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
        navDataHandler(res.data.styleProperties);
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

  const bgColorSelectHandler = (option) => {
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

      navDataHandler(null, getUpdatedArray(boards, removeIndex, newBoard));
    }

    newBoard && boardUpdateHandler(newBoard, "styleProperties");
  };

  const starBoardHandler = () => {
    if (user.starred.includes(id))
      user.starred.splice(user.starred.indexOf(id), 1);
    else user.starred.push(id);

    updateUserRequestHandler({ starred: user.starred });
  };

  const handleInviteClick = async (email) => {
    await requestUserInvite(id, email)
      .then(() => {
        setInviteDone(true);
        setLoading(false);
        resetForm("invite-input");
      })
      .catch((error) => alertUser(error.response.data.message));
  };

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

  const cardUpdateRequestHandler = async (newCard, sourceId, cb = () => {}) => {
    const body = { listId: sourceId, newCard };

    await requestCardUpdate(body, id)
      .then((res) => {
        updateBoardState(res.data);
        cb && cb();
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

  useEffect(() => {
    if (templateBoard) {
      setBoard(templateBoard);
      return navDataHandler(templateBoard.styleProperties, boards);
    }

    if (data) {
      navDataHandler(data.styleProperties, boards);
      setBoard(data);
    }
  }, [templateBoard, data]);

  const context = {
    board,
    boardId: id,
    boardUpdateHandler,
    cardUpdateRequestHandler,
    changeBoardAccessLevel,
    createCardHandler,
    createListHandler,
    getSourceList,
    starBoardHandler,
    handleDeleteBoard,
    handleDeleteList,
    handleInviteClick,
    bgColorSelectHandler,
    handleShowMenuClick,
    history,
    inviteDone,
    loading,
    showSideBar,
    updateBoardState,
  };

  return (
    <BoardContext.Provider value={context}>
      {board ? <Board /> : <UILoadingSpinner />}
    </BoardContext.Provider>
  );
};

BoardContainer.propTypes = {
  context: PropTypes.shape({
    board: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
    boardId: PropTypes.string.isRequired,
    boardUpdateHandler: PropTypes.func.isRequired,
    cardUpdateRequestHandler: PropTypes.func.isRequired,
    changeBoardAccessLevel: PropTypes.func.isRequired,
    createCardHandler: PropTypes.func.isRequired,
    createListHandler: PropTypes.func.isRequired,
    getSourceList: PropTypes.func.isRequired,
    starBoardHandler: PropTypes.func.isRequired,
    handleDeleteBoard: PropTypes.func.isRequired,
    handleDeleteList: PropTypes.func.isRequired,
    handleInviteClick: PropTypes.func.isRequired,
    bgColorSelectHandler: PropTypes.func.isRequired,
    handleShowMenuClick: PropTypes.func.isRequired,
    inviteDone: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    showSideBar: PropTypes.bool.isRequired,
    updateBoardState: PropTypes.func.isRequired,
  }),
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

export default withRouter(BoardContainer);
