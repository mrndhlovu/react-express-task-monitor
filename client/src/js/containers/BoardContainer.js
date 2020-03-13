import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { BoardContext, AppContext } from "../utils/contextUtils";
import { PERMISSIONS } from "../constants/constants";
import { requestBoardUpdate, requestBoardDelete } from "../apis/apiRequests";
import { useFetch } from "../utils/hookUtils";
import Board from "../components/boardDetail/Board";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";
import { getActivity } from "../utils/appUtils";

const StyledContainer = styled.div`
  display: grid;
`;

const BoardContainer = ({ match, history }) => {
  const { getBoardDetail, auth } = useContext(AppContext);
  const { id } = match.params;

  const [data, loading] = useFetch(id);
  const [board, setBoard] = useState(null);
  const [updatedField, setUpdatedField] = useState(null);
  const [starred, setStarred] = useState(null);

  let newBoard;

  const backendUpdate = (changes, fieldId, activity) => {
    saveBoardChanges(changes);
    setUpdatedField({ fieldId, activity });
  };

  const saveBoardChanges = changes => setBoard(changes);

  const changeBoardAccessLevel = option => {
    newBoard = {
      ...data,
      accessLevel: { ...PERMISSIONS, [option]: true }
    };

    backendUpdate(newBoard, "accessLevel", "changeAccess");
  };

  const handleDeleteBoard = () => {
    requestBoardDelete(id);
    history.push("/");
  };

  const handleColorPick = color => {
    newBoard = {
      ...data,
      styleProperties: { ...data.styleProperties, color }
    };

    backendUpdate(newBoard, "styleProperties", "color");
  };

  const handleBoardStarClick = () => {
    if (board.category.includes("starred")) {
      board.category.splice(data.category.indexOf("starred"));
      setStarred(false);
    } else {
      board.category.push("starred");
      setStarred(true);
    }

    backendUpdate(board, "category", starred ? "removeStar" : "starred");
  };

  useEffect(() => {
    if (!updatedField) return;
    const serverUpdate = async () => {
      const { fieldId, activity } = updatedField;
      const { fname } = auth.data;
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
    if (loading && !data) return;
    if (board && !updatedField) {
      getBoardDetail(board);
      setBoard(board);
    }
    if (!board) setBoard(data);
  }, [board, loading, getBoardDetail, data, updatedField]);

  return (
    <BoardContext.Provider
      value={{
        board,
        changeBoardAccessLevel,
        handleBoardStarClick,
        handleColorPick,
        handleDeleteBoard,
        id,
        backendUpdate,
        saveBoardChanges
      }}
    >
      <StyledContainer>
        {loading ? <UILoadingSpinner /> : <Board />}
      </StyledContainer>
    </BoardContext.Provider>
  );
};

export default withRouter(BoardContainer);
