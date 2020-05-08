import React, { useState, useEffect } from "react";
import styled from "styled-components";

import CopyListDialog from "./CopyListDialog";
import DropdownButton from "../sharedComponents/DropdownButton";
import EditableHeader from "../sharedComponents/EditableHeader";
import ListMenu from "./ListMenu";
import MoveListDialog from "./MoveListDialog";
import UIContainer from "../sharedComponents/UIContainer";

import { Button } from "semantic-ui-react";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;
`;

const ListHeader = ({
  title,
  handleBoardUpdate,
  listPosition,
  mobile,
  board,
  getSourceList,
  listId,
  ...otherProps
}) => {
  const [header, setHeader] = useState("List actions");
  const [hiddenDelete, setHideDelete] = useState(true);
  const [hideCopyList, setHideCopyList] = useState(true);
  const [hideDeleteAll, setHideDeleteAll] = useState(true);
  const [hideMoveCards, setHideMoveCards] = useState(true);
  const [hideMoveListOption, setHideMoveListOption] = useState(true);
  const [newBoard, setNewBoard] = useState(null);

  const handleDeleteList = () => {
    board.lists.splice(listPosition - 1, 1);

    setNewBoard(board);
  };

  const handleDeleteAll = () => {
    setNewBoard({ ...board, lists: [] });
  };

  const handleMoveAllCards = () => {
    const sourceList = getSourceList(listPosition - 1);

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
    handleBoardUpdate(newBoard);
    handleClose();

    setNewBoard(null);
  }, [handleBoardUpdate, newBoard]);

  return (
    <HeaderWrapper>
      <EditableHeader type="listHeader" title={title} sourceId={listId} />

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
              <ListMenu
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
              {...otherProps}
              close={handleClose}
              listPosition={listPosition}
              title={title}
              board={board}
              handleBoardUpdate={handleBoardUpdate}
              getSourceList={getSourceList}
            />
          )}

          {!hideCopyList && (
            <CopyListDialog
              {...otherProps}
              close={() => handleClose()}
              listPosition={listPosition}
              getSourceList={getSourceList}
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
                  onClick={() => handleDeleteList()}
                />
              )}
            </UIContainer>
          )}
        </UIContainer>
      </DropdownButton>
    </HeaderWrapper>
  );
};

export default ListHeader;
