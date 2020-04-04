import React, { useState, useEffect } from "react";

import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import CardCommentInput from "../sharedComponents/CardCommentInput";
import { emptyFunction, resetForm } from "../../utils/appUtils";
import { requestCreateComment } from "../../apis/apiRequests";
import Comment from "./Comment";

const CardComments = ({
  backendUpdate,
  activeCard,
  id,
  listPosition,
  saveCardChanges,
  getSourceList,
  board,
  ...props
}) => {
  const [newComment, setNewComment] = useState(null);

  const saveComment = comment => setNewComment(comment);

  useEffect(() => {
    if (!newComment) return emptyFunction();
    const body = {
      comment: newComment,
      cardId: activeCard.position,
      listId: listPosition
    };

    const createComment = async () => {
      await requestCreateComment(body, id).then(res => {
        setNewComment(null);
        try {
          saveCardChanges(res.data);
          resetForm("comment-input");
          console.log("comment: ", res.data);
        } catch (error) {}
      });
    };

    createComment();
  }, [newComment, id, listPosition, activeCard, saveCardChanges]);

  return (
    <CardDetailSegment>
      <CardCommentInput saveComment={saveComment} {...props} />

      {activeCard.comments.map(comment => (
        <Comment
          key={comment._id}
          comment={comment}
          getSourceList={getSourceList}
          listPosition={listPosition}
          activeCard={activeCard}
          backendUpdate={backendUpdate}
          board={board}
          saveCardChanges={saveCardChanges}
        />
      ))}
    </CardDetailSegment>
  );
};

export default CardComments;
