import React, { useContext } from "react";

import flow from "lodash/flow";

import { DragSource, DropTarget } from "react-dnd";

import { Segment } from "semantic-ui-react";

import { Types } from "../../constants/constants";
import CardItemWrapper from "./CardItemWrapper";
import CreateCard from "../sharedComponents/CreateCard";
import { BoardListContext } from "../../utils/contextUtils";
import ListHeader from "./ListHeader";

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
    marginRight: "10px"
  };

  const wrappedList = (
    <div style={styles}>
      <Segment>
        <ListHeader title={title} showListActions={showListActions} />
        <CardItemWrapper
          cards={cards}
          sourceListId={position}
          hoverIndex={position}
          {...rest}
          {...otherProps}
        />

        <CreateCard
          listId={position}
          activeList={activeList === position}
          {...rest}
        />
      </Segment>
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
  hover(props) {
    const { list, draggingList } = props;

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
