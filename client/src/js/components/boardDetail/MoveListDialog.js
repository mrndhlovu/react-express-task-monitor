import React, { useState } from "react";
import styled from "styled-components";

import CreateInput from "../sharedComponents/CreateInput";

const StyledDiv = styled.div`
  display: grid;
  background-color: #22242626;
  padding: 9px 9px;

  border-radius: 4px;
  width: 100%;
`;

const MoveListDialog = ({
  close,
  listPosition,
  backendUpdate,
  board,
  getSourceList
}) => {
  const sourceId = listPosition;
  const { lists } = board;
  const [targetPosition, setNewListPosition] = useState(sourceId);

  const handleChange = e => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === "" || re.test(e.target.value))
      setNewListPosition(parseInt(e.target.value));
    else setNewListPosition(sourceId);
  };

  const handleCreateClick = () => {
    const isValidPosition =
      targetPosition !== 0 && targetPosition <= lists.length;
    const updatedLists = [];
    const moveForward = targetPosition > sourceId;

    if (isValidPosition) {
      const moveList = getSourceList(sourceId).shift();

      const reOrderLists = () => [
        ...lists.slice(0, moveForward ? targetPosition : targetPosition - 1),
        { ...moveList, position: null },
        ...lists.slice(moveForward ? targetPosition : targetPosition - 1)
      ];

      reOrderLists().map(
        list => list.position !== sourceId && updatedLists.push(list)
      );

      const newList = [
        ...updatedLists.map((list, index) => ({
          ...list,
          position: index + 1
        }))
      ];

      const newBoard = { ...board, lists: newList };

      backendUpdate(newBoard, true);
    }
    return close();
  };

  return (
    <StyledDiv>
      <CreateInput
        buttonText="Move to position"
        close={close}
        placeholder="Enter new position"
        handleChange={handleChange}
        handleCreateClick={handleCreateClick}
      />
    </StyledDiv>
  );
};

export default MoveListDialog;
