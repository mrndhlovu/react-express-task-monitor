import React, { useContext, useEffect, useState } from "react";

import { AppContext, HomepageContext } from "../utils/contextUtils";
import HomePage from "../components/home/HomePage";
import { useFetch } from "../utils/hookUtils";
import { withRouter } from "react-router-dom";
import { requestBoardUpdate } from "../apis/apiRequests";
import { getBoard } from "../utils/appUtils";

const HomePageContainer = ({ history, user }) => {
  const { getBoardDetail } = useContext(AppContext);
  const [data, loading] = useFetch(null, history);
  const [boards, setBoards] = useState([]);

  const handleBoardStarClick = id => {
    const board = getBoard(boards, id);

    if (board.category.includes("starred"))
      board.category.splice(board.category.indexOf("starred"));
    else board.category.push("starred");

    requestBoardUpdate(id, board);
    history.push("/");
  };

  useEffect(() => {
    if (!data) return;
    setBoards(data);
    getBoardDetail();
  }, [getBoardDetail, data]);

  return (
    <HomepageContext.Provider value={{ boards, loading, handleBoardStarClick }}>
      <HomePage boards={boards} user={user} />;
    </HomepageContext.Provider>
  );
};

export default withRouter(HomePageContainer);
