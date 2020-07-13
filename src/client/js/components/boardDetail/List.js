import React, { useRef, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { DragSource, DropTarget } from "react-dnd";

import { Segment } from "semantic-ui-react";

import { DRAG_TYPES } from "../../constants/constants";
import { useBoardListContext, useMainContext } from "../../utils/hookUtils";
import CardsWrapper from "./CardsWrapper";
import CreateCard from "../sharedComponents/CreateCard";
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
  border-radius: px !important;
  padding: 6px !important;
`;

const CardsContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;

// eslint-disable-next-line react/display-name
const List = forwardRef(
  (
    { connectDragSource, connectDropTarget, list, isDragging, position },
    ref
  ) => {
    const { activeList } = useBoardListContext();
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
      maxHeight: mobile ? "91vh" : "92vh",
      WebkitTransform: "transform",
    };

    const wrappedList = (
      <div ref={dragListRef} style={styles}>
        <ListSegment>
          <ListMenu
            listId={_id}
            listPosition={position}
            mobile={mobile}
            title={title}
          />

          <CardsContainer className="card-list">
            <CardsWrapper
              cards={cards}
              sourceListId={_id}
              listPosition={position}
            />
          </CardsContainer>

          <CreateCard
            targetList={{ position, listId: _id }}
            activeList={activeList === _id}
          />
        </ListSegment>
      </div>
    );

    return wrappedList;
  }
);

const forwardedList = List;

export default DropTarget(
  DRAG_TYPES.LIST,
  {
    hover(props, monitor, component) {
      if (!component) return null;

      const node = component.getNode();
      if (!node) return null;

      const dragIndex = monitor.getItem().id;
      const hoverIndex = props.position - 1;
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

    drop(props) {
      props.listDropHandler();
    },
  },
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(
  DragSource(
    DRAG_TYPES.LIST,
    {
      beginDrag: (props) => {
        !props.dragIndex && props.setDragIndex(props.position - 1);
        return {
          id: props.dragIndex || props.position - 1,
          index: props.position - 1,
        };
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(forwardedList)
);
