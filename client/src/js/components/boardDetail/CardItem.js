import React, { useState, useContext } from "react";
import styled from "styled-components";

import { Dropdown } from "semantic-ui-react";
import { BoardListContext } from "../../utils/contextUtils";

const StyledCardDiv = styled.div`
  cursor: pointer;
  margin: 10px 5px !important;
  padding: 10px 10px;
  position: relative;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 90% 10%;
  align-items: center;
  color: #42526e;
`;

const StyledHeader = styled.div``;

const Span = styled.span`
  font-size: 12px !important;
  font-weight: 600;
`;

const EditIconWrapper = styled.div`
  justify-self: end;
  font-size: 13px;
  opacity: ${props => (props.showEditButton ? 1 : 0)};
  margin-left: 8px;
`;

const CardItem = ({ card, sourceListId }) => {
  const [showEditButton, setShowEditButton] = useState(false);
  const { updateBoard, getSourceList, getFilteredBoard } = useContext(
    BoardListContext
  );

  function handleDeleteCard() {
    const newBoardLists = getFilteredBoard(sourceListId);
    const sourceList = getSourceList(sourceListId).shift();

    const newFilteredList = {
      ...sourceList,
      cards: sourceList.cards.filter(key => key.position !== card.position)
    };

    newBoardLists.lists.push(newFilteredList);
    newBoardLists.lists.sort((a, b) => a.position - b.position);

    updateBoard(newBoardLists);
  }

  return (
    <StyledCardDiv
      edit={showEditButton}
      onMouseEnter={() => setShowEditButton(!showEditButton)}
      onMouseLeave={() => setShowEditButton(!showEditButton)}
    >
      <StyledHeader>
        <Span>{card.title}</Span>
      </StyledHeader>

      <EditIconWrapper showEditButton={showEditButton}>
        <Dropdown icon="pencil alternate" floating>
          <Dropdown.Menu>
            <Dropdown.Item>Move</Dropdown.Item>
            <Dropdown.Item onClick={() => handleDeleteCard()}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </EditIconWrapper>
    </StyledCardDiv>
  );
};

export default CardItem;
