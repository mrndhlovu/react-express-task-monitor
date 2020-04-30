import React, { memo, useState } from "react";
import _debounce from "debounce";

import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";

import { Types } from "../../constants/constants";
import CardItem from "./CardItem";
import styled from "styled-components";

const DropTargetPlaceholder = styled.div`
  margin-top: 7px;
  min-height: 50px;
  background: #bababc;
  max-width: 256px;
  width: 100%;
  border-radius: 2px;
`;

const WrappedCard = ({
  card,
  connectDragSource,
  connectDropTarget,
  isDragging,
  isOverCard,
  sourceListId,
  listPosition,
  listTitle,
  isLast,
}) => {
  const [showEditButton, setShowEditButton] = useState(false);

  const styles = () => {
    return {
      transform: isDragging && "translate3d(10px, 15px, 0)",
      backgroundColor: !isDragging && "#fff",
      borderRadius: "2px",
      boxShadow: !isDragging && "#0f1e4259",
      marginTop: "7px",
      minHeight: "20px",
      position: isDragging ? "absolute" : "relative",
      opacity: isDragging ? 0 : 1,
      zIndex: 0,
    };
  };

  const wrappedCardItem = (
    <div>
      {isOverCard && <DropTargetPlaceholder />}
      <div
        style={styles()}
        onMouseEnter={() => setShowEditButton(true)}
        onMouseLeave={() => setShowEditButton(false)}
      >
        <CardItem
          isOverCard={isOverCard}
          card={card}
          sourceListId={sourceListId}
          listPosition={listPosition}
          sourceTitle={listTitle}
          isLast={isLast}
          showEditButton={showEditButton}
        />
      </div>
    </div>
  );

  return connectDragSource(connectDropTarget(wrappedCardItem));
};

const source = {
  beginDrag(props) {
    const { sourceListId, card } = props;
    props.handleStartDrag(sourceListId, card._id);

    return {};
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) return;

    return props.handleDrop();
  },
};

const target = {
  hover(props, monitor) {
    const { sourceListId, card } = props;

    if (!monitor.isOver({ shallow: false })) return;
    _debounce(props.updateDropTargetId(sourceListId, card._id), 400);

    return;
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const cardCollect = (connect, monitor) => ({
  isOverCard: monitor.isOver({ shallow: true }),
  connectDropTarget: connect.dropTarget(),
});

export default flow(
  DragSource(Types.LIST, source, collect),
  DropTarget(Types.LIST, target, cardCollect)
)(memo(WrappedCard));
