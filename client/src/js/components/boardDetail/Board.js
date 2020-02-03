import React from "react";

import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import BoardLists from "./BoardLists";
import BoardHeader from "../home/BoardHeader";

const Board = () => {
  return (
    <>
      <BoardHeader />
      <DndProvider backend={Backend}>
        <BoardLists />
      </DndProvider>
    </>
  );
};

export default Board;
