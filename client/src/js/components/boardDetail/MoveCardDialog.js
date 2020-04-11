import React, { useState, useEffect } from "react";
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

  id,
  handleBoardUpdate,
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
  const hasCards = hasList && sourceList.cards.length > 0;

  const handleSelection = (selection, destination) => {
    const isBoardsDropdown = checkStringEquality(destination, "Board");
    const isListDropdown = checkStringEquality(destination, "List");
    const isPositionDropdown = checkStringEquality(destination, "Position");

    if (isBoardsDropdown)
      return setMoveDestination({
        ...moveDestination,
        board: { ...selection },
      });
    if (isListDropdown)
      return setMoveDestination({
        ...moveDestination,
        listPosition: selection,
      });
    if (isPositionDropdown)
      return setMoveDestination({
        ...moveDestination,
        card: selection,
      });
  };

  useEffect(() => {
    if (!move) return emptyFunction();
    const { card } = moveDestination;

    if (!boardChanged && !listChanged) {
      const moveCard = async () => {
        sourceList.cards.splice(sourceList.cards.indexOf(originalCard), 1);
        sourceList.cards.splice(card.position - 1, 0, originalCard);
        const updatedList = {
          ...sourceList,
          cards: sourceList.cards.map(
            (card, index) => card && { ...card, position: index + 1 }
          ),
        };
        console.log("updatedList: ", updatedList.cards);
        originalBoard.lists.splice(
          originalBoard.lists.indexOf(sourceList),
          1,
          updatedList
        );
        handleBoardUpdate(originalBoard, "lists");
      };
      moveCard();
      setMove(false);
    } else if (boardChanged) {
      console.log("sourceList: ", sourceList.cards);
    }
    if (listChanged) {
    }

    return () => {
      setMove(false);
    };
  }, [
    boardChanged,
    handleBoardUpdate,
    listChanged,
    move,
    moveDestination,
    originalCard,
    sourceList,
    originalBoard,
  ]);

  useEffect(() => {
    if (!loading && !data) return emptyFunction();
    setBoards(data);
  }, [data, loading]);

  return (
    <>
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
      <Button positive content="Move" compact onClick={() => setMove(true)} />
    </>
  );
};

export default MoveCardDialog;
