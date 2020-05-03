import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  Fragment,
} from "react";
import { withRouter } from "react-router-dom";

import { Sidebar } from "semantic-ui-react";

import { DEFAULT_NAV_COLOR } from "../constants/constants";
import { emptyFunction } from "../utils/appUtils";
import { MainContext } from "../utils/contextUtils";
import { requestNewBoard } from "../apis/apiRequests";
import { useDimensions } from "../utils/hookUtils";
import MobileSideMenu from "../components/navBar/MobileSideMenu";
import NavHeader from "../components/navBar/NavHeader";
import SearchPage from "../components/search/SearchPage";
import UIContainer from "../components/sharedComponents/UIContainer";

const style = {
  padding: "0",
  margin: 0,
  position: "absolute",
  width: "100vw",
};

const MainContainer = ({ children, history, auth }) => {
  const isHomePage = history.location.pathname === "/";
  const [visible, setVisible] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [board, setBoard] = useState(null);
  const [boards, setBoards] = useState(null);
  const [color, setColor] = useState(null);
  const [search, setSearch] = useState(false);
  const [update, setUpdate] = useState(null);

  const { device, dimensions } = useDimensions();

  const handleSearchClick = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const makeNewBoard = (update) => setBoard(update);

  const getNavigationBoards = (data) => setUpdate(data);

  const getNavData = useMemo(() => (color) => color && setColor(color), []);

  useEffect(() => {
    history.location.pathname === "/" && setColor(null);
  }, [history]);

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
      <UIContainer display={style}>
        <Sidebar.Pushable>
          <Fragment>
            {auth.authenticated && (
              <Fragment>
                <NavHeader
                  color={color ? color : DEFAULT_NAV_COLOR}
                  setVisible={() => setVisible(!visible)}
                />
                <MobileSideMenu
                  visible={visible}
                  setVisible={() => setVisible(!visible)}
                  history={history}
                />
              </Fragment>
            )}
            {children}
            {search && <SearchPage />}
          </Fragment>
        </Sidebar.Pushable>
      </UIContainer>
    </MainContext.Provider>
  );
};

export default withRouter(MainContainer);
