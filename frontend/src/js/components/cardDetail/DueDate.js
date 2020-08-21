import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Checkbox, Label, Button } from "semantic-ui-react";

import { getFormattedDate } from "../../utils/appUtils";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import { useCardDetailContext, useBoardContext } from "../../utils/hookUtils";
import { Clock } from "react-feather";

const Container = styled.div``;

const HeaderWrapper = styled.div`
  padding-bottom: 10px;
`;

const Span = styled.span`
  padding-left: 5px;
`;

const DueDate = () => {
  const { card, saveCardChanges, sourceList } = useCardDetailContext();
  const { boardUpdateHandler, board } = useBoardContext();
  const [removeDueDate, setRemoveDueDate] = useState(false);
  const [checked, setChecked] = useState(false);
  const [unChecked, setUnChecked] = useState(false);

  const editCheckListHandler = () =>
    card.dueDate.complete ? setUnChecked(true) : setChecked(true);

  const handleDeleteDueDate = () => setRemoveDueDate(true);

  useEffect(() => {
    let newCard;

    if (removeDueDate) {
      newCard = {
        ...card,
        dueDate: "",
      };
    }

    if (checked) {
      newCard = {
        ...card,
        dueDate: { ...card.dueDate, complete: true },
      };
    }

    if (unChecked) {
      newCard = {
        ...card,
        dueDate: { ...card.dueDate, complete: false },
      };
    }

    if (removeDueDate || checked || unChecked) {
      saveCardChanges(newCard);
      sourceList.cards.splice(sourceList.cards.indexOf(card), 1, newCard);
      board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

      boardUpdateHandler(board);
    }

    return () => {
      setRemoveDueDate(false);
      setChecked(false);
      setUnChecked(false);
    };
  }, [
    card,
    boardUpdateHandler,
    board,
    checked,
    removeDueDate,
    saveCardChanges,
    sourceList,
    unChecked,
  ]);

  return (
    card.dueDate && (
      <>
        <HeaderWrapper>
          <Button
            content="Delete"
            compact
            floated="right"
            size="tiny"
            onClick={() => handleDeleteDueDate()}
          />
          <CardDetailHeader description="Due Date" icon={() => <Clock />} />
        </HeaderWrapper>
        <CardDetailSegment>
          <Container>
            <Checkbox
              id="dueDate"
              label={getFormattedDate(card.dueDate.date, "LLLL")}
              checked={card.dueDate.complete}
              onChange={() => editCheckListHandler()}
            />

            {card.dueDate.complete && (
              <Span>
                <Label content="Complete" color="green" size="tiny" />
              </Span>
            )}
          </Container>
        </CardDetailSegment>
      </>
    )
  );
};

export default DueDate;
