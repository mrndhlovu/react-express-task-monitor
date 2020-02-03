import React, { useContext } from "react";

import List from "./List";
import { BoardListContext } from "../../utils/contextUtils";

const ListGrid = ({ ...props }) => {
  const { lists } = useContext(BoardListContext);
  return Object.keys(lists).map(key => (
    <List key={key} list={lists[key]} {...props} />
  ));
};

export default ListGrid;
