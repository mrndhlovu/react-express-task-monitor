import React, { useState, useCallback } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { AppContext } from "../utils/contextUtils";
import { DEFAULT_NAV_COLOR } from "../constants/constants";
import { requestNewBoard } from "../apis/apiRequests";
import { useDimensions } from "../utils/hookUtils";
import NavHeader from "../components/navBar/NavHeader";
import SearchPage from "../components/search/SearchPage";

const Container = styled.div`
  position: relative;
  height: 100vh;
  background-color: ${props => props.color};
`;

const MainContainer = ({ children, history, auth }) => {
  const { authenticated, isLoading, data } = auth;

  const [color, setColor] = useState(DEFAULT_NAV_COLOR);
  const [search, setSearch] = useState(false);
  const { device, dimensions } = useDimensions();

  const handleSearchClick = useCallback(e => {
    setSearch(e.target.value);
  }, []);

  const makeNewBoard = update => {
    requestNewBoard(update).then(res => {
      try {
        return history.push(`/boards/id/${res.data._id}`);
      } catch (error) {}
    });
  };

  const getBoardDetail = useCallback(
    boardData =>
      setColor(boardData ? boardData.styleProperties.color : DEFAULT_NAV_COLOR),
    []
  );

  return (
    <AppContext.Provider
      value={{
        auth: { authenticated, user: data.data, loading: isLoading },
        color,
        device,
        dimensions,
        getBoardDetail,
        handleSearchClick,
        makeNewBoard,
        search,
        history
      }}
    >
      <Container color={color === DEFAULT_NAV_COLOR ? "#fff" : color}>
        {authenticated && <NavHeader />}
        {children}
        {search && <SearchPage />}
      </Container>
    </AppContext.Provider>
  );
};

export default withRouter(MainContainer);
