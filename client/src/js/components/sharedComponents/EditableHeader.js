import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { Header, Input } from "semantic-ui-react";
import { AppContext, BoardContext } from "../../utils/contextUtils";

const StyledHeader = styled(Header)`
  font-size: 13px !important;
`;

const StyledDiv = styled.div`
  cursor: pointer;
`;

const EditHeader = styled(Input)`
  border-radius: 5px;
  margin-bottom: 5px;
  height: 29px;
  width: 95%;
`;

const EditableHeader = ({ title, type, cardPosition, listPosition }) => {
  const { backendUpdate, board } = useContext(BoardContext);
  const { getSourceList } = useContext(AppContext);

  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newBoard, setNewBoard] = useState(null);

  const handleChange = e => {
    setNewTitle(e.target.value);
  };

  const handleUpdate = () => {
    switch (type) {
      case "boardTitle":
        setNewBoard({ ...board, title: newTitle });
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

        setNewBoard({ ...board, lists: updatedList });
        break;

      case "listHeader":
        const newList = [];
        board.lists.map(list =>
          newList.push(
            list.position === listPosition ? { ...list, title: newTitle } : list
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
    backendUpdate(newBoard);
    setNewBoard(null);
  }, [newBoard, backendUpdate]);

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
