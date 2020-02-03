import React from "react";
import styled from "styled-components";

import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";

import { Types } from "../../constants/constants";

import { Header } from "semantic-ui-react";

const StyledCardDiv = styled.div`
  cursor: pointer;
  margin: 10px 5px !important;
  padding: 10px 10px;
  position: relative;
`;

const StyledHeader = styled(Header)`
  font-size: 12px !important;
`;

const CardItem = ({
  card,
  connectDragSource,
  connectDropTarget,
  isDragging
}) => {
  const styles = {
    backgroundColor: !isDragging && "#fff",
    borderRadius: "4px",
    boxShadow: !isDragging && "0 1px 0 rgba(15, 30, 66, 0.35)",
    minHeight: "20px",
    visibility: isDragging && "hidden",
    zIndex: 0
  };

  const wrappedCardItem = (
    <div style={styles}>
      <StyledCardDiv>
        <StyledHeader content={card.title} />
      </StyledCardDiv>
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
  hover(props) {
    const { card, isOverCurrent } = props;

    if (isOverCurrent) return;
    return props.updateDropTargetId(card.position);
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const sortCollect = (connect, monitor) => ({
  isOverCard: monitor.isOver({ shallow: true }),
  connectDropTarget: connect.dropTarget()
});

export default flow(
  DragSource(Types.LIST, source, collect),
  DropTarget(Types.LIST, target, sortCollect)
)(CardItem);
