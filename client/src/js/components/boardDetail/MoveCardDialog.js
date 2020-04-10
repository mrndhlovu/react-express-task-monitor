import React, { useState, useEffect } from "react";
import styled from "styled-components";

import DropdownList from "../sharedComponents/DropdownList";
import UIContainer from "../sharedComponents/UIContainer";
import { Header, Button, Divider } from "semantic-ui-react";
import { emptyFunction, getStringEquality } from "../../utils/appUtils";
import { useFetch } from "../../utils/hookUtils";

const StyledWrapper = styled.div`
  display: flex;
`;

const MoveCardDialog = ({ board, card, history, listPosition }) => {
  const [data, loading] = useFetch(history);

  const [boards, setBoards] = useState(null);
  const [move, setMove] = useState(false);
  const [moveTarget, setMoveTarget] = useState({
    board,
    cardPosition: card.position,
    listPosition,
  });

  const sourceList = moveTarget.board.lists.find(
    (list) => list.position === moveTarget.listPosition
  );

  const hasList = sourceList !== undefined;

  const handleSelection = (selection, destination) => {
    const isBoardsDropdown = getStringEquality(destination, "Board");
    const isListDropdown = getStringEquality(destination, "List");
    const isPositionDropdown = getStringEquality(destination, "Position");

    if (isBoardsDropdown)
      return setMoveTarget({ ...moveTarget, board: { ...selection } });
    if (isListDropdown)
      return setMoveTarget({ ...moveTarget, listPosition: selection });
    if (isPositionDropdown)
      return setMoveTarget({ ...moveTarget, cardPosition: selection });
  };

  useEffect(() => {
    if (!move) return emptyFunction();

    const moveCard = async () => {
      console.log("moveTarget: ", moveTarget);
    };
    moveCard();

    return () => {
      setMove(false);
    };
  });

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
          title={moveTarget.board.title}
          list={[...boards]}
          handleSelection={handleSelection}
        />
      )}
      <StyledWrapper>
        <DropdownList
          header="List"
          title={hasList && sourceList.title}
          list={hasList ? moveTarget.board.lists : []}
          handleSelection={handleSelection}
          hasList={hasList}
        />
        <DropdownList
          header="Position"
          list={hasList ? sourceList.cards : []}
          position={hasList && moveTarget.cardPosition}
          handleSelection={handleSelection}
          hasList={hasList}
        />
      </StyledWrapper>
      <Divider />
      <Button positive content="Move" compact onClick={() => setMove(true)} />
    </>
  );
};

export default MoveCardDialog;
