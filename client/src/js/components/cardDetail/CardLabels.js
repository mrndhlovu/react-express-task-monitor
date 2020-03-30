import React, { useState, useEffect } from "react";
import styled from "styled-components";

import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import DropdownButton from "../sharedComponents/DropdownButton";
import { Header } from "semantic-ui-react";
import CardLabelColors from "../sharedComponents/CardLabelColors";

const Container = styled.div`
  margin-left: 10px;
  padding: 0 29px;
  display: flex;
`;

const Label = styled.div`
  height: 28px;
  width: 36px;
  background-color: ${props => props.color};
  border-radius: 2px;
  margin-right: 2px;
`;

const HeaderWrapper = styled.div`
  padding: 0 38px;
  padding-bottom: 10px;
`;

const CardLabels = ({
  activeCard,
  backendUpdate,
  board,
  listPosition,
  getSourceList
}) => {
  const { labels } = activeCard;

  const [label, setLabel] = useState(null);
  const [removeLabel, setRemoveLabel] = useState(null);

  const handleColorClick = color => {
    if (labels.includes(color)) return setRemoveLabel(color);
    setLabel(color);
  };

  useEffect(() => {
    let activity;
    const sourceList = getSourceList(listPosition).shift();

    if (label) {
      activity = "addLabel";
      activeCard.labels.push(label);
    }

    if (removeLabel) {
      activity = "removeLabel";
      activeCard.labels.splice(labels.indexOf(removeLabel), 1);
    }

    if (activity) {
      sourceList.cards.splice(
        sourceList.cards.indexOf(activeCard),
        1,
        activeCard
      );

      board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);
      backendUpdate(board, "lists", activity);
    }

    return () => {
      setLabel(null);
      setRemoveLabel(null);
    };
  }, [
    activeCard,
    backendUpdate,
    board,
    getSourceList,
    label,
    labels,
    listPosition,
    removeLabel
  ]);

  return (
    <CardDetailSegment>
      <HeaderWrapper>
        <Header content="Labels" as="h5" />
      </HeaderWrapper>
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
        >
          <CardLabelColors
            handleColorClick={handleColorClick}
            labels={labels}
          />
        </DropdownButton>
      </Container>
    </CardDetailSegment>
  );
};

export default CardLabels;
