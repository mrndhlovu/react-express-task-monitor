import React, { useContext } from "react";
import styled from "styled-components";

import flow from "lodash/flow";

import { DragSource, DropTarget } from "react-dnd";

import { Segment } from "semantic-ui-react";

import { Types } from "../../constants/constants";
import CardsWrapper from "./CardsWrapper";
import CreateCard from "../sharedComponents/CreateCard";
import { BoardListContext } from "../../utils/contextUtils";
import ListHeader from "./ListHeader";

const StyledWrapper = styled(Segment)`
  background-color: #ebecf0 !important;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
`;

const List = ({
  connectDragSource,
  connectDropTarget,
  list,
  isDragging,
  isOverCurrent,
  ...rest
}) => {
  const { showListActions, activeList, ...otherProps } = useContext(
    BoardListContext
  );

  const { title, position, cards } = list;

  const styles = {
    minWidth: "272px",
    verticalAlign: "top",
    visibility: isDragging && "hidden",
    marginRight: "10px",
    position: "relative",
    whiteSpace: "nowrap"
  };

  const wrappedList = (
    <div style={styles}>
      <StyledWrapper>
        <ListHeader
          className="ui"
          title={title}
          showListActions={showListActions}
        />
        <CardsWrapper
          cards={cards}
          sourceListId={position}
          hoverIndex={position}
          {...rest}
          {...otherProps}
        />

        <CreateCard
          listId={position}
          activeList={activeList === position}
          {...otherProps}
        />
      </StyledWrapper>
    </div>
  );

  return connectDragSource(connectDropTarget(wrappedList));
};

const target = {
  drop(props) {
    const { draggingList, sourceId, list, reorderCards } = props;
    if (draggingList) return props.reOrderList(sourceId, list.position);
    if (reorderCards) return props.handleCardsReorder();

    return props.handleChangeCardList();
  },
  hover(props, monitor) {
    const { list } = props;

    if (!monitor.isOver({ shallow: false })) return;

    props.updateDropTargetId(list.position);

    return {};
  }
};

const source = {
  beginDrag(props) {
    const { list } = props;

    props.updateDragOption();
    props.updateSourceId(list.position);

    return {};
  },
  endDrag(props) {
    props.updateDragOption();

    return props.handleDrop();
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const sortCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true })
});

export default flow(
  DragSource(Types.LIST, source, collect),
  DropTarget(Types.LIST, target, sortCollect)
)(List);
