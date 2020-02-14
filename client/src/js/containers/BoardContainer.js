import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { BoardContext, AppContext } from "../utils/contextUtils";
import { requestBoardUpdate, requestBoardDelete } from "../apis/apiRequests";
import { useFetch } from "../utils/hookUtils";
import Board from "../components/boardDetail/Board";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";
import { PERMISSIONS } from "../constants/constants";

const StyledContainer = styled.div`
  display: grid;
`;

const BoardContainer = ({ match, history }) => {
  const { getBoardDetail } = useContext(AppContext);
  const { id } = match.params;

  const [data, loading] = useFetch(id);
  const [board, setBoard] = useState(null);
  const [boardUpdate, setBoardUpdate] = useState(null);
  let newBoard;

  const makeBoardUpdate = updates => {
    setBoardUpdate(updates);
  };

  const changeBoardAccessLevel = option => {
    newBoard = {
      ...data,
      accessLevel: { ...PERMISSIONS, [option]: true }
    };

    makeBoardUpdate(newBoard);
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

    makeBoardUpdate(newBoard);
  };

  const handleBoardStarClick = () => {
    if (board.category.includes("starred"))
      board.category.splice(data.category.indexOf("starred"));
    else board.category.push("starred");
    makeBoardUpdate(board);
  };

  useEffect(() => {
    if (!boardUpdate) return;
    const requestUpdated = async () => {
      await requestBoardUpdate(id, boardUpdate).then(() => {
        try {
          getBoardDetail(boardUpdate);
        } catch (error) {}
      });
    };

    if (boardUpdate) requestUpdated();
    setBoard(boardUpdate);
    setBoardUpdate(null);
  }, [getBoardDetail, id, boardUpdate]);

  useEffect(() => {
    if (loading && !data) return;
    if (board && !boardUpdate) {
      getBoardDetail(board);
      setBoard(board);
    }
    if (!board && !boardUpdate) setBoard(data);
  }, [board, loading, getBoardDetail, data, boardUpdate]);

  return (
    <BoardContext.Provider
      value={{
        board,
        changeBoardAccessLevel,
        handleBoardStarClick,
        handleColorPick,
        handleDeleteBoard,
        id,
        makeBoardUpdate
      }}
    >
      <StyledContainer>
        {loading ? <UILoadingSpinner /> : <Board />}
      </StyledContainer>
    </BoardContext.Provider>
  );
};

export default withRouter(BoardContainer);
