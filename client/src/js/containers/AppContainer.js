import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { DEFAULT_NAV_COLOR } from "../constants/constants";
import { AppContext } from "../utils/contextUtils";
import { requestNewBoard, requestBoardUpdate } from "../apis/apiRequests";
import { useDimensions, useFetch } from "../utils/hookUtils";

import NavHeader from "../components/navBar/NavHeader";
import SearchPage from "../components/search/SearchPage";

const Container = styled.div`
  height: 100vh;
  background-color: transparent;
`;

const AppContainer = ({ children, history }) => {
  const [data, loading] = useFetch();

  const [boards, setBoards] = useState(null);
  const [color, setColor] = useState(null);
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { device, dimensions } = useDimensions();

  const handleSearchClick = e => {
    setSearch(e.target.value);
  };

  const handleBoardStarClick = id => {
    const newBoard = boards.find(board => board._id === id);

    if (newBoard.category.includes("starred"))
      newBoard.category.splice(newBoard.category.indexOf("starred"));
    else newBoard.category.push("starred");

    requestBoardUpdate(id, newBoard);
    history.push("/");
  };

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

  const getBoardDetail = boardData => {
    setColor(boardData ? boardData.styleProperties.color : DEFAULT_NAV_COLOR);
  };

  useEffect(() => {
    if (!data) return;
    setColor(DEFAULT_NAV_COLOR);
    setBoards(data);
    setIsLoading(loading);
  }, [data, loading]);

  return (
    <AppContext.Provider
      value={{
        boards,
        color,
        device,
        dimensions,
        getBoardDetail,
        handleBoardStarClick,
        handleSearchClick,
        loading: isLoading,
        makeNewBoard,
        search
      }}
    >
      <Container>
        <NavHeader />
        {children}
        {search && <SearchPage />}
      </Container>
    </AppContext.Provider>
  );
};

export default withRouter(AppContainer);
