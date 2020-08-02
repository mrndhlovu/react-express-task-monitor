import React from "react";
import PropTypes from "prop-types";

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

ProgressBar.propTypes = {
  checklist: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default ProgressBar;
