import React, { memo } from "react";

import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";

import { Types } from "../../constants/constants";
import CardItem from "./CardItem";

const WrappedCard = ({
  card,
  connectDragSource,
  connectDropTarget,
  isDragging,
  isOverCard,
  sourceListId,
  listTitle,
  isLast
}) => {
  const styles = {
    backgroundColor: !isDragging && "#fff",
    borderRadius: "2px",
    boxShadow: !isDragging && "#0f1e4259",
    minHeight: "20px",
    visibility: isDragging && "hidden",
    display: isDragging && isOverCard && "none",
    zIndex: 0,
    marginTop: "7px"
  };

  const wrappedCardItem = (
    <div style={styles}>
      <CardItem
        card={card}
        sourceListId={sourceListId}
        sourceTitle={listTitle}
        isLast={isLast}
      />
    </div>
  );

  return connectDragSource(connectDropTarget(wrappedCardItem));
};

const source = {
  beginDrag(props) {
    const { card, sourceListId } = props;
    props.handleStartDrag(sourceListId, card.position);

    return {};
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) return;

    return props.handleDrop();
  }
};

const target = {
  hover(props, monitor) {
    const { card } = props;

    if (!monitor.isOver({ shallow: false })) return;

    return props.updateDropTargetId(card.position);
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const cardCollect = (connect, monitor) => ({
  isOverCard: monitor.isOver({ shallow: true }),
  connectDropTarget: connect.dropTarget()
});

export default flow(
  DragSource(Types.LIST, source, collect),
  DropTarget(Types.LIST, target, cardCollect)
)(memo(WrappedCard));
