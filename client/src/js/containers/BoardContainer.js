import React, { useEffect, useState, useCallback, memo } from "react";
import styled from "styled-components";

import { BoardContext } from "../utils/contextUtils";
import Board from "../components/boardDetail/Board";
import { useFetch } from "../utils/hookUtils";
import { requestBoardDetail, requestBoardUpdate } from "../apis/apiRequests";
import { filterObject } from "../utils/appUtils";
import { withRouter } from "react-router-dom";

const StyledContainer = styled.div`
  display: grid;
`;

const BoardContainer = ({ match, history }) => {
  const allowed = ["title", "lists"];
  const { id } = match.params;
  const [data, loading] = useFetch(
    useCallback(() => requestBoardDetail(id)),
    []
  );
  const [board, setBoard] = useState({});

  const makeBoardUpdate = update => {
    const requestBody = filterObject(update, allowed);
    setBoard(requestBody);

    requestBoardUpdate(id, requestBody).then(res =>
      history.push(`/boards/id/${id}`)
    );
  };

  useEffect(() => {
    setBoard(data);
  }, [data, board]);

  return (
    <BoardContext.Provider value={{ board, makeBoardUpdate, id }}>
      <StyledContainer>
        {!loading && Object.keys(board).length > 0 ? <Board /> : "Loading..."}
      </StyledContainer>
    </BoardContext.Provider>
  );
};

export default withRouter(memo(BoardContainer));
