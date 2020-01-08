import React from "react";
import styled from "styled-components";

import { DragSource } from "react-dnd";

import { Types } from "../constants/constants";

import { Header, Segment } from "semantic-ui-react";

const StyledCardDiv = styled(Segment)`
  background-color: #fff !important;
  cursor: pointer;
  display: block;
  margin-bottom: 10px !important;
  position: relative;
  text-decoration: none;
  z-index: 0;
  padding: 3px 0px 3px 10px;
`;

const CardItem = ({ connectDragSource, card }) => {
  const wrappedCardItem = (
    <div>
      <StyledCardDiv>
        <Header size="small">{card.detail}</Header>
      </StyledCardDiv>
    </div>
  );

  return connectDragSource(wrappedCardItem);
};

const source = {
  beginDrag() {
    return {};
  },
  endDrag(props, monitor) {
    const { card, columnId } = props;
    if (!monitor.didDrop()) {
      return;
    }
    return props.handleDrop(card, columnId);
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

export default DragSource(Types.COLUMN, source, collect)(CardItem);
