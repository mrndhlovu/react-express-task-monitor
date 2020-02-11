import React, { useEffect, useState, useContext, useRef, memo } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { allowed } from "../constants/constants";
import { BoardContext, DimensionContext } from "../utils/contextUtils";
import { filterObject } from "../utils/appUtils";
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
  const [board, setBoard] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const starredRef = useRef();
  const starRef = useRef();

  const makeBoardUpdate = update => {
    const requestBody = filterObject(update, allowed);
    setIsLoading(true);

    requestBoardUpdate(id, requestBody).then(res => {
      try {
        setBoard(requestBody);
        getNavBgColor(requestBody.styleProperties.color);

        setIsLoading(false);
        return history.push(`/boards/id/${id}`);
      } catch (error) {
        setIsLoading(false);
      }
    });
  };

  const changeBoardAccessLevel = option => {
    const newBoard = {
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
    const newBoard = {
      ...data,
      styleProperties: { ...data.styleProperties, color }
    };

    makeBoardUpdate(newBoard);
  };

  const handleBoardStarClick = () => {
    const { id } = starRef.current
      ? starRef.current.props
      : starredRef.current.props;

    if (board.category.includes("starred"))
      board.category.splice(data.category.indexOf("starred"));
    else board.category.push("starred");

    requestBoardUpdate(id, board);
    history.push(`/boards/id/${id}`);
  };

  useEffect(() => {
    if (loading && data.length === 0) return;
    getNavBgColor(board && board.styleProperties.color);
    setBoard(board ? board : data);
    setIsLoading(false);
  }, [data, loading, getNavBgColor, board, isLoading]);

  return (
    <BoardContext.Provider
      value={{
        board,
        changeBoardAccessLevel,
        handleBoardStarClick,
        handleColorPick,
        handleDeleteBoard,
        id,
        makeBoardUpdate,
        starredRef,
        starRef
      }}
    >
      <StyledContainer>
        {isLoading ? <UILoadingSpinner /> : <Board />}
      </StyledContainer>
    </BoardContext.Provider>
  );
};

export default withRouter(memo(BoardContainer));
