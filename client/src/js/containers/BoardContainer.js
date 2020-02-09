import React, { useEffect, useState, memo, useContext } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { allowed } from "../constants/constants";
import { BoardContext, DimensionContext } from "../utils/contextUtils";
import { filterObject } from "../utils/appUtils";
import { requestBoardUpdate } from "../apis/apiRequests";
import { useFetch } from "../utils/hookUtils";
import Board from "../components/boardDetail/Board";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";

const StyledContainer = styled.div`
  display: grid;
`;

const DEFAULT_OPTIONS = { private: false, public: false, team: false };

const BoardContainer = ({ match, history }) => {
  const { id } = match.params;
  const [data, loading] = useFetch(id);
  const [board, setBoard] = useState(undefined);
  const { getBoardBgColor } = useContext(DimensionContext);

  const makeBoardUpdate = update => {
    const requestBody = filterObject(update, allowed);
    setBoard(requestBody);
    getBoardBgColor(update.color);
    requestBoardUpdate(id, requestBody).then(res =>
      history.push(`/boards/id/${id}`)
    );
  };

  const changeBoardVisibility = option => {
    const newBoard = {
      ...data,
      visibility: { ...DEFAULT_OPTIONS, [option]: true }
    };

    makeBoardUpdate(newBoard);
  };

  const handleColorPick = color => {
    const newBoard = { ...data, color };
    makeBoardUpdate(newBoard);
  };

  const handleBoardStarClick = id => {
    if (board.section.includes("starred"))
      board.section.splice(data.section.indexOf("starred"));
    else board.section.push("starred");

    requestBoardUpdate(id, board);
    history.push(`/boards/id/${id}`);
  };

  useEffect(() => {
    if (loading && data.length === 0) return;
    getBoardBgColor(board && board.color);
    setBoard(board ? board : data);
  }, [data, loading, getBoardBgColor, board]);

  return (
    <BoardContext.Provider
      value={{
        board,
        makeBoardUpdate,
        id,
        handleColorPick,
        handleBoardStarClick,
        changeBoardVisibility
      }}
    >
      <StyledContainer>
        {board ? <Board /> : <UILoadingSpinner />}
      </StyledContainer>
    </BoardContext.Provider>
  );
};

export default withRouter(memo(BoardContainer));
