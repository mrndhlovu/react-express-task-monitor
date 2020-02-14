import React, { useState, useContext } from "react";
import styled from "styled-components";

import CreateInput from "../sharedComponents/CreateInput";
import { AppContext, BoardContext } from "../../utils/contextUtils";

const StyledDiv = styled.div`
  display: grid;
  background-color: #22242626;
  padding: 9px 9px;

  border-radius: 4px;
  width: 100%;
`;

const CopyListDialog = ({ close, title, listPosition }) => {
  const { board, getSourceList } = useContext(AppContext);
  const { makeBoardUpdate } = useContext(BoardContext);
  const sourceId = listPosition;

  const [newListTitle, setListTitle] = useState(title);

  const handleChange = e => {
    setListTitle(e.target.value);
  };

  const handleCreateClick = () => {
    const copiedList = getSourceList(sourceId).shift();

    const insert = (arr, index, newList) => [
      ...arr.slice(0, index),
      ...newList,
      ...arr.slice(index)
    ];
    const updatedCopy = { ...copiedList, title: newListTitle };
    const newList = insert(board.lists, sourceId, [updatedCopy]);

    const newBoard = {
      ...board,
      lists: [
        ...newList.map((list, index) => ({ ...list, position: index + 1 }))
      ]
    };

    makeBoardUpdate(newBoard);
    return close();
  };

  return (
    <StyledDiv>
      <CreateInput
        buttonText="Copy List"
        close={close}
        defaultValue={title}
        handleChange={handleChange}
        handleCreateClick={handleCreateClick}
      />
    </StyledDiv>
  );
};

export default CopyListDialog;
