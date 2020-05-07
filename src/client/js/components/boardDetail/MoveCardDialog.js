import React, { useState, useEffect, Fragment } from "react";
import _debounce from "debounce";

import { Header, Button } from "semantic-ui-react";

import { emptyFunction, stringsEqual } from "../../utils/appUtils";
import { useFetch } from "../../utils/hookUtils";
import DropdownList from "../sharedComponents/DropdownList";
import UIContainer from "../sharedComponents/UIContainer";
import UIDivider from "../sharedComponents/UIDivider";

const style = {
  display: "flex",
  padding: 0,
};

const MoveCardDialog = ({
  originalBoard,
  originalCard,
  history,
  sourceListId,
  handleBoardUpdate,
}) => {
  const [data, loading] = useFetch(history);

  const [boards, setBoards] = useState(null);
  const [move, setMove] = useState(false);
  const [moveDestination, setMoveDestination] = useState({
    board: originalBoard,
    card: originalCard,
    targetId: sourceListId,
    position: 1,
  });

  const sourceList = moveDestination.board.lists.find(
    (list) => list._id === moveDestination.targetId
  );

  const hasList = sourceList !== undefined;

  const listChanged = sourceListId !== moveDestination.targetId;
  const boardChanged = originalBoard._id !== moveDestination.board._id;
  const cardPositionChanged = originalCard._id !== moveDestination.card._id;
  const hasCards = hasList && sourceList.cards.length > 0;

  const handleSelection = (selection, dropDownId, position) => {
    const isBoardsDropdown = stringsEqual(dropDownId, "Board");
    const isListDropdown = stringsEqual(dropDownId, "List");
    const isPositionDropdown = stringsEqual(dropDownId, "Position");

    if (isBoardsDropdown)
      return setMoveDestination({
        ...moveDestination,
        board: selection,
        targetId: selection.lists[0]._id,
        position,
      });
    if (isListDropdown)
      return setMoveDestination({
        ...moveDestination,
        targetId: selection._id,
        position,
      });
    if (isPositionDropdown)
      return setMoveDestination({
        ...moveDestination,
        card: selection,
        position,
      });
  };

  useEffect(() => {
    if (!move) return emptyFunction();
    const { board, targetId, position } = moveDestination;

    const removeCardFromSource = () => {
      const source = originalBoard.lists.find(
        (list) => list._id === sourceListId
      );
      source.cards.splice(source.cards.indexOf(originalCard), 1);
    };

    const updatedTargetList = () => {
      sourceList.cards.splice(position, 0, originalCard);
      return sourceList;
    };

    if (!boardChanged && !listChanged) {
      sourceList.cards.splice(sourceList.cards.indexOf(originalCard), 1);
      updatedTargetList();

      handleBoardUpdate(originalBoard, "lists");
      setMove(false);
    } else if (boardChanged) {
      removeCardFromSource();

      const targetList = board.lists
        .filter((list) => list._id === targetId)
        .shift();
      targetList.cards.splice(position, 0, originalCard);

      handleBoardUpdate(originalBoard, "lists", null, () => {
        handleBoardUpdate(board, "lists", null, null, board._id);

        _debounce(history.push(`/boards/id/${targetBoard._id}`), 500);
      });
      setMove(false);
    } else if (listChanged) {
      removeCardFromSource();
      updatedTargetList();

      handleBoardUpdate(board, "lists");
      setMove(false);
    }
  }, [
    boardChanged,
    boards,
    handleBoardUpdate,
    history,
    listChanged,
    move,
    moveDestination,
    originalBoard,
    originalCard,
    sourceList,
  ]);

  useEffect(() => {
    if (!loading && !data) return emptyFunction();
    setBoards(data);
  }, [data, loading]);

  return (
    <Fragment>
      <UIContainer>
        <Header content="Select Destination" as="h4" />
      </UIContainer>
      {boards && (
        <DropdownList
          header="Board"
          title={moveDestination.board.title}
          list={[...boards]}
          handleSelection={handleSelection}
          current={originalBoard._id}
        />
      )}
      <UIContainer display={style}>
        <DropdownList
          header="List"
          title={hasList && sourceList.title}
          list={hasList ? moveDestination.board.lists : []}
          handleSelection={handleSelection}
          hasList={hasList}
          current={sourceListId}
        />
        <DropdownList
          header="Position"
          list={hasList ? sourceList.cards : []}
          handleSelection={handleSelection}
          hasList={hasList}
          hasCards={hasCards}
          current={originalCard._id}
          position={moveDestination.position}
        />
      </UIContainer>
      <UIDivider />
      <Button
        positive={boardChanged || listChanged || cardPositionChanged}
        disabled={!boardChanged && !listChanged && !cardPositionChanged}
        content="Move"
        compact
        onClick={() => setMove(true)}
      />
    </Fragment>
  );
};

export default MoveCardDialog;
