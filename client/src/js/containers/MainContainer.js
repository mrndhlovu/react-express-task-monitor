import React, { useState, useCallback, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { AppContext } from "../utils/contextUtils";
import { DEFAULT_NAV_COLOR } from "../constants/constants";
import { emptyFunction } from "../utils/appUtils";
import { requestNewBoard } from "../apis/apiRequests";
import { useDimensions } from "../utils/hookUtils";
import NavHeader from "../components/navBar/NavHeader";
import SearchPage from "../components/search/SearchPage";

const Container = styled.div``;

const MainContainer = ({ children, history, auth }) => {
  const { authenticated, isLoading, data } = auth;
  const isHomePage = history.location.pathname === "/";

  const [board, setBoard] = useState(null);
  const [boards, setBoards] = useState(null);
  const [search, setSearch] = useState(false);
  const [update, setUpdate] = useState(null);

  const { device, dimensions } = useDimensions();

  const handleSearchClick = useCallback(e => {
    setSearch(e.target.value);
  }, []);

  const makeNewBoard = update => setBoard(update);

  const getNavigationBoards = data => setUpdate(data);

  useEffect(() => {
    if (!board) return emptyFunction();
    const createBoard = async () => {
      requestNewBoard(board).then(res => {
        try {
          history.push(`/boards/id/${res.data._id}`);
        } catch (error) {}
      });
    };
    createBoard();
    setBoard(null);
  }, [board, history]);

  useEffect(() => {
    setBoards(update);
  }, [update]);

  return (
    <AppContext.Provider
      value={{
        auth: { authenticated, user: data.data, loading: isLoading },
        device,
        dimensions,
        handleSearchClick,
        history,
        makeNewBoard,
        search,
        getNavigationBoards,
        boards
      }}
    >
      {authenticated && (
        <NavHeader color={isHomePage ? DEFAULT_NAV_COLOR : "transparent"} />
      )}
      <Container>
        {children}
        {search && <SearchPage />}
      </Container>
    </AppContext.Provider>
  );
};

export default withRouter(MainContainer);
