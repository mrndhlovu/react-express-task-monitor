import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

import { DimensionContext, BoardListContext } from "../utils/contextUtils";
import { requestNewBoard, requestBoardUpdate } from "../apis/apiRequests";
import { useFetch } from "../utils/hookUtils";
import HomePage from "../components/home/HomePage";

const HomePageContainer = ({ history }) => {
  const { mobile } = useContext(DimensionContext).device;
  const [data, loading] = useFetch();
  const [boards, setBoards] = useState({});

  const makeNewBoard = update => {
    requestNewBoard(update).then(res =>
      history.push(`/boards/id/${res.data._id}`)
    );
  };

  const handleBoardStarClick = id => {
    const newBoard = data.find(board => board._id === id);

    if (newBoard.section.includes("starred"))
      newBoard.section.splice(newBoard.section.indexOf("starred"));
    else newBoard.section.push("starred");

    requestBoardUpdate(id, newBoard);
    history.push("/");
  };

  useEffect(() => {
    setBoards(data);
  }, [data]);

  return (
    <BoardListContext.Provider
      value={{ boards, loading, makeNewBoard, handleBoardStarClick, mobile }}
    >
      <HomePage />
    </BoardListContext.Provider>
  );
};

export default withRouter(HomePageContainer);
