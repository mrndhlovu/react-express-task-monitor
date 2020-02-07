import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { BoardContext } from "../utils/contextUtils";
import { requestNewBoard } from "../apis/apiRequests";
import { useFetch } from "../utils/hookUtils";
import HomePage from "../components/home/HomePage";

const HomePageContainer = ({ history }) => {
  const [data, loading] = useFetch();
  const [boards, setBoards] = useState({});

  const makeNewBoard = update => {
    requestNewBoard(update).then(res =>
      history.push(`/boards/id/${res.data._id}`)
    );
  };

  useEffect(() => {
    setBoards(data);
  }, [data]);

  return (
    <BoardContext.Provider value={{ boards, loading, makeNewBoard }}>
      <HomePage />
    </BoardContext.Provider>
  );
};

export default withRouter(HomePageContainer);
