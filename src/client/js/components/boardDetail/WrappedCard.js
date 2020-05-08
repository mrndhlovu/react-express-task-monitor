import React, { memo, useState, useRef } from "react";

import { useDrag, useDrop } from "react-dnd";

import { Types } from "../../constants/constants";
import CardItem from "./CardItem";

const WrappedCard = ({
  card,
  cardPosition,
  index,
  isLast,
  isOverCard,
  listPosition,
  listTitle,
  sortCards,
  sourceListId,
}) => {
  const [showEditButton, setShowEditButton] = useState(false);

  const styles = {
    transform: isDragging && "translate3d(10px, 15px, 0)",
    background: !isDragging && "#fff",
    borderRadius: "3px",
    boxShadow: !isDragging && "0 1px 0 #091e4240",
    marginTop: "7px",
    minHeight: "20px",
    position: isDragging ? "absolute" : "relative",
    zIndex: 0,
  };

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: Types.CARD,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = { card: index, list: listPosition };

      if (dragIndex === hoverIndex.card) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex.card && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex.card && hoverClientY > hoverMiddleY) return;

      sortCards(dragIndex, hoverIndex);
      item.index = hoverIndex.card;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: Types.CARD, cardPosition, listPosition, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const dragCardItem = (
    <div
      ref={ref}
      style={{ ...styles, opacity }}
      onMouseEnter={() => setShowEditButton(true)}
      onMouseLeave={() => setShowEditButton(false)}
    >
      <CardItem
        isOverCard={isOverCard}
        card={card}
        sourceListId={sourceListId}
        listPosition={listPosition}
        sourceTitle={listTitle}
        isLast={isLast}
        showEditButton={showEditButton}
      />
    </div>
  );

  return dragCardItem;
};

export default memo(WrappedCard);
