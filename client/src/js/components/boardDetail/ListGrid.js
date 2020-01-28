import React from "react";

import List from "./List";

const ListGrid = ({ lists, ...rest }) =>
  Object.keys(lists).map(key => <List key={key} list={lists[key]} {...rest} />);

export default ListGrid;
