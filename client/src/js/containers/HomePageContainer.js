import React, { useState, useEffect, useContext, useRef } from "react";
import { withRouter } from "react-router-dom";

import { DimensionContext, BoardListContext } from "../utils/contextUtils";
import { requestNewBoard, requestBoardUpdate } from "../apis/apiRequests";
import { useFetch } from "../utils/hookUtils";
import HomePage from "../components/home/HomePage";
import { DEFAULT_NAV_COLOR } from "../constants/constants";

const HomePageContainer = ({ history }) => {
  const { mobile, tablet } = useContext(DimensionContext).device;
  const { getNavBgColor } = useContext(DimensionContext);

  const [data, loading] = useFetch();
  const [boards, setBoards] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const starredRef = useRef();
  const starRef = useRef();

  const makeNewBoard = update => {
    requestNewBoard(update).then(res => {
      try {
        setIsLoading(false);
        return history.push(`/boards/id/${res.data._id}`);
      } catch (error) {
        return setIsLoading(false);
      }
    });
  };

  const handleBoardStarClick = () => {
    const { id } = starRef.current
      ? starRef.current.props
      : starredRef.current.props;
    const newBoard = data.find(board => board._id === id);

    if (newBoard.category.includes("starred"))
      newBoard.category.splice(newBoard.category.indexOf("starred"));
    else newBoard.category.push("starred");

    requestBoardUpdate(id, newBoard);
    history.push("/");
  };

  useEffect(() => {
    setBoards(data);
    setIsLoading(loading);
    getNavBgColor(DEFAULT_NAV_COLOR);
  }, [data, loading, getNavBgColor]);

  return (
    <BoardListContext.Provider
      value={{
        boards,
        handleBoardStarClick,
        loading: isLoading,
        makeNewBoard,
        mobile,
        starRef,
        starredRef,
        tablet
      }}
    >
      <HomePage />
    </BoardListContext.Provider>
  );
};

export default withRouter(HomePageContainer);
