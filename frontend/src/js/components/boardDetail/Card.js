import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import flow from "lodash/flow";
import { DragSource, DropTarget } from "react-dnd";
import PropTypes from "prop-types";

import { DRAG_TYPES } from "../../constants/constants";

import CardDetail from "./CardDetail";

// eslint-disable-next-line react/display-name
const Card = forwardRef(
  (
    {
      card,
      connectDragSource,
      connectDropTarget,
      isDragging,
      isLast,
      listPosition,
      sourceListId,
    },
    ref
  ) => {
    const [showEditButton, setShowEditButton] = useState(false);
    const dragCardRef = useRef(null);

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
        <CardDetail
          card={card}
          sourceListId={sourceListId}
          listPosition={listPosition}
          isLast={isLast}
          showEditButton={showEditButton}
        />
      </div>
    );

    return connectDragSource(connectDropTarget(wrappedCardItem));
  }
);

const forwardedCard = Card;

forwardedCard.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  card: PropTypes.shape({ _id: PropTypes.string.isRequired }),
  isDragging: PropTypes.bool.isRequired,
  listPosition: PropTypes.number.isRequired,
  sourceListId: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
};

const cardSource = {
  beginDrag(props) {
    !props.dragIndex && props.setDragIndex(props.position - 1);
    return {
      id: props.cardIndex,
      index: props.cardIndex,
      listIndex: props.listPosition - 1,
    };
  },
  endDrag(props, monitor) {
    return props.cardDropHandler(monitor.getItem().id);
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    if (!component) return null;

    const node = component.getNode();
    if (!node) return null;

    const cardDragIndex = monitor.getItem().id;
    const cardHoverIndex = props.cardIndex;

    const listHoverIndex = props.listPosition - 1;

    if (cardDragIndex === cardHoverIndex) return;

    const hoverBoundingRect = node.getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (cardDragIndex < cardHoverIndex && hoverClientY < hoverMiddleY) return;

    if (cardDragIndex > cardHoverIndex && hoverClientY > hoverMiddleY) return;

    props.cardRepositionHandler(cardDragIndex, cardHoverIndex, listHoverIndex);

    monitor.getItem().id = cardHoverIndex;
    monitor.getItem().listIndex = listHoverIndex;
  },
};

const targetCollect = (connect) => ({
  connectDropTarget: connect.dropTarget(),
});

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default flow(
  DragSource(DRAG_TYPES.CARD, cardSource, sourceCollect),
  DropTarget(DRAG_TYPES.CARD, cardTarget, targetCollect)
)(forwardedCard);
