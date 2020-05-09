import React, { useContext, useRef } from "react";
import styled from "styled-components";

import { useDrag, useDrop } from "react-dnd";

import { Segment } from "semantic-ui-react";

import { BoardListsContext } from "../../utils/contextUtils";
import { Types } from "../../constants/constants";
import CardsWrapper from "./CardsWrapper";
import CreateCard from "../sharedComponents/CreateCard";
import ListHeader from "./ListHeader";

const ListSegment = styled(Segment)`
  background-color: #ebecf0 !important;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  margin: 0 !important;
  white-space: normal;
  border-radius: px !important;
  padding: 6px !important;
`;

const CardsContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;

const List = ({ index, list, mobile, moveList, position, ...rest }) => {
  const {
    showListActions,
    activeList,
    getSourceList,
    handleBoardUpdate,
    board,
    saveBoardChanges,
    ...otherProps
  } = useContext(BoardListsContext);

  const styles = {
    display: isDragging ? "hidden" : "block",
  };

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: Types.LIST,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();

      const hoverMiddleX = hoverBoundingRect.bottom / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;

      moveList(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: Types.LIST, position, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const wrappedList = (
    <div ref={ref} style={{ ...styles, opacity }}>
      <ListSegment>
        <ListHeader
          board={board}
          getSourceList={getSourceList}
          handleBoardUpdate={handleBoardUpdate}
          listId={list._id}
          listPosition={position}
          mobile={mobile}
          saveBoardChanges={saveBoardChanges}
          showListActions={showListActions}
          title={list.title}
        />

        <CardsContainer className="card-list">
          <CardsWrapper
            cards={list.cards}
            sourceListId={list._id}
            listPosition={position}
            listTitle={list.title}
            getSourceList={getSourceList}
            {...rest}
            {...otherProps}
          />
        </CardsContainer>

        <CreateCard
          targetList={{ position, listId: list._id }}
          activeList={activeList === list._id}
          {...otherProps}
        />
      </ListSegment>
    </div>
  );

  return wrappedList;
};

export default List;
