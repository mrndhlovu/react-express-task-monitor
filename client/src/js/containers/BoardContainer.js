import React, { useEffect, useState, memo } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { allowed } from "../constants/constants";
import { BoardContext } from "../utils/contextUtils";
import { filterObject } from "../utils/appUtils";
import { requestBoardUpdate } from "../apis/apiRequests";
import { useFetch } from "../utils/hookUtils";
import Board from "../components/boardDetail/Board";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";

const StyledContainer = styled.div`
  display: grid;
`;

const BoardContainer = ({ match, history }) => {
  const { id } = match.params;
  const [data, loading] = useFetch(id);
  const [board, setBoard] = useState(undefined);

  const makeBoardUpdate = update => {
    const requestBody = filterObject(update, allowed);
    setBoard(requestBody);
    requestBoardUpdate(id, requestBody).then(res =>
      history.push(`/boards/id/${id}`)
    );
  };

  const handleColorPick = color => {
    const newBoard = { ...data, color };
    makeBoardUpdate(newBoard);
  };

  useEffect(() => {
    if (loading && data.length === 0) return;

    setBoard(data);
  }, [data, loading]);

  return (
    <BoardContext.Provider
      value={{ board, makeBoardUpdate, id, handleColorPick }}
    >
      <StyledContainer>
        {board ? <Board /> : <UILoadingSpinner />}
      </StyledContainer>
    </BoardContext.Provider>
  );
};

export default withRouter(memo(BoardContainer));
