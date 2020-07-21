import React, { useState, useCallback, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Sidebar } from "semantic-ui-react";

import { DEFAULT_NAV_COLOR } from "../constants/constants";
import { MainContext } from "../utils/contextUtils";
import {
  requestNewBoard,
  requestUserUpdate,
  requestDeleteAccount,
} from "../apis/apiRequests";
import { useDimensions, useAuth, useAlert } from "../utils/hookUtils";
import NavHeader from "../components/navBar/NavHeader";
import SearchPage from "../components/search/SearchPage";
import withAlert from "../HOC/withAlert";

const Container = styled.div`
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

  const isHomePage = history.location.pathname === "/";
  const isTemplatePage = history.location.pathname === "/templates";

  const [background, setBackground] = useState({ image: "", color: "" });
  const [boards, setBoards] = useState(null);
  const [search, setSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNavBoard, setShowNavBoards] = useState({
    starred: true,
    recent: false,
    personal: false,
  });

  const { device, dimensions } = useDimensions();

  const PERSONAL_BOARDS = boards;

  const RECENT_BOARDS =
    boards && boards.filter((board) => user.viewedRecent.includes(board._id));
  const STARRED_BOARDS =
    boards && boards.filter((board) => user.starred.includes(board._id));

  const navBackground =
    !background.color && !background.image
      ? DEFAULT_NAV_COLOR
      : background.image
      ? "transparent"
      : background.color;

  const alertUser = (message, success = false, cb = () => {}, reason) =>
    notify({ reason, message, success, cb });

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
      .catch((error) => alertUser(error.response.data.message));
  };

  const navDataHandler = useCallback(
    (style, boards) => {
      style && setBackground({ ...background, ...style });
      boards && setBoards(boards);
    },
    [background]
  );

  const updateUserRequestHandler = async (data, field, cb = () => {}) => {
    const body = field ? { [field]: data } : data;
    await requestUserUpdate(body)
      .then((res) => {
        auth.authListener(res.data);
        cb && cb();
      })
      .catch((error) =>
        alertUser(error.response.data.message || error.response.data.error)
      );
  };

  const deleteAccountRequestHandler = async () => {
    await requestDeleteAccount()
      .then((res) => {
        alertUser(res.data.message, true);
        history.push("/login");
      })
      .catch((error) => alertUser(error.response.data.message));
  };

  useEffect(() => {
    (isHomePage || isTemplatePage || !background.image) &&
      setBackground({ image: "", color: "" });
  }, [isHomePage, isTemplatePage]);

  const context = {
    alertUser,
    boards,
    device,
    dimensions,
    handleSearchClick,
    history,
    isHomePage,
    makeNewBoard,
    navDataHandler,
    PERSONAL_BOARDS,
    RECENT_BOARDS,
    search,
    setShowMobileMenu: () => setShowMobileMenu(!showMobileMenu),
    showMobileMenu,
    STARRED_BOARDS,
    updateUserRequestHandler,
    deleteAccountRequestHandler,
    showNavBoard,
    toggleMenuHandler,
  };

  return (
    <MainContext.Provider value={context}>
      <Container data-test-id="app-container" bg={background}>
        {auth.authenticated && boards && <NavHeader color={navBackground} />}
        {search && <SearchPage />}
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
    navDataHandler: PropTypes.func.isRequired,
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

export default withRouter(withAlert(MainContainer));
