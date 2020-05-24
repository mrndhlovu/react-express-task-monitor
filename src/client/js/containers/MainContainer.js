import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  Fragment,
} from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { Sidebar } from "semantic-ui-react";

import { DEFAULT_NAV_COLOR } from "../constants/constants";
import { emptyFunction } from "../utils/appUtils";
import { MainContext } from "../utils/contextUtils";
import { requestNewBoard } from "../apis/apiRequests";
import { useDimensions } from "../utils/hookUtils";
import MobileSideMenu from "../components/navBar/MobileSideMenu";
import NavHeader from "../components/navBar/NavHeader";
import SearchPage from "../components/search/SearchPage";

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

const MainContainer = ({ children, history, auth }) => {
  const isHomePage = history.location.pathname === "/";
  const [visible, setVisible] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [background, setBackground] = useState({ image: "", color: "" });
  const [board, setBoard] = useState(null);
  const [boards, setBoards] = useState(null);
  const [create, setCreate] = useState(false);
  const [search, setSearch] = useState(false);
  const [update, setUpdate] = useState(null);

  const { device, dimensions } = useDimensions();

  const navBackground =
    !background.color && !background.image
      ? DEFAULT_NAV_COLOR
      : background.image
      ? "transparent"
      : background.color;

  const handleSearchClick = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const makeNewBoard = (update) => {
    setCreate(true);
    setBoard(update);
  };

  const getNavigationBoards = (data) => setUpdate(data);

  const getNavData = useMemo(
    () => (style) => {
      setBackground({ ...background, ...style });
    },
    []
  );

  useEffect(() => {
    isHomePage && setBackground({ image: "", color: "" });
  }, [isHomePage]);

  useEffect(() => {
    if (!create) return emptyFunction();
    const createBoard = async () => {
      await requestNewBoard(board).then((res) => {
        setBoard(res.data);
        return history.push(`/boards/id/${res.data._id}`);
      });
    };
    createBoard();
    setCreate(false);
  }, [board, history.push]);

  useEffect(() => {
    setBoards(update);
  }, [update]);

  return (
    <MainContext.Provider
      value={{
        auth,
        boards,
        device,
        dimensions,
        getNavigationBoards,
        handleSearchClick,
        history,
        makeNewBoard,
        search,
        isHomePage,
        showMobileMenu,
        getNavData,
        setShowMobileMenu: () => setShowMobileMenu(!showMobileMenu),
      }}
    >
      <AppWrapper data-test-id="app-container" bg={{ ...background }}>
        <Sidebar.Pushable>
          <Fragment>
            {auth.authenticated && (
              <Fragment>
                <NavHeader
                  color={navBackground}
                  setVisible={() => setVisible(!visible)}
                />
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

export default withRouter(MainContainer);
