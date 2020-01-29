import React from "react";
import styled from "styled-components";

import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";

import { Types } from "../../constants/constants";

import { Header } from "semantic-ui-react";

const StyledCardDiv = styled.div`
  background-color: #fff !important;
  border-radius: inherit;
  cursor: pointer;
  margin: 10px 5px !important;
  padding: 8px 0px 6px 10px;
  position: relative;
  text-decoration: none;
  opacity: ${props => props.isDragging && 0};
`;

const CardItem = ({
  card,
  connectDragSource,
  connectDropTarget,
  isDragging
}) => {
  const styles = {
    backgroundColor: !isDragging && "#fff",
    borderRadius: "5px",
    boxShadow: !isDragging && "0 1px 0 rgba(15, 30, 66, 0.35)"
  };

  const wrappedCardItem = (
    <div style={styles}>
      <StyledCardDiv isDragging={isDragging}>
        <Header size="small">{card.title}</Header>
      </StyledCardDiv>
    </div>
  );

  return connectDragSource(connectDropTarget(wrappedCardItem));
};

const source = {
  beginDrag(props) {
    const { card, sourceId } = props;

    props.handleStartDrag(sourceId, card.position);
    props.updateDropTargetId(sourceId);

    return {};
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) return;
    return props.handleDrop();
  }
};

const target = {
  hover(props) {
    const { card, draggingCardId, isOverCurrent } = props;
    if (!isOverCurrent) return;
    return props.handleCardsReorder(card.position, draggingCardId);
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const sortCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true })
});

export default flow(
  DragSource(Types.LIST, source, collect),
  DropTarget(Types.LIST, target, sortCollect)
)(CardItem);
