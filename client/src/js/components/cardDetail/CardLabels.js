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

const CardLabels = ({ colors = [], backendUpdate, board }) => {
  const hasLabel = colors.length !== 0;
  const [label, setLabel] = useState(null);
  const [removeLabel, setRemoveLabel] = useState(null);

  const handleColorClick = color => {
    if (colors.includes(color)) return setRemoveLabel(color);
    setLabel(color);
  };

  useEffect(() => {
    let activity;

    if (label) {
      activity = "addLabel";
      board.labels.push(label);
    }

    if (removeLabel) {
      activity = "removeLabel";
      board.labels.splice(colors.indexOf(removeLabel), 1);
    }

    activity && backendUpdate(board, "labels", activity);

    return () => {
      setLabel(null);
      setRemoveLabel(null);
    };
  }, [label, removeLabel, board, backendUpdate, colors]);

  return (
    <CardDetailSegment>
      <HeaderWrapper>
        <Header content="Labels" as="h5" />
      </HeaderWrapper>
      <Container>
        {hasLabel &&
          colors.map((color, index) => <Label key={index} color={color} />)}
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
            labels={colors}
          />
        </DropdownButton>
      </Container>
    </CardDetailSegment>
  );
};

export default CardLabels;
