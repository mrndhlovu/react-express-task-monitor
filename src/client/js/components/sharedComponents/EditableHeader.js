import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { Header, Input } from "semantic-ui-react";
import { MainContext, BoardContext } from "../../utils/contextUtils";

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

const EditableHeader = ({ title, type, cardPosition, sourceId }) => {
  const { handleBoardUpdate, board } = useContext(BoardContext);
  const { getSourceList } = useContext(MainContext);

  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newBoard, setNewBoard] = useState(null);

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleUpdate = () => {
    switch (type) {
      case "boardTitle":
        setNewBoard({ ...board, title: newTitle });
        break;

      case "cardTitle":
        const sourceList = getSourceList(sourceId, "_id");
        const cards = [];
        const updatedList = [];

        sourceList.cards.map((card) =>
          cards.push(
            card._id === cardPosition ? { ...card, title: newTitle } : card
          )
        );

        board.lists.map((list) =>
          updatedList.push(list._id === sourceId ? { ...list, cards } : list)
        );

        setNewBoard({ ...board, lists: updatedList });
        break;

      case "listHeader":
        const newList = [];
        board.lists.map((list) =>
          newList.push(
            list._id === sourceId ? { ...list, title: newTitle } : list
          )
        );
        setNewBoard({ ...board, lists: newList });
        break;

      default:
        break;
    }

    setEditable(!editable);
  };

  useEffect(() => {
    if (!newBoard) return;
    handleBoardUpdate(newBoard, "title", "boardHeader");
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