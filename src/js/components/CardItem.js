import React from "react";
import styled from "styled-components";

import { DragSource } from "react-dnd";

import { Types } from "../constants/constants";

import { Header } from "semantic-ui-react";

const StyledCardDiv = styled.div`
  background-color: #fff !important;
  cursor: pointer;
  margin: 10px 5px !important;
  position: relative;
  text-decoration: none;
  z-index: 0;
  padding: 5px 0px 3px 10px;
  visibility: ${props => props.isDragging && "hidden"};
  border-radius: inherit;
`;

const CardItem = ({ connectDragSource, card, isDragging }) => {
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
