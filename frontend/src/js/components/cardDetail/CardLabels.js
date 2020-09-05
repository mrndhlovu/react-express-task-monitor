import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Tag } from "react-feather";

import { useBoardContext, useCardDetailContext } from "../../utils/hookUtils";
import CardDetailHeader from "../shared/CardDetailHeader";
import CardDetailSegment from "../shared/CardDetailSegment";
import CardLabelColors from "../shared/CardLabelColors";
import DropdownButton from "../shared/DropdownButton";

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
  const { board, boardUpdateHandler } = useBoardContext();
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
      boardUpdateHandler(board);
    }

    return () => {
      setLabel(null);
      setRemoveLabel(null);
    };
  }, [
    card,
    boardUpdateHandler,
    board,
    sourceList,
    label,
    labels,
    sourceId,
    removeLabel,
  ]);

  return (
    <>
      <CardDetailHeader description="Labels" icon={() => <Tag />} />
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
