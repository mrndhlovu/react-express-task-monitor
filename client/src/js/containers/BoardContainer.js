import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { BoardContext, DimensionContext } from "../utils/contextUtils";
import { requestBoardUpdate, requestBoardDelete } from "../apis/apiRequests";
import { useFetch } from "../utils/hookUtils";
import Board from "../components/boardDetail/Board";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";

const StyledContainer = styled.div`
  display: grid;
`;

const BoardContainer = ({ match, history }) => {
  const PERMISSIONS = { private: false, public: false, team: false };
  const { getNavBgColor } = useContext(DimensionContext);

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
    const requestUpdated = async () => {
      await requestBoardUpdate(id, boardUpdate).then(() => {
        try {
          getNavBgColor(boardUpdate.styleProperties.color);
        } catch (error) {}
      });
    };

    if (boardUpdate) requestUpdated();
    setBoard(boardUpdate);
    setBoardUpdate(null);
  }, [getNavBgColor, id, boardUpdate]);

  useEffect(() => {
    if (loading && data.length === 0) return;

    if (board && !boardUpdate) {
      getNavBgColor(board.styleProperties.color);
      setBoard(board);
    }
    if (!board && !boardUpdate) setBoard(data);
  }, [board, loading, getNavBgColor, data, boardUpdate]);

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
