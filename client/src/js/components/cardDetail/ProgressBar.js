import React from "react";

import { Progress } from "semantic-ui-react";
import styled from "styled-components";
import { getProgression } from "../../utils/appUtils";

const Container = styled.div`
  padding: 0px 15px;
`;

const PercentLabel = styled.span`
  font-size: 12px;
`;

const ProgressBar = ({ card, checklistName }) => {
  let partialValue = 0;
  let total = 0;

  card.checklists.map(item => {
    if (item.name === checklistName) {
      item.status === "done" && partialValue++;
    }
    return total++;
  });
  const percent = Math.round(getProgression(partialValue, total));
  return (
    <Container>
      <PercentLabel>{percent || 0}%</PercentLabel>
      <Progress percent={percent} size="tiny" />
    </Container>
  );
};

export default ProgressBar;
