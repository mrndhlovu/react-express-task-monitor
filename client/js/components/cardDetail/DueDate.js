import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Checkbox, Label, Button } from "semantic-ui-react";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import { getFormattedDate } from "../../utils/appUtils";

const Container = styled.div`
  margin-left: 10px;
  padding: 0 29px;
`;

const HeaderWrapper = styled.div`
  padding-bottom: 10px;
`;

const Span = styled.span`
  padding-left: 5px;
`;

const DueDate = ({
  activeCard,
  handleBoardUpdate,
  board,
  getSourceList,
  listPosition,
  saveCardChanges
}) => {
  const [removeDueDate, setRemoveDueDate] = useState(false);
  const [checked, setChecked] = useState(false);
  const [unChecked, setUnChecked] = useState(false);

  const sourceList = getSourceList(listPosition).shift();

  const handleCheckboxClick = () =>
    activeCard.dueDate.complete ? setUnChecked(true) : setChecked(true);

  const handleDeleteDueDate = () => setRemoveDueDate(true);

  useEffect(() => {
    let newCard;
    let activity;

    if (removeDueDate) {
      activity = "removeDueDate";
      newCard = {
        ...activeCard,
        dueDate: ""
      };
    }

    if (checked) {
      activity = "dueDateComplete";
      newCard = {
        ...activeCard,
        dueDate: { ...activeCard.dueDate, complete: true }
      };
    }

    if (unChecked) {
      activity = "openDueDate";

      newCard = {
        ...activeCard,
        dueDate: { ...activeCard.dueDate, complete: false }
      };
    }

    if (removeDueDate || checked || unChecked) {
      saveCardChanges(newCard);
      sourceList.cards.splice(sourceList.cards.indexOf(activeCard), 1, newCard);
      board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

      handleBoardUpdate(board, "lists", activity);
    }

    return () => {
      setRemoveDueDate(false);
      setChecked(false);
      setUnChecked(false);
    };
  }, [
    activeCard,
    handleBoardUpdate,
    board,
    checked,
    removeDueDate,
    saveCardChanges,
    sourceList,
    unChecked
  ]);

  return (
    activeCard.dueDate && (
      <CardDetailSegment>
        <HeaderWrapper>
          <Button
            content="Delete"
            compact
            floated="right"
            size="tiny"
            onClick={() => handleDeleteDueDate()}
          />
          <CardDetailHeader description="Due Date" icon="clock outline" />
        </HeaderWrapper>

        <Container>
          <Checkbox
            id="dueDate"
            label={getFormattedDate(activeCard.dueDate.date, "LLLL")}
            checked={activeCard.dueDate.complete}
            onChange={() => handleCheckboxClick()}
          />

          {activeCard.dueDate.complete && (
            <Span>
              <Label content="Complete" color="green" size="tiny" />
            </Span>
          )}
        </Container>
      </CardDetailSegment>
    )
  );
};

export default DueDate;
