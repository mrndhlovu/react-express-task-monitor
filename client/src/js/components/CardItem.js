import React from "react";
import styled from "styled-components";

import { DragSource } from "react-dnd";

import { Types } from "../constants/constants";

import { Header } from "semantic-ui-react";

const StyledCardDiv = styled.div`
  background-color: #fff !important;
  border-radius: inherit;
  cursor: pointer;
  margin: 10px 5px !important;
  padding: 8px 0px 6px 10px;
  position: relative;
  text-decoration: none;
  visibility: ${props => props.isDragging && "hidden"};
`;

const CardItem = ({ connectDragSource, card, isDragging }) => {
  const { position, title } = card;
  const styles = {
    backgroundColor: !isDragging ? "white" : "grey",
    borderRadius: "5px",
    boxShadow: "0 1px 0 rgba(15, 30, 66, 0.35)"
  };

  const wrappedCardItem = (
    <div style={styles} id={`card-${position}`}>
      <StyledCardDiv isDragging={isDragging}>
        <Header size="small">{title}</Header>
      </StyledCardDiv>
    </div>
  );

  return connectDragSource(wrappedCardItem);
};

const source = {
  beginDrag(props, monitor) {
    const { card, dropColumnId, hoverIndex, sourceId } = props;

    props.handleMoveCard(sourceId, card.position);
    const dragIndex = card.position;

    // TODO handle cards reorder on the same column

    let columnRect = document.getElementById(`column-${dropColumnId}`);

    // Determine rectangle on screen
    const hoverBoundingRect = columnRect.getBoundingClientRect();

    // TODO Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.x - hoverBoundingRect.y) / 2;

    // TODO Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // TODO Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    // Time to actually perform the action
    props.handleReorderCards(hoverIndex, dragIndex);

    return {};
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }
    return props.handleDrop();
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

export default DragSource(Types.COLUMN, source, collect)(CardItem);
