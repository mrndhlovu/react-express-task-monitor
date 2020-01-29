import React from "react";
import styled from "styled-components";

import { DropTarget } from "react-dnd";

import { Header, Segment } from "semantic-ui-react";
import CreateCard from "../sharedComponents/CreateCard";
import CardItemWrapper from "./CardItemWrapper";
import { Types } from "../../constants/constants";

const StyledSegment = styled(Segment)`
  max-width: 300px;
  min-height: 100px;
  background-color: #ebecf0 !important;
  margin-right: 10px !important;
`;

const StyledHeaderHeader = styled(Header)`
  padding-top: 5px !important;
`;

const List = ({
  activeList,
  list,
  connectDropTarget,
  sourceId,
  isOver,
  ...rest
}) => {
  const { title, position, cards } = list;

  const styles = {
    display: "inline-block",
    verticalAlign: "top",
    boxSizing: "border-box"
  };

  const wrappedColumn = (
    <div style={styles} id={`list-${position}`}>
      <StyledSegment>
        <StyledHeaderHeader size="tiny">{title}</StyledHeaderHeader>

        <CardItemWrapper cards={cards} sourceId={position} {...rest} />

        <CreateCard
          cards={cards}
          listId={position}
          activeList={activeList === position}
          {...rest}
        />
      </StyledSegment>
    </div>
  );

  return connectDropTarget(wrappedColumn);
};

const target = {
  drop(props) {
    return props.handleChangeCardList();
  },
  hover(props) {
    const { list } = props;

    return props.updateDropTargetId(list.position);
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true })
});

export default DropTarget(Types.LIST, target, collect)(List);
