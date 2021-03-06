import React, { useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import { Star, Clock, Columns, MoreHorizontal } from "react-feather";

import { useAuth, useMainContext } from "../../utils/hookUtils";

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

const NavBoardsCategory = ({ boards = [], header, starred = false }) => {
  const { user } = useAuth();
  const {
    updateUserRequestHandler,
    showNavBoard,
    toggleMenuHandler,
    history,
  } = useMainContext();
  const field = header.toLowerCase();
  const hasBoards = boards.length > 0;

  const [isOverCurrent, setIsOverCurrent] = useState(null);

  const getIcon = () => {
    switch (header) {
      case "Starred":
        return <Star size={15} />;
      case "Recent":
        return <Clock size={15} />;
      case "Personal":
        return <Columns size={15} />;
      default:
        break;
    }
  };

  const starBoardHandler = async (id, starRef) => {
    if (!starRef) return;
    if (user.starred.includes(id))
      user.starred.splice(user.starred.indexOf(id));
    else user.starred.push(id);

    updateUserRequestHandler({ starred: [...user.starred] });
  };

  const cardClickHandler = (e, id, star) => {
    e.target.id ? starBoardHandler(id, star) : history.push(`/boards/id/${id}`);
  };

  return (
    hasBoards && (
      <Container>
        <Header>
          <HeaderWrapper>
            <span> {getIcon()}</span>
            <Span>{`${header} Boards`}</Span>
          </HeaderWrapper>
          <MoreHorizontal
            size={18}
            className="uiIconDark"
            onClick={() => toggleMenuHandler(header)}
          />
        </Header>

        {showNavBoard[field] &&
          boards.map((board, index) => (
            <BoardItem
              key={index}
              onMouseLeave={() => setIsOverCurrent(null)}
              onMouseEnter={() => setIsOverCurrent(board._id)}
              onClick={(e) => cardClickHandler(e, board._id)}
            >
              <BoardLabelContext styles={board.styleProperties}>
                <Span className="wordWrap uiTextWhite">{board.title}</Span>
                {(isOverCurrent === board._id || starred) && (
                  <Star
                    id={index}
                    size={18}
                    onClick={(e) => cardClickHandler(e, board._id, true)}
                    className={starred ? "uiStarYellow" : "uiStarWhite"}
                  />
                )}
              </BoardLabelContext>
            </BoardItem>
          ))}
      </Container>
    )
  );
};

NavBoardsCategory.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  header: PropTypes.string.isRequired,
  starred: PropTypes.bool,
};

export default NavBoardsCategory;
