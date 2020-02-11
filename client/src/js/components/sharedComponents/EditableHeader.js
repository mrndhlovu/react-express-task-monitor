import React, { useState, useContext } from "react";
import styled from "styled-components";

import { Header, Input } from "semantic-ui-react";
import { BoardListContext, BoardContext } from "../../utils/contextUtils";

const StyledHeader = styled(Header)`
  font-size: 13px !important;
`;

const StyledDiv = styled.div`
  cursor: pointer;
`;

const EditHeader = styled(Input)`
  border-radius: 5px;
  border: 1px solid blue;
  margin-bottom: 5px;
  height: 29px;
  width: 95%;
`;

const EditableHeader = ({ title, type, cardPosition, listPosition }) => {
  const { makeBoardUpdate, board } = useContext(BoardContext);
  const { getSourceList } = useContext(BoardListContext);

  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleChange = e => {
    setNewTitle(e.target.value);
  };

  const handleUpdate = () => {
    let newBoard;
    switch (type) {
      case "boardTitle":
        newBoard = { ...board, title: newTitle };
        break;

      case "cardTitle":
        const sourceList = getSourceList(listPosition).shift();
        const cards = [];
        const updatedList = [];

        sourceList.cards.map(card =>
          cards.push(
            card.position === cardPosition ? { ...card, title: newTitle } : card
          )
        );

        board.lists.map(list =>
          updatedList.push(
            list.position === listPosition ? { ...list, cards } : list
          )
        );

        newBoard = { ...board, lists: updatedList };
        break;

      case "listHeader":
        const newList = [];
        board.lists.map(list =>
          newList.push(
            list.position === listPosition ? { ...list, title: newTitle } : list
          )
        );
        newBoard = { ...board, lists: newList };
        break;

      default:
        break;
    }

    makeBoardUpdate(newBoard);
    setEditable(!editable);
  };

  return (
    <StyledDiv>
      {!editable ? (
        <StyledHeader content={title} onClick={() => setEditable(!editable)} />
      ) : (
        <EditHeader
          defaultValue={title}
          onBlur={() => handleUpdate()}
          onChange={e => handleChange(e)}
        />
      )}
    </StyledDiv>
  );
};

export default EditableHeader;
