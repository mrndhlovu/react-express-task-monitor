import React, { useEffect, useState, useContext, useCallback } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Sidebar } from "semantic-ui-react";

import { BoardContext, AppContext } from "../utils/contextUtils";
import { PERMISSIONS } from "../constants/constants";
import {
  requestBoardUpdate,
  requestBoardDelete,
  requestBoardDetail,
  requestUserInvite
} from "../apis/apiRequests";

import Board from "../components/boardDetail/Board";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";
import { getActivity, emptyFunction } from "../utils/appUtils";

const StyledContainer = styled.div`
  display: grid;
`;

const BoardContainer = ({ match, history, auth }) => {
  const { getBoardDetail } = useContext(AppContext);
  const { id } = match.params;

  const [board, setBoard] = useState(null);
  const [updatedField, setUpdatedField] = useState(null);
  const [starred, setStarred] = useState(null);
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(false);

  const backendUpdate = useCallback(
    (changes, fieldId, activity) => {
      saveBoardChanges(changes);
      setUpdatedField({ fieldId, activity });
    },
    [setUpdatedField]
  );

  const saveBoardChanges = changes => setBoard(changes);

  const changeBoardAccessLevel = useCallback(
    option => {
      const newBoard = {
        ...board,
        accessLevel: { ...PERMISSIONS, [option]: true }
      };

      backendUpdate(newBoard, "accessLevel", "changeAccess");
    },
    [board, backendUpdate]
  );

  const handleDeleteBoard = useCallback(() => {
    requestBoardDelete(id);
    history.push("/");
  }, [history, id]);

  const handleColorPick = useCallback(
    color => {
      const newBoard = {
        ...board,
        styleProperties: { ...board.styleProperties, color }
      };

      backendUpdate(newBoard, "styleProperties", "color");
    },
    [backendUpdate, board]
  );

  const handleBoardStarClick = () => {
    if (board.category.includes("starred")) {
      board.category.splice(board.category.indexOf("starred"));
      setStarred(false);
    } else {
      board.category.push("starred");
      setStarred(true);
    }

    backendUpdate(board, "category", starred ? "removeStar" : "starred");
  };

  useEffect(() => {
    if (!invite) return emptyFunction();
    setLoading(true);
    const inviteUser = async () => {
      await requestUserInvite(id, invite)
        .then(res => {
          setLoading(false);
          setInvite(null);
        })
        .catch(error => {
          console.log("error: ", error.response);
        });
    };

    inviteUser();
  }, [invite, id]);

  const handleInviteClick = email => setInvite(email);

  useEffect(() => {
    if (!updatedField) return emptyFunction();
    const serverUpdate = async () => {
      const { fieldId, activity } = updatedField;
      const { fname } = auth.user;
      const userAction = getActivity(fname, activity);
      board.activities.push({ activity: userAction, createdAt: Date.now() });
      const update = {
        [fieldId]: board[fieldId],
        activities: board.activities
      };

      await requestBoardUpdate(id, update).then(() => {
        try {
          getBoardDetail(update);
        } catch (error) {}
      });
    };

    if (updatedField) serverUpdate();
  }, [getBoardDetail, id, updatedField, board, auth]);

  useEffect(() => {
    getBoardDetail(board);
    if (board) return;

    const fetchData = async () =>
      await requestBoardDetail(id)
        .then(res => {
          return setBoard(res.data);
        })
        .catch(error => history.push("/"));

    fetchData();
  }, [board, getBoardDetail, updatedField, id, history]);

  return !board ? (
    <UILoadingSpinner />
  ) : (
    <BoardContext.Provider
      value={{
        board,
        backendUpdate,
        changeBoardAccessLevel,
        handleBoardStarClick,
        handleColorPick,
        handleDeleteBoard,
        handleInviteClick,
        id,
        loading,
        saveBoardChanges
      }}
    >
      <StyledContainer>
        <Sidebar.Pushable>
          <Board />
        </Sidebar.Pushable>
      </StyledContainer>
    </BoardContext.Provider>
  );
};

export default withRouter(BoardContainer);
