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

const CardItem = ({ connectDragSource, card, isDragging, moveCard }) => {
  const styles = {
    backgroundColor: !isDragging ? "white" : "grey",
    borderRadius: "5px",
    boxShadow: "0 1px 0 rgba(15, 30, 66, 0.35)"
  };

  const wrappedCardItem = (
    <div style={styles}>
      <StyledCardDiv isDragging={isDragging}>
        <Header size="small">{card.detail}</Header>
      </StyledCardDiv>
    </div>
  );

  return connectDragSource(wrappedCardItem);
};

const source = {
  beginDrag(props) {
    const { dropColumn, card, sourceId } = props;
    props.handleBeginDrag(dropColumn, sourceId, card);
    props.handleChangeCardPosition(card);

    return {};
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }
    return props.handleDrop();
  }

  // isDragging(props, monitor) {
  //   const { card, hoverIndex } = props;
  //   const dragIndex = card.position;

  //   // Don't replace items with themselves
  //   if (dragIndex === hoverIndex) {
  //     return;
  //   }
  //   // Determine rectangle on screen
  //   const hoverBoundingRect = node.getBoundingClientRect();
  //   console.log("hoverBoundingRect: ", hoverBoundingRect);
  //   // Get vertical middle
  //   const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //   // Determine mouse position
  //   const clientOffset = monitor.getClientOffset();
  //   // Get pixels to the top
  //   const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  //   // Only perform the move when the mouse has crossed half of the items height
  //   // When dragging downwards, only move when the cursor is below 50%
  //   // When dragging upwards, only move when the cursor is above 50%
  //   // Dragging downwards
  //   if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //     return;
  //   }
  //   // Dragging upwards
  //   if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  //     return;
  //   }
  //   // Time to actually perform the action
  //   props.moveCard(dragIndex, hoverIndex);
  //   // Note: we're mutating the monitor item here!
  //   // Generally it's better to avoid mutations,
  //   // but it's good here for the sake of performance
  //   // to avoid expensive index searches.
  //   card.position = hoverIndex;
  // }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

export default DragSource(Types.COLUMN, source, collect)(CardItem);
