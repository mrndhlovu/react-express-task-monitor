import React, { useRef, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { DragSource, DropTarget } from "react-dnd";
import { flow } from "lodash";
import PropTypes from "prop-types";

import { Segment } from "semantic-ui-react";

import { DRAG_TYPES } from "../../constants/constants";
import { useBoardListContext, useMainContext } from "../../utils/hookUtils";
import Cards from "./Cards";
import CreateCard from "../shared/CreateCard";
import ListMenu from "./ListMenu";

const ListSegment = styled(Segment)`
  background-color: #ebecf0 !important;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  margin: 0 !important;
  position: relative;
  white-space: normal;
  border-radius: 2px !important;
  padding: 6px !important;
  max-height: ${({ height }) => height} !important;
`;

const CardsContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;

// eslint-disable-next-line react/display-name
const List = forwardRef(
  (
    {
      connectDragSource,
      connectDropTarget,
      list,
      isDragging,
      position,
      ...rest
    },
    ref
  ) => {
    const { activeListId } = useBoardListContext();
    const { mobile } = useMainContext().device;

    const { title, cards, _id } = list;

    const dragListRef = useRef(null);

    connectDragSource(connectDropTarget(dragListRef));

    useImperativeHandle(ref, () => ({
      getNode: () => dragListRef.current,
    }));

    const styles = {
      minWidth: "272px",
      verticalAlign: "top",
      marginRight: "8px",
      opacity: isDragging ? 0 : 1,
      whiteSpace: "nowrap",
      height: mobile ? "88vh" : "90vh",
      WebkitTransform: "transform",
    };

    const wrappedList = (
      <div ref={dragListRef} style={styles}>
        <ListSegment height={mobile ? "88vh" : "90vh"}>
          <ListMenu
            listId={_id}
            listPosition={position}
            mobile={mobile}
            title={title}
          />

          <CardsContainer className="card-list">
            <Cards
              cards={cards}
              sourceListId={_id}
              listPosition={position}
              {...rest}
            />
          </CardsContainer>

          <CreateCard
            targetList={{ position, listId: _id }}
            activeListId={activeListId === _id}
          />
        </ListSegment>
      </div>
    );

    return wrappedList;
  }
);
const forwardedList = List;

forwardedList.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  list: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    _id: PropTypes.string.isRequired,
  }),
  isDragging: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
};

const listSource = {
  beginDrag(props) {
    !props.dragIndex && props.setDragIndex(props.position - 1);
    return {
      id: props.dragIndex || props.position - 1,
      index: props.position - 1,
    };
  },
  endDrag(props) {
    return props.listDropHandler();
  },
};

const listTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().id;
    const hoverIndex = props.position - 1;
    const isDraggingCard = monitor.getItemType() === DRAG_TYPES.CARD;
    props.setHoverIndex(hoverIndex);

    if (isDraggingCard) {
      const sourceIndex = monitor.getItem().listIndex;

      const isSource = props.hoverIndex === hoverIndex;

      if (isSource) return null;

      props.cardToNewListHandler(dragIndex, hoverIndex, sourceIndex);

      return monitor.getItem().id === hoverIndex;
    }

    if (!component) return null;

    const node = component.getNode();
    if (!node) return null;

    if (dragIndex === hoverIndex) return;

    const hoverBoundingRect = node.getBoundingClientRect();

    const hoverMiddleX = hoverBoundingRect.bottom;

    const clientOffset = monitor.getClientOffset();

    const hoverClientX = clientOffset.x / dragIndex;

    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;

    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

    props.moveListHandler(hoverIndex);

    monitor.getItem().id = hoverIndex;
  },
};

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const targetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  itemType: monitor.getItemType(),
  dropResult: monitor.getDropResult(),
  didDrop: monitor.didDrop(),
});

export default flow(
  DragSource(DRAG_TYPES.LIST, listSource, sourceCollect),
  DropTarget([DRAG_TYPES.LIST, DRAG_TYPES.CARD], listTarget, targetCollect)
)(forwardedList);
