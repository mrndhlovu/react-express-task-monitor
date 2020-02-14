import React, { useContext } from "react";

import List from "./List";
import { AppContext } from "../../utils/contextUtils";

const ListGrid = ({ ...props }) => {
  const { lists } = useContext(AppContext);
  return Object.keys(lists).map(key => (
    <List key={key} list={lists[key]} {...props} />
  ));
};

export default ListGrid;
