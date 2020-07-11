import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useBoardContext, useCardDetailContext } from "../../utils/hookUtils";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import CardLabelColors from "../sharedComponents/CardLabelColors";
import DropdownButton from "../sharedComponents/DropdownButton";

const Container = styled.div`
  display: flex;
`;

const Label = styled.div`
  height: 28px;
  width: 36px;
  background-color: ${(props) => props.color};
  border-radius: 2px;
  margin-right: 2px;
`;

const CardLabels = () => {
  const { board, handleBoardUpdate } = useBoardContext();
  const { sourceId, sourceList, card } = useCardDetailContext();
  const { labels } = card;

  const [label, setLabel] = useState(null);
  const [removeLabel, setRemoveLabel] = useState(null);

  const handleColorClick = (color) => {
    if (labels.includes(color)) return setRemoveLabel(color);
    setLabel(color);
  };

  useEffect(() => {
    let activity;

    if (label) {
      activity = "addLabel";
      card.labels.push(label);
    }

    if (removeLabel) {
      activity = "removeLabel";
      card.labels.splice(labels.indexOf(removeLabel), 1);
    }

    if (activity) {
      sourceList.cards.splice(sourceList.cards.indexOf(card), 1, card);

      board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);
      handleBoardUpdate(board, "lists", activity);
    }

    return () => {
      setLabel(null);
      setRemoveLabel(null);
    };
  }, [
    card,
    handleBoardUpdate,
    board,
    sourceList,
    label,
    labels,
    sourceId,
    removeLabel,
  ]);

  return (
    <>
      <CardDetailHeader description="Labels" />
      <CardDetailSegment>
        <Container>
          {labels.map((color, index) => (
            <Label key={index} color={color} />
          ))}
          <DropdownButton
            icon="add"
            header="Labels"
            fluid={false}
            buttonText=""
            labeled={false}
            size="massive"
            direction="right"
          >
            <CardLabelColors
              handleColorClick={handleColorClick}
              labels={labels}
            />
          </DropdownButton>
        </Container>
      </CardDetailSegment>
    </>
  );
};

export default CardLabels;
