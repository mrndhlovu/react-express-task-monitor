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
} from "../apis/apiRequests";

import {
  getActivity,
  emptyFunction,
  resetForm,
  getUpdatedArray,
  findArrayItem,
} from "../utils/appUtils";
import { useAuth, useAlert, useMainContext } from "../utils/hookUtils";
import Board from "../components/boardDetail/Board";
import BoardHeader from "../components/boardDetail/BoardHeader";

const StyledContainer = styled.div`
  height: 100vh;
`;

const BoardContainer = ({ match, history, templateBoard }) => {
  const { id } = match.params;
  const { getNavData, boards } = useMainContext();
  const { auth, user } = useAuth();
  const { notify } = useAlert();

  const [board, setBoard] = useState(null);
  const [invite, setInvite] = useState(null);
  const [inviteDone, setInviteDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [starred, setStarred] = useState(false);
  const [unStarred, setUnStarred] = useState(false);
  const [updatedField, setUpdatedField] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState();

  const handleShowMenuClick = () => setShowSideBar(!showSideBar);

  const handleBoardUpdate = (
    newBoard,
    fieldId = "lists",
    activity,
    callback,
    newId
  ) => {
    if (!newBoard) return setBoard(null);
    saveBoardChanges(newBoard);
    setUpdatedField({ fieldId, activity, callback, newId });
  };

  const saveBoardChanges = (newBoard) => setBoard(newBoard);

  const changeBoardAccessLevel = (option) => {
    const newBoard = {
      ...board,
      accessLevel: { ...PERMISSIONS, [option]: true },
    };

    handleBoardUpdate(newBoard, "accessLevel", "changeAccess");
  };

  const handleDeleteBoard = useCallback(() => {
    if (user.starred.includes(id))
      user.starred.splice(user.starred.indexOf(id), 1);
    requestBoardDelete(id);
    const updateUser = async () => {
      await requestUserUpdate({ starred: user.starred }).then(() => {
        try {
          history.push("/");
        } catch (error) {
          alert(error.message);
        }
      });
    };
    updateUser();
  }, [history, id, user]);

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

    handleBoardUpdate(newBoard, "styleProperties");
  };

  const handleBoardStarClick = () => {
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
        .catch((error) => {
          notify({ message: error.response.data.message });
        });
    };

    inviteUser();
  }, [invite, id]);

  const handleInviteClick = (email) => setInvite(email);

  useEffect(() => {
    if (!updatedField) return emptyFunction();
    const serverUpdate = async () => {
      const { fieldId, activity, newId, callback } = updatedField;

      const { fname } = auth.data.data;
      const userAction = getActivity(fname, activity);
      activity &&
        board.activities.push({ activity: userAction, createdAt: Date.now() });
      const update = {
        [fieldId]: board[fieldId],
        activities: board.activities,
      };

      await requestBoardUpdate(newId ? newId : id, update).then((res) => {
        getNavData(res.data.styleProperties);
        if (callback) callback();
      });
    };

    serverUpdate();
    setUpdatedField(null);
  }, [id, updatedField, board, auth, getNavData]);

  useEffect(() => {
    if (board) return emptyFunction();
    const fetchData = async () => {
      await requestBoardDetail(id)
        .then((res) => {
          setBoard(res.data);
          return getNavData(res.data.styleProperties, boards);
        })
        .catch((error) => notify({ message: error.response.data.message }));
    };

    if (templateBoard) {
      setBoard(templateBoard);
      return getNavData(templateBoard.styleProperties, boards);
    }

    fetchData();
  }, [board, boards, id, history, getNavData, templateBoard]);

  return (
    board && (
      <BoardContext.Provider
        value={{
          board,
          changeBoardAccessLevel,
          handleBoardStarClick,
          handleBoardUpdate,
          handleSelectedBackground,
          handleDeleteBoard,
          handleInviteClick,
          handleShowMenuClick,
          id,
          inviteDone,
          loading,
          saveBoardChanges,
          showSideBar,
          showMobileMenu,
          setShowMobileMenu,
        }}
      >
        <StyledContainer bgStyle={board.styleProperties}>
          <div className="board-content">
            <BoardHeader user={user} />
            <Board />
          </div>
        </StyledContainer>
      </BoardContext.Provider>
    )
  );
};

export default withRouter(BoardContainer);
