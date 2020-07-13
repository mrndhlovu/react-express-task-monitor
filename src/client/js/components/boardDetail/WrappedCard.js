import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import { DragSource, DropTarget } from "react-dnd";

import { DRAG_TYPES } from "../../constants/constants";

import CardItem from "./CardItem";

// eslint-disable-next-line react/display-name
const WrappedCard = forwardRef(
  (
    {
      card,
      connectDragSource,
      connectDropTarget,
      isDragging,
      isLast,
      isOverCard,
      listPosition,
      sourceListId,
    },
    ref
  ) => {
    const [showEditButton, setShowEditButton] = useState(false);
    const dragCardRef = useRef(null);

    connectDragSource(connectDropTarget(dragCardRef));

    useImperativeHandle(ref, () => ({
      getNode: () => dragCardRef.current,
    }));

    const styles = {
      transform: isDragging && "translate3d(10px, 15px, 0)",
      opacity: isDragging ? 0 : 1,
      borderRadius: isDragging && "3px",
    };

    const wrappedCardItem = (
      <div
        ref={dragCardRef}
        style={styles}
        onMouseEnter={() => setShowEditButton(true)}
        onMouseLeave={() => setShowEditButton(false)}
      >
        <CardItem
          isOverCard={isOverCard}
          card={card}
          sourceListId={sourceListId}
          listPosition={listPosition}
          isLast={isLast}
          showEditButton={showEditButton}
        />
      </div>
    );

    return wrappedCardItem;
  }
);

const forwardedCard = WrappedCard;

export default DropTarget(
  DRAG_TYPES.CARD,
  {
    hover(props, monitor, component) {
      if (!component) return null;

      const node = component.getNode();
      if (!node) return null;

      const dragIndex = monitor.getItem().id;
      const hoverIndex = props.cardIndex;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = node.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      props.cardRepositionHandler(dragIndex, hoverIndex);

      monitor.getItem().id = hoverIndex;
    },

    drop(props, monitor) {
      props.cardDropHandler(monitor.getItem().id);
    },
  },
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(
  DragSource(
    DRAG_TYPES.CARD,
    {
      beginDrag: (props) => ({
        id: props.cardIndex,
        index: props.cardIndex,
      }),
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(forwardedCard)
);
