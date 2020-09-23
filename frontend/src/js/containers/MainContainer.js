import React, { useState, useCallback, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Sidebar } from "semantic-ui-react";

import { MainContext } from "../utils/contextUtils";
import {
  requestNewBoard,
  requestUserUpdate,
  requestDeleteAccount,
  requestBoardList,
} from "../apis/apiRequests";
import { emptyFunction } from "../utils/appUtils";
import { useDimensions, useAuth } from "../utils/hookUtils";
import NavHeader from "../components/navBar/NavHeader";

const Container = styled.div`
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100vw;
  ${({ bg }) =>
    bg?.image ? `background: url(${bg?.image})` : `background:${bg?.color}`};
  background-size: contain;
  background-repeat: no-repeat;
  background-size: cover;
`;

const MainContainer = ({ children, history }) => {
  const { auth, user, handleLogOut, alertUser } = useAuth();

  const isHomePage = history.location.pathname === "/";

  const [boards, setBoards] = useState(undefined);
  const [search, setSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeBoard, setActiveBoard] = useState(undefined);

  const [showNavBoard, setShowNavBoards] = useState({
    starred: true,
    recent: false,
    personal: false,
  });

  const { device, dimensions } = useDimensions();

  const PERSONAL_BOARDS = user && boards;

  const RECENT_BOARDS =
    PERSONAL_BOARDS &&
    PERSONAL_BOARDS.filter((board) => user.viewedRecent.includes(board._id));
  const STARRED_BOARDS =
    PERSONAL_BOARDS &&
    PERSONAL_BOARDS.filter((board) => user.starred.includes(board._id));

  const toggleMenuHandler = (name) => {
    const field = name.toLowerCase();
    setShowNavBoards({ ...showNavBoard, [field]: !showNavBoard[field] });
  };

  const handleSearchClick = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const makeNewBoard = async (board) => {
    await requestNewBoard(board)
      .then((res) => {
        return history.push(`/boards/id/${res.data._id}`);
      })
      .catch((error) => alertUser(error.response?.data.message));
  };

  const updateBoardsListHandler = (newList) => setBoards(newList);

  const updateUserRequestHandler = async (data, field, cb = () => {}) => {
    const body = field ? { [field]: data } : data;
    await requestUserUpdate(body)
      .then((res) => {
        auth.authListener(res.data);
        cb && cb();
      })
      .catch((error) =>
        alertUser(error.response?.data.message || error.response?.data.error)
      );
  };

  const deleteAccountRequestHandler = async () => {
    await requestDeleteAccount()
      .then((res) => {
        alertUser(res.data.message, true);
        history.push("/login");
      })
      .catch((error) => alertUser(error.response?.data.message));
  };

  useEffect(() => {
    if (boards || !auth.authenticated) return emptyFunction();
    const getBoards = async () => {
      await requestBoardList()
        .then((res) => setBoards(res.data))
        .catch((error) => {
          handleLogOut();
          alertUser(error.response?.data);
        });
    };
    getBoards();
  }, [alertUser, boards, auth.authenticated, handleLogOut]);

  const context = {
    activeBoard,
    alertUser,
    boards,
    deleteAccountRequestHandler,
    device,
    dimensions,
    handleSearchClick,
    history,
    isHomePage,
    makeNewBoard,
    PERSONAL_BOARDS,
    RECENT_BOARDS,
    search,
    setActiveBoard,
    setShowMobileMenu: () => setShowMobileMenu(!showMobileMenu),
    showMobileMenu,
    showNavBoard,
    STARRED_BOARDS,
    toggleMenuHandler,
    updateBoardsListHandler,
    updateUserRequestHandler,
  };

  return (
    <MainContext.Provider value={context}>
      <Container data-test-id="app-container" bg={activeBoard?.styleProperties}>
        <NavHeader authenticated={boards && auth.authenticated} />
        <Sidebar.Pushable>{children}</Sidebar.Pushable>
      </Container>
    </MainContext.Provider>
  );
};

MainContainer.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  context: PropTypes.shape({
    alertUser: PropTypes.func.isRequired,
    boards: PropTypes.arrayOf(PropTypes.object),
    device: PropTypes.shape({
      mobile: PropTypes.bool.isRequired,
      tablet: PropTypes.bool.isRequired,
      desktop: PropTypes.bool.isRequired,
    }),
    handleSearchClick: PropTypes.func.isRequired,
    isHomePage: PropTypes.bool.isRequired,
    makeNewBoard: PropTypes.func.isRequired,
    PERSONAL_BOARD: PropTypes.object,
    RECENT_BOARDS: PropTypes.object,
    search: PropTypes.bool.isRequired,
    setShowMobileMenu: PropTypes.func.isRequired,
    showMobileMenu: PropTypes.bool.isRequired,
    STARRED_BOARDS: PropTypes.object,
    updateUserRequestHandler: PropTypes.func.isRequired,
    deleteAccountRequestHandler: PropTypes.func.isRequired,
    showNavBoard: PropTypes.shape({
      starred: PropTypes.bool.isRequired,
      recent: PropTypes.bool.isRequired,
      personal: PropTypes.bool.isRequired,
    }).isRequired,
    toggleMenuHandler: PropTypes.func.isRequired,
  }),
};

export default withRouter(MainContainer);
