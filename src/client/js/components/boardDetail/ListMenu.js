import React, { useState, useEffect } from "react";
import styled from "styled-components";

import CopyListDialog from "./CopyListDialog";
import DropdownButton from "../sharedComponents/DropdownButton";
import EditableHeader from "../sharedComponents/EditableHeader";
import ListMenuOptions from "./ListMenuOptions";
import MoveListDialog from "./MoveListDialog";
import UIContainer from "../sharedComponents/UIContainer";

import { Button } from "semantic-ui-react";
import { useBoardContext } from "../../utils/hookUtils";

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
  const [hiddenDelete, setHideDelete] = useState(true);
  const [hideCopyList, setHideCopyList] = useState(true);
  const [hideDeleteAll, setHideDeleteAll] = useState(true);
  const [hideMoveCards, setHideMoveCards] = useState(true);
  const [hideMoveListOption, setHideMoveListOption] = useState(true);
  const [newBoard, setNewBoard] = useState(null);

  const handleDeleteAll = () => {
    setNewBoard({ ...board, lists: [] });
  };

  const handleMoveAllCards = () => {
    const sourceList = getSourceList(listId);

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

    setNewBoard(updateBoard);
  };

  const handleClose = () => {
    setHeader("List actions");
    setHideMoveListOption(true);
    setHideCopyList(true);
    setHideMoveCards(true);
    setHideDelete(true);
    setHideDeleteAll(true);
  };

  useEffect(() => {
    if (!newBoard) return;
    boardUpdateHandler(newBoard);
    handleClose();

    setNewBoard(null);
  }, [boardUpdateHandler, newBoard]);

  return (
    <HeaderWrapper>
      <EditableHeader
        board={board}
        sourceId={listId}
        title={title}
        type="listHeader"
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
          {hideCopyList &&
            hideMoveListOption &&
            hideCopyList &&
            hideMoveCards &&
            hiddenDelete &&
            hideDeleteAll && (
              <ListMenuOptions
                handleShowCopyListClick={() => setHideCopyList(!hideCopyList)}
                handleDeleteListClick={() => setHideDelete(!hiddenDelete)}
                handleMoveAllCards={() => setHideMoveCards(!hideMoveCards)}
                handleDeleteAllClick={() => setHideDeleteAll(!hideDeleteAll)}
                handleMoveCardsClick={() => setHideMoveCards(!hideMoveCards)}
                handleShowMoveListClick={() =>
                  setHideMoveListOption(!hideMoveListOption)
                }
                setHeader={setHeader}
              />
            )}

          {!hideMoveListOption && (
            <MoveListDialog
              close={handleClose}
              listPosition={listPosition}
              title={title}
              listId={listId}
            />
          )}

          {!hideCopyList && (
            <CopyListDialog
              close={() => handleClose()}
              listId={listId}
              title={title}
            />
          )}
          {header !== "List actions" && (
            <UIContainer padding="5px" width="200px">
              {!hideMoveCards && (
                <Button
                  negative
                  content="Move"
                  fluid
                  compact
                  onClick={() => handleMoveAllCards()}
                />
              )}

              {!hideDeleteAll && (
                <Button
                  negative
                  content="Delete all lists"
                  fluid
                  compact
                  onClick={() => handleDeleteAll()}
                />
              )}

              {!hiddenDelete && (
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

export default ListMenu;
