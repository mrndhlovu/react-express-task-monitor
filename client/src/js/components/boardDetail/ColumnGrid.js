import React from "react";

import Column from "./Column";

const ColumnGrid = ({ columns, ...rest }) =>
  Object.keys(columns).map(key => (
    <Column key={key} column={columns[key]} {...rest} />
  ));

export default ColumnGrid;
