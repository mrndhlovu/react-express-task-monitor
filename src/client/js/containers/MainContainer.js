import React, { useState, useCallback, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { Sidebar } from "semantic-ui-react";

import { DEFAULT_NAV_COLOR } from "../constants/constants";
import { MainContext } from "../utils/contextUtils";
import { requestNewBoard } from "../apis/apiRequests";
import { useDimensions, useAuth, useAlert } from "../utils/hookUtils";
import MobileSideMenu from "../components/navBar/MobileSideMenu";
import NavHeader from "../components/navBar/NavHeader";
import SearchPage from "../components/search/SearchPage";
import withAlert from "../HOC/withAlert";

const AppWrapper = styled.div`
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100vw;
  ${({ bg }) =>
    bg.image ? `background: url(${bg.image})` : `background:${bg.color}`};
  background-size: contain;
  background-repeat: no-repeat;
  background-size: cover;
`;

const MainContainer = ({ children, history }) => {
  const { auth, user } = useAuth();
  const { notify } = useAlert();

  const alertUser = (message, success = false, cb = () => {}, reason) =>
    notify({ reason, message, success, cb });

  const isHomePage = history.location.pathname === "/";
  const isTemplatePage = history.location.pathname === "/templates";

  const [background, setBackground] = useState({ image: "", color: "" });
  const [boards, setBoards] = useState(null);
  const [search, setSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [visible, setVisible] = useState(false);

  const { device, dimensions } = useDimensions();

  const STARRED_BOARDS =
    boards && boards.map((board) => user.starred.includes(board._id) && board);

  const PERSONAL_BOARDS =
    boards && boards.map((board) => !user.starred.includes(board._id) && board);

  const RECENT_BOARDS =
    boards &&
    boards.map((board) => user.viewedRecent.includes(board._id) && board);

  const navBackground =
    !background.color && !background.image
      ? DEFAULT_NAV_COLOR
      : background.image
      ? "transparent"
      : background.color;

  const handleSearchClick = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const makeNewBoard = async (board) => {
    await requestNewBoard(board)
      .then((res) => {
        return history.push(`/boards/id/${res.data._id}`);
      })
      .catch((error) => alertUser(error.response.data.message));
  };

  const navDataHandler = useCallback(
    (style, boards) => {
      style && setBackground({ ...background, ...style });
      boards && setBoards(boards);
    },
    [background]
  );

  useEffect(() => {
    (isHomePage || isTemplatePage || !background.image) &&
      setBackground({ image: "", color: "" });
  }, [isHomePage, isTemplatePage]);

  return (
    <MainContext.Provider
      value={{
        boards,
        device,
        dimensions,
        navDataHandler,
        alertUser,
        handleSearchClick,
        history,
        isHomePage,
        makeNewBoard,
        search,
        setShowMobileMenu: () => setShowMobileMenu(!showMobileMenu),
        showMobileMenu,
        STARRED_BOARDS,
        PERSONAL_BOARDS,
        RECENT_BOARDS,
      }}
    >
      <AppWrapper data-test-id="app-container" bg={background}>
        <Sidebar.Pushable>
          <Fragment>
            {auth.authenticated && (
              <Fragment>
                {boards && (
                  <NavHeader
                    color={navBackground}
                    setVisible={() => setVisible(!visible)}
                  />
                )}
                <MobileSideMenu
                  visible={visible}
                  setVisible={setVisible}
                  history={history}
                />
              </Fragment>
            )}
            {children}
            {search && <SearchPage />}
          </Fragment>
        </Sidebar.Pushable>
      </AppWrapper>
    </MainContext.Provider>
  );
};

export default withRouter(withAlert(MainContainer));
