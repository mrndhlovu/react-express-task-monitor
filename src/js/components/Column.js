import React from "react";

import { DropTarget } from "react-dnd";

import { Header, Segment } from "semantic-ui-react";
import styled from "styled-components";
import CreateCard from "./CreateCard";
import CardItemWrapper from "./CardItemWrapper";
import { Types } from "../constants/constants";

const StyledSegment = styled(Segment)`
  max-width: 300px;
  min-height: 100px;
  background-color: #ebecf0 !important;
  margin-right: 10px !important;
`;

const StyledHeaderHeader = styled(Header)`
  padding-top: 5px !important;
`;

const Column = ({
  connectDropTarget,
  columnHasCards,
  activeColumn,
  column,
  highlighted,
  isOverCurrent,
  canDrop,
  ...rest
}) => {
  const { name, id, cards } = column;
  const styles = {
    paddingBottom: columnHasCards && "20px !important"
  };
  const wrappedColumn = (
    <div style={styles}>
      <StyledSegment>
        <StyledHeaderHeader size="tiny">{name}</StyledHeaderHeader>
        {columnHasCards && (
          <CardItemWrapper cards={cards} columnId={id} {...rest} />
        )}
        <CreateCard
          cards={cards}
          columnId={id}
          activeColumn={activeColumn === id}
          {...rest}
        />
      </StyledSegment>
    </div>
  );

  return connectDropTarget(wrappedColumn);
};

const target = {
  drop(props) {
    return props.handleDrag(props.column);
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  highlighted: monitor.canDrop(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop()
});

export default DropTarget(Types.COLUMN, target, collect)(Column);
