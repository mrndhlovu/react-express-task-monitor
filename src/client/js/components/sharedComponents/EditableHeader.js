import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { Header, Input } from "semantic-ui-react";

import { BoardContext } from "../../utils/contextUtils";
import { findArrayItem, stringsEqual } from "../../utils/appUtils";

const StyledHeader = styled(Header)`
  font-size: 14px !important;
`;

const StyledDiv = styled.div`
  cursor: pointer;
`;

const EditHeader = styled(Input)`
  display: flex important;
  border-radius: 5px;
  margin-bottom: 5px;
  height: 29px;
  width: 95%;
`;

const EditableHeader = ({ title, type, sourceId }) => {
  const { handleBoardUpdate, board } = useContext(BoardContext);
  let sourceList = findArrayItem(board.lists, sourceId, "_id");

  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(null);
  const [newBoard, setNewBoard] = useState(null);

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleUpdate = () => {
    switch (type) {
      case "boardTitle":
        setNewBoard({ ...board, title: newTitle });
        break;
      case "listHeader":
        sourceList.title = newTitle;
        board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);
        setNewBoard({ ...board });
        break;
      default:
        break;
    }

    setEditable(!editable);
  };

  useEffect(() => {
    if (!newBoard) return;
    handleBoardUpdate(
      newBoard,
      stringsEqual(type, "boardTitle") ? "title" : "lists"
    );
    setNewBoard(null);
  }, [newBoard, handleBoardUpdate]);

  return (
    <StyledDiv>
      {!editable ? (
        <StyledHeader content={title} onClick={() => setEditable(!editable)} />
      ) : (
        <EditHeader
          defaultValue={title}
          onBlur={() => handleUpdate()}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => (e.key === "Enter" ? handleUpdate() : null)}
        />
      )}
    </StyledDiv>
  );
};

export default EditableHeader;
