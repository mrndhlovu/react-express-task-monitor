import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  Fragment,
} from "react";
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

const MainContainer = ({ children, history }) => {
  const isHomePage = history.location.pathname === "/";
  const [visible, setVisible] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState();

  const [board, setBoard] = useState(null);
  const [boards, setBoards] = useState(null);
  const [search, setSearch] = useState(false);
  const [update, setUpdate] = useState(null);
  const [color, setColor] = useState(null);
  const [auth, setAuth] = useState(null);

  const { device, dimensions } = useDimensions();

  const handleSearchClick = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const makeNewBoard = (update) => setBoard(update);

  const getNavigationBoards = (data) => setUpdate(data);

  const getNavData = useMemo(
    () => (auth, color) => {
      auth && setAuth(auth);
      color && setColor(color);
    },
    []
  );

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
      <Container>
        <Sidebar.Pushable>
          <Fragment>
            {auth && (
              <Fragment>
                <NavHeader
                  color={isHomePage ? DEFAULT_NAV_COLOR : color}
                  setVisible={() => setVisible(!visible)}
                  user={auth}
                />
                <MobileSideMenu
                  visible={visible}
                  setVisible={() => setVisible(!visible)}
                  user={auth}
                />
              </Fragment>
            )}
            {children}
            {search && <SearchPage />}
          </Fragment>
        </Sidebar.Pushable>
      </Container>
    </MainContext.Provider>
  );
};

export default withRouter(MainContainer);
