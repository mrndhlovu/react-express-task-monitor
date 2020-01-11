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

const StyledNewCardDropZone = styled.div`
  background-color: #c4c4c4 !important;
  margin: 10px 10px !important;
  min-height: 25px;
  position: relative;
  text-decoration: none;
  z-index: 0;
  padding: 5px 0px 3px 10px;
  border-radius: 5px;
`;

const Column = ({
  activeColumn,
  canDrop,
  column,
  columnHasCards,
  connectDropTarget,
  dropColumn,
  highlighted,
  isOverCurrent,
  sourceId,
  updateDropTarget,
  ...rest
}) => {
  const { name, id, cards } = column;

  if (isOverCurrent) {
    updateDropTarget(column);
  }

  const wrappedColumn = (
    <div>
      <StyledSegment floated="left">
        <StyledHeaderHeader size="tiny">{name}</StyledHeaderHeader>
        {columnHasCards && (
          <CardItemWrapper
            cards={cards}
            columnId={id}
            dropColumn={dropColumn ? dropColumn : column}
            sourceId={sourceId ? sourceId : id}
            isOverCurrent={isOverCurrent}
            {...rest}
          />
        )}

        {isOverCurrent && <StyledNewCardDropZone />}
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
