import React, { useState } from "react";
import styled, { css } from "styled-components";

import { Star, Clock, Columns, MoreHorizontal } from "react-feather";
import { useAuth, useMainContext } from "../../utils/hookUtils";
import { requestUserUpdate } from "../../apis/apiRequests";

const Span = styled.h3`
  font-size: 10px !important;
  padding-left: 6px !important;
  text-transform: uppercase;
  margin: 0;
  z-index: 100;
  text-align: left;
`;

const Container = styled.div`
  padding: 15px 5px;
`;

const BoardItem = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  margin: 10px 0;
  cursor: pointer;
`;

const BoardLabelContext = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  z-index: 1;

  ${({ styles }) =>
    styles.image
      ? css`
          background: linear-gradient(0deg, rgba(34, 36, 38, 0.1), #d4d4d5),
            url(${styles.image});
          background-blend-mode: multiply;
        `
      : css`
          background: ${styles.color};
        `};
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavBoardsCategory = ({
  boards = [],
  header,
  starred = false,
  history,
}) => {
  const { auth, user } = useAuth();
  const { alertUser } = useMainContext();

  const [hidden, setHidden] = useState([]);
  const [isOverCurrent, setIsOverCurrent] = useState(null);

  const isHidden = hidden.includes(header);

  const getIcon = () => {
    switch (header) {
      case "Starred Boards":
        return <Star size={15} />;
      case "Recent Boards":
        return <Clock size={15} />;
      case "Personal Boards":
        return <Columns size={15} />;
      default:
        break;
    }
  };

  const toggleMenuHandler = (menu) => {
    if (isHidden) {
      const menuIndex = hidden.indexOf(menu);
      hidden.splice(menuIndex, 1);
      return setHidden(hidden);
    }
    setHidden(hidden.push(menu));
  };

  const starBoardHandler = async (id, starRef) => {
    if (!starRef) return;
    if (user.starred.includes(id))
      user.starred.splice(user.starred.indexOf(id));
    else user.starred.push(id);

    await requestUserUpdate({ starred: [...user.starred] }, id)
      .then((res) => {
        auth.authListener(res.data);
      })
      .catch((error) => alertUser(error.response.data.message));
  };

  const handleCardClick = (e, id, star) => {
    e.target.id ? starBoardHandler(id, star) : history.push(`/boards/id/${id}`);
  };

  return (
    <Container>
      <Header>
        <HeaderWrapper>
          <span> {getIcon()}</span>
          <Span>{header}</Span>
        </HeaderWrapper>
        <MoreHorizontal
          size={18}
          className="uiIconDark"
          onClick={() => toggleMenuHandler(header)}
        />
      </Header>

      {!isHidden &&
        boards.map(
          (board, index) =>
            board && (
              <BoardItem
                key={index}
                onMouseLeave={() => setIsOverCurrent(null)}
                onMouseEnter={() => setIsOverCurrent(board._id)}
                onClick={(e) => handleCardClick(e, board._id)}
              >
                <BoardLabelContext styles={board && board.styleProperties}>
                  <Span className="wordWrap uiTextWhite">{board.title}</Span>
                  {(isOverCurrent === board._id || starred) && (
                    <Star
                      id={index}
                      size={18}
                      onClick={(e) => handleCardClick(e, board._id, true)}
                      className={starred ? "uiStarYellow" : "uiStarWhite"}
                    />
                  )}
                </BoardLabelContext>
              </BoardItem>
            )
        )}
    </Container>
  );
};

export default NavBoardsCategory;
