import React from "react";
import styled from "styled-components";

import { DropTarget } from "react-dnd";

import { Header, Segment, Icon } from "semantic-ui-react";
import CreateCard from "../sharedComponents/CreateCard";
import CardItemWrapper from "./CardItemWrapper";
import { Types } from "../../constants/constants";

const StyledSegment = styled(Segment)`
  max-width: 272px;
  min-height: 100px;
  background-color: #ebecf0 !important;
  margin-right: 10px !important;
`;

const StyledHeader = styled(Header)`
  font-size: 13px !important;
`;

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  padding-bottom: 10px;
`;

const List = ({
  activeList,
  list,
  connectDropTarget,
  sourceId,
  isOver,
  showListActions,
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
        <HeaderWrapper>
          <div>
            <StyledHeader content={title} />
          </div>
          <div>
            <Icon
              link
              name="ellipsis horizontal"
              color="grey"
              onClick={() => showListActions()}
            />
          </div>
        </HeaderWrapper>
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
