import React, { useContext } from "react";

import List from "./List";
import { BoardListsContext } from "../../utils/contextUtils";

const ListGrid = ({ ...props }) => {
  const { lists } = useContext(BoardListsContext);
  return Object.keys(lists).map((key, index) => (
    <List key={key} position={index + 1} list={lists[key]} {...props} />
  ));
};

export default ListGrid;
