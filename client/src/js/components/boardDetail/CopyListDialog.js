import React, { useState, useContext } from "react";
import styled from "styled-components";

import CreateInput from "../sharedComponents/CreateInput";
import { BoardListContext, BoardContext } from "../../utils/contextUtils";

const StyledDiv = styled.div`
  display: grid;
  background-color: #22242626;
  padding: 9px 9px;

  border-radius: 4px;
  width: 100%;
`;

const CopyListDialog = ({ close, title, listPosition }) => {
  const { board, getSourceList } = useContext(BoardListContext);
  const { makeBoardUpdate } = useContext(BoardContext);
  const sourceId = listPosition;

  const [newListTitle, setListTitle] = useState(title);

  const handleChange = e => {
    setListTitle(e.target.value);
  };

  const handleCreateClick = () => {
    const sourceList = getSourceList(sourceId).shift();
    board.lists.push({
      ...sourceList,
      position: board.lists.length + 1,
      title: newListTitle
    });
    makeBoardUpdate(board);
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
