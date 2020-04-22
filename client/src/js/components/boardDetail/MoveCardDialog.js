import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";

import { emptyFunction, checkStringEquality } from "../../utils/appUtils";
import { Header, Button, Divider } from "semantic-ui-react";
import { useFetch } from "../../utils/hookUtils";
import DropdownList from "../sharedComponents/DropdownList";
import UIContainer from "../sharedComponents/UIContainer";

const StyledWrapper = styled.div`
  display: flex;
`;

const MoveCardDialog = ({
  originalBoard,
  originalCard,
  history,
  originalListPosition,
  handleBoardUpdate,
  id,
}) => {
  const [data, loading] = useFetch(history);

  const [boards, setBoards] = useState(null);
  const [move, setMove] = useState(false);
  const [moveDestination, setMoveDestination] = useState({
    board: originalBoard,
    card: originalCard,
    listPosition: originalListPosition,
  });

  const sourceList = moveDestination.board.lists.find(
    (list) => list.position === moveDestination.listPosition
  );

  const hasList = sourceList !== undefined;
  const listChanged = originalListPosition !== moveDestination.listPosition;
  const boardChanged = originalBoard._id !== moveDestination.board._id;
  const cardPositionChanged = originalCard._id !== moveDestination.card._id;
  const hasCards = hasList && sourceList.cards.length > 0;

  const handleSelection = (selection, dropDownId, position) => {
    const isBoardsDropdown = checkStringEquality(dropDownId, "Board");
    const isListDropdown = checkStringEquality(dropDownId, "List");
    const isPositionDropdown = checkStringEquality(dropDownId, "Position");

    if (isBoardsDropdown)
      return setMoveDestination({
        ...moveDestination,
        board: { ...selection },
        listPosition: position,
      });
    if (isListDropdown)
      return setMoveDestination({
        ...moveDestination,
        listPosition: position,
      });
    if (isPositionDropdown)
      return setMoveDestination({
        ...moveDestination,
        card: selection,
      });
  };

  useEffect(() => {
    if (!move) return emptyFunction();
    const { card, board, listPosition } = moveDestination;
    const removeCardFromSource = () => {
      const originalList = originalBoard.lists.find(
        (list) => list.position === originalListPosition
      );
      originalList.cards.splice(originalList.cards.indexOf(originalCard), 1);
      const updatedOriginalList = {
        ...originalList,
        cards: originalList.cards.map(
          (card, index) => card && { ...card, position: index + 1 }
        ),
      };

      originalBoard.lists.splice(
        originalBoard.lists.indexOf(originalList),
        1,
        updatedOriginalList
      );
    };

    const getUpdatedTargetList = () => {
      sourceList.cards.splice(card.position - 1, 0, originalCard);
      return {
        ...sourceList,
        cards: sourceList.cards.map(
          (card, index) => card && { ...card, position: index + 1 }
        ),
      };
    };

    if (!boardChanged && !listChanged) {
      sourceList.cards.splice(sourceList.cards.indexOf(originalCard), 1);
      const updatedList = getUpdatedTargetList();

      originalBoard.lists.splice(
        originalBoard.lists.indexOf(sourceList),
        1,
        updatedList
      );
      handleBoardUpdate(originalBoard, "lists");
      setMove(false);
    } else if (boardChanged) {
      removeCardFromSource(handleBoardUpdate);

      const targetBoard = boards
        .filter((boardItem) => boardItem._id === board._id)
        .shift();
      const targetPosition = listPosition === 0 ? 1 : listPosition;

      const targetList = targetBoard.lists
        .filter((list) => list.position === targetPosition)
        .shift();

      targetList.cards.splice(card.position - 1, 0, originalCard);

      const updatedList = {
        ...targetList,
        cards: targetList.cards.map(
          (card, index) => card && { ...card, position: index + 1 }
        ),
      };

      targetBoard.lists.splice(
        targetBoard.lists.indexOf(targetList),
        1,
        updatedList
      );

      handleBoardUpdate(originalBoard, "lists", null, () => {
        handleBoardUpdate(targetBoard, "lists", null, null, targetBoard._id);
        setTimeout(() => {
          history.push(`/boards/id/${targetBoard._id}`);
        }, 500);
      });
      setMove(false);
    } else if (listChanged) {
      removeCardFromSource();
      const updatedList = getUpdatedTargetList();

      originalBoard.lists.splice(
        originalBoard.lists.indexOf(sourceList),
        1,
        updatedList
      );
      handleBoardUpdate(originalBoard, "lists");
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
    originalListPosition,
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
      <StyledWrapper>
        <DropdownList
          header="List"
          title={hasList && sourceList.title}
          list={hasList ? moveDestination.board.lists : []}
          handleSelection={handleSelection}
          hasList={hasList}
          current={originalListPosition}
        />
        <DropdownList
          header="Position"
          list={hasList ? sourceList.cards : []}
          position={hasCards ? moveDestination.card.position : 1}
          handleSelection={handleSelection}
          hasList={hasList}
          hasCards={hasCards}
          current={originalCard._id}
        />
      </StyledWrapper>
      <Divider />
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
