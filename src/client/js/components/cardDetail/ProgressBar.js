import React from "react";

import { Progress } from "semantic-ui-react";

import { getProgression, stringsEqual } from "../../utils/appUtils";

const ProgressBar = ({ checklist }) => {
  let partialValue = 0;
  let total = 0;

  checklist.tasks.map((task) => {
    if (stringsEqual(task.status, "done")) partialValue++;
    return total++;
  });
  const percent = Math.round(getProgression(partialValue, total));
  return (
    <div className="progress-bar-wrap">
      <span>{percent || 0}%</span>
      <Progress
        percent={percent}
        size="tiny"
        color={stringsEqual(checklist.status, "complete") ? "green" : "grey"}
      />
    </div>
  );
};

export default ProgressBar;
