import React, { useState, useCallback, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { MainContext } from "../utils/contextUtils";
import { DEFAULT_NAV_COLOR } from "../constants/constants";
import { emptyFunction } from "../utils/appUtils";
import { requestNewBoard } from "../apis/apiRequests";
import { useDimensions } from "../utils/hookUtils";
import NavHeader from "../components/navBar/NavHeader";
import SearchPage from "../components/search/SearchPage";
import { Sidebar } from "semantic-ui-react";
import MobileSideMenu from "../components/navBar/MobileSideMenu";

const Container = styled.div`
  margin: 0;
  position: absolute;
  width: 100vw;
`;

const MainContainer = ({ children, history, auth }) => {
  const { authenticated, isLoading, data } = auth;
  const isHomePage = history.location.pathname === "/";
  const [visible, setVisible] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState();

  const [board, setBoard] = useState(null);
  const [boards, setBoards] = useState(null);
  const [search, setSearch] = useState(false);
  const [update, setUpdate] = useState(null);
  const [color, setColor] = useState(null);

  const { device, dimensions } = useDimensions();

  const handleSearchClick = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const makeNewBoard = (update) => setBoard(update);

  const getNavigationBoards = (data) => setUpdate(data);

  const getBoardColor = (boardColor) => setColor(boardColor);

  useEffect(() => {
    if (!board) return emptyFunction();
    const createBoard = async () => {
      requestNewBoard(board).then((res) => {
        try {
          setBoard(res.data);
          history.push(`/boards/id/${res.data._id}`);
        } catch (error) {}
      });
    };
    createBoard();
  }, [board, history]);

  useEffect(() => {
    setBoards(update);
  }, [update]);

  return (
    <MainContext.Provider
      value={{
        auth: { authenticated, user: data.data, loading: isLoading },
        boards,
        device,
        dimensions,
        getBoardColor,
        getNavigationBoards,
        handleSearchClick,
        history,
        makeNewBoard,
        search,
        isHomePage,
        showMobileMenu,
        setShowMobileMenu: () => setShowMobileMenu(!showMobileMenu),
      }}
    >
      <Container>
        <Sidebar.Pushable>
          <>
            {authenticated && (
              <>
                <NavHeader
                  color={isHomePage ? DEFAULT_NAV_COLOR : color}
                  setVisible={() => setVisible(!visible)}
                />
                <MobileSideMenu
                  visible={visible}
                  setVisible={() => setVisible(!visible)}
                  auth={{ authenticated, user: data.data, loading: isLoading }}
                />
              </>
            )}

            {children}
            {search && <SearchPage />}
          </>
        </Sidebar.Pushable>
      </Container>
    </MainContext.Provider>
  );
};

export default withRouter(MainContainer);
