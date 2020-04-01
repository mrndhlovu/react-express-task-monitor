import React, { useState, useEffect } from "react";
import styled from "styled-components";

import DatePicker from "react-datepicker";

import { Button, Divider } from "semantic-ui-react";

import DropdownButton from "../sharedComponents/DropdownButton";

const Container = styled.div`
  padding: 15px 10px;
  width: 300px;
`;

const ButtonWrapper = styled.div`
  padding: 10px 10px;
`;

const AddCardDueDate = ({
  activeCard,
  board,
  listPosition,
  backendUpdate,
  getSourceList,
  saveCardChanges
}) => {
  const [dueDate, setDueDate] = useState(false);
  const [removeDueDate, setRemoveDueDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const sourceList = getSourceList(listPosition).shift();

  const handleAddClick = () => setDueDate(true);
  const handleRemoveClick = () => setRemoveDueDate(true);

  useEffect(() => {
    let newCard;

    if (removeDueDate) {
      newCard = {
        ...activeCard,
        dueDate: ""
      };
    }

    if (dueDate) {
      newCard = {
        ...activeCard,
        dueDate: { date: `${startDate}`, complete: false }
      };
    }

    if (removeDueDate || dueDate) {
      saveCardChanges(newCard);
      sourceList.cards.splice(sourceList.cards.indexOf(activeCard), 1, newCard);
      board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

      backendUpdate(board, "lists", "dueDate");
    }

    return () => {
      setDueDate(false);
      setRemoveDueDate(false);
    };
  }, [
    backendUpdate,
    board,
    activeCard,
    dueDate,
    removeDueDate,
    sourceList,
    startDate,
    saveCardChanges
  ]);

  return (
    <DropdownButton
      icon="clock"
      buttonText="Due Date"
      header="Change Due Date."
    >
      <Container>
        <DatePicker
          className="ui fluid focus input"
          selected={startDate}
          onChange={date => setStartDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </Container>
      <Divider />
      <ButtonWrapper>
        <Button
          content="Add"
          compact
          positive
          onClick={() => handleAddClick()}
        />
        <Button
          content="Remove"
          compact
          negative
          floated="right"
          onClick={() => handleRemoveClick()}
        />
      </ButtonWrapper>
    </DropdownButton>
  );
};

export default AddCardDueDate;
