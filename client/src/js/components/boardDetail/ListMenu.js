import React, { Fragment, useContext, useEffect, useState } from "react";

import { Divider } from "semantic-ui-react";
import styled from "styled-components";
import { listMenuOptions } from "../../constants/constants";
import { BoardContext, MainContext } from "../../utils/contextUtils";

const Wrapper = styled.div`
  display: grid;
  min-width: 250px;

  &:first-child > :nth-child(1) {
    justify-self: center;
    align-self: center;
    padding-top: 10px;
    font-weight: 200;
  }

  &:first-child > :nth-child(3) {
    align-self: center;
    justify-self: start;
    font-weight: 200;
    padding: 0px 15px 15px 15px;
    font-weight: 400;
    width: 100%;
  }
`;

const DropdownItem = styled.li`
  font-size: 15px !important;
  cursor: pointer;
  list-style-type: none;
  padding: 8px 8px;
  border-radius: 3px;

  &:hover {
    background-color: #ebecf0;
  }
`;

const ListMenu = ({
  listPosition,
  handleShowCopyListClick,
  handleShowMoveListClick
}) => {
  const { backendUpdate, board } = useContext(BoardContext);
  const sourceId = listPosition;

  const { getSourceList } = useContext(MainContext);

  const [newBoard, setNewBoard] = useState(null);

  const handleMenuClick = key => {
    let lists = [];

    switch (key) {
      case "menu-item-1":
        handleShowMoveListClick();
        break;
      case "menu-item-2":
        handleShowCopyListClick();
        break;
      case "menu-item-3":
        const sourceListCards = getSourceList(sourceId).shift().cards;
        board.lists.map(
          list =>
            list.position !== sourceId &&
            list.cards.length > 0 &&
            list.cards.map(card =>
              sourceListCards.push({
                ...card,
                position: sourceListCards.length + 1
              })
            )
        );

        const updateBoard = {
          ...board,
          lists: [
            ...board.lists.map(list =>
              list.position !== sourceId
                ? { ...list, cards: [] }
                : { ...list, cards: [...sourceListCards] }
            )
          ]
        };

        setNewBoard(updateBoard);

        break;
      case "menu-item-4":
        setNewBoard({ ...board, lists });
        break;
      case "menu-item-5":
        board.lists.map(list => list.position !== sourceId && lists.push(list));
        setNewBoard({ ...board, lists });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!newBoard) return;
    backendUpdate(newBoard);
  }, [backendUpdate, newBoard]);

  return (
    <Wrapper>
      <div>
        <span>List Actions</span>
      </div>
      <Divider />
      <div>
        {listMenuOptions.map(option => (
          <Fragment key={option.key}>
            <DropdownItem
              onClick={() => handleMenuClick(`menu-item-${option.key}`)}
            >
              <span>{option.value}</span>
            </DropdownItem>
            {(option.key === 2 || option.key === 4) && <Divider />}
          </Fragment>
        ))}
      </div>
    </Wrapper>
  );
};

export default ListMenu;
