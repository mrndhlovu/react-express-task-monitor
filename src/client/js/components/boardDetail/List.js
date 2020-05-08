import React, { useContext, memo } from "react";
import styled from "styled-components";
import { debounce } from "debounce";

import flow from "lodash/flow";

import { DragSource, DropTarget } from "react-dnd";

import { Segment } from "semantic-ui-react";

import { BoardListsContext, MainContext } from "../../utils/contextUtils";
import { Types } from "../../constants/constants";
import CardsWrapper from "./CardsWrapper";
import CreateCard from "../sharedComponents/CreateCard";
import ListHeader from "./ListHeader";

const ListSegment = styled(Segment)`
  background-color: #ebecf0 !important;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  margin: 0 !important;
  position: relative;
  white-space: normal;
  border-radius: px !important;
  padding: 6px !important;
`;

const CardsContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;

const List = ({
  connectDragSource,
  connectDropTarget,
  list,
  isDragging,
  isOverCurrent,
  position,
  ...rest
}) => {
  const {
    showListActions,
    activeList,
    getSourceList,
    handleBoardUpdate,
    board,
    saveBoardChanges,
    ...otherProps
  } = useContext(BoardListsContext);
  const { mobile } = useContext(MainContext).device;

  const { title, cards, _id } = list;

  const styles = {
    minWidth: "272px",
    verticalAlign: "top",
    marginRight: "8px",
    visibility: isDragging && "hidden",
    opacity: isDragging ? 0 : 1,
    whiteSpace: "nowrap",
    height: mobile ? "91vh" : "92vh",
    transform: isOverCurrent && "translate3d(0, 10px, 0)",
    WebkitTransform: "transform",
  };

  const wrappedList = (
    <div style={styles}>
      <ListSegment>
        <ListHeader
          board={board}
          getSourceList={getSourceList}
          handleBoardUpdate={handleBoardUpdate}
          listId={_id}
          listPosition={position}
          mobile={mobile}
          saveBoardChanges={saveBoardChanges}
          showListActions={showListActions}
          title={title}
        />

        <CardsContainer className="card-list">
          <CardsWrapper
            cards={cards}
            sourceListId={_id}
            listPosition={position}
            listTitle={title}
            {...rest}
            {...otherProps}
          />
        </CardsContainer>

        <CreateCard
          targetList={{ position, listId: _id }}
          activeList={activeList === _id}
          {...otherProps}
        />
      </ListSegment>
    </div>
  );

  return connectDragSource(connectDropTarget(wrappedList));
};

const target = {
  drop(props) {
    const { draggingList, reorderCards } = props;
    if (draggingList) return props.reOrderList();
    if (reorderCards) return props.moveCardToNewPosition();

    return props.handleMoveCardToNewList();
  },
  hover(props, monitor) {
    const { list } = props;

    if (!monitor.isOver({ shallow: false })) return;

    debounce(props.updateDropTargetId(list._id), 500);

    return {};
  },
};

const source = {
  beginDrag(props) {
    const { list } = props;
    props.updateSourceId(list._id);

    props.updateDragOption();

    return {};
  },
  endDrag(props) {
    props.updateDragOption();

    return props.handleDrop();
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const sortCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true }),
});

export default flow(
  DragSource(Types.LIST, source, collect),
  DropTarget(Types.LIST, target, sortCollect)
)(memo(List));
