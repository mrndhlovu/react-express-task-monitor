import React from "react";
import styled from "styled-components";

import { Progress } from "semantic-ui-react";

import { getProgression, stringsEqual } from "../../utils/appUtils";

const Container = styled.div`
  padding: 0px 15px;
`;

const PercentLabel = styled.span`
  font-size: 12px;
`;

const ProgressBar = ({ checklist }) => {
  let partialValue = 0;
  let total = 0;

  checklist.tasks.map((task) => {
    if (stringsEqual(task.status, "done")) partialValue++;
    return total++;
  });
  const percent = Math.round(getProgression(partialValue, total));
  return (
    <Container>
      <PercentLabel>{percent || 0}%</PercentLabel>
      <Progress
        percent={percent}
        size="tiny"
        color={stringsEqual(checklist.status, "complete") ? "green" : "grey"}
      />
    </Container>
  );
};

export default ProgressBar;
