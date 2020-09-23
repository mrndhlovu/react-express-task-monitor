import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button } from "semantic-ui-react";

import { useBoardContext } from "../../utils/hookUtils";
import CopyListDialog from "./CopyListDialog";
import DropdownButton from "../shared/DropdownButton";
import EditableHeader from "../shared/EditableHeader";
import ListMenuOptions from "./ListMenuOptions";
import MoveListDialog from "./MoveListDialog";
import UIContainer from "../shared/UIContainer";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;
`;

const ListMenu = ({ title, listPosition, mobile, listId }) => {
  const {
    getSourceList,
    boardUpdateHandler,
    board,
    handleDeleteList,
  } = useBoardContext();

  const [header, setHeader] = useState("List actions");
  const [active, setActive] = useState(null);
  const sourceList = getSourceList(listId);

  const updateListHandler = (newList) => {
    board.lists.splice(board.lists.indexOf(sourceList), 1, newList);
    return boardUpdateHandler(board);
  };

  const handleDeleteAll = () => {
    boardUpdateHandler({ ...board, lists: [] });
    handleClose();
  };

  const handleMoveAllCards = () => {
    board.lists.map(
      (list) =>
        list._id !== listId &&
        list.cards.length !== 0 &&
        list.cards.map((card) => sourceList.cards.push(card))
    );

    const updateBoard = {
      ...board,
      lists: [
        ...board.lists.map((list) =>
          list._id === listId ? { ...sourceList } : { ...list, cards: [] }
        ),
      ],
    };

    boardUpdateHandler(updateBoard);
    handleClose();
  };

  const handleClose = () => {
    setHeader("List actions");
    setActive(null);
  };

  return (
    <HeaderWrapper>
      <EditableHeader
        editItem={sourceList}
        handleEditTitle={(list) => updateListHandler(list)}
      />

      <DropdownButton
        icon="ellipsis horizontal"
        labeled={false}
        button
        fluid={false}
        direction={mobile ? "left" : "right"}
        header={header}
        callback={() => handleClose()}
        color="transparent"
      >
        <UIContainer width="fit-content">
          {header === "List actions" && (
            <ListMenuOptions handleClick={setActive} setHeader={setHeader} />
          )}

          {active === "Move List" && (
            <MoveListDialog
              close={handleClose}
              listPosition={listPosition}
              title={title}
              listId={listId}
            />
          )}

          {active === "Copy List" && (
            <CopyListDialog
              close={() => handleClose()}
              listId={listId}
              title={title}
            />
          )}
          {header !== "List actions" && (
            <UIContainer padding="5px" width="200px">
              {active === "Move All Cards in This List" && (
                <Button
                  negative
                  content="Move"
                  fluid
                  compact
                  onClick={() => handleMoveAllCards()}
                />
              )}

              {active === "Delete All Lists" && (
                <Button
                  negative
                  content="Delete all lists"
                  fluid
                  compact
                  onClick={() => handleDeleteAll()}
                />
              )}

              {active === "Delete List" && (
                <Button
                  negative
                  content="Delete"
                  fluid
                  compact
                  onClick={() => handleDeleteList(listPosition - 1)}
                />
              )}
            </UIContainer>
          )}
        </UIContainer>
      </DropdownButton>
    </HeaderWrapper>
  );
};

ListMenu.propTypes = {
  mobile: PropTypes.bool.isRequired,
  listId: PropTypes.string.isRequired,
  listPosition: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default ListMenu;
