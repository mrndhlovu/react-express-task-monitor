import React, { useState, useEffect, Fragment, lazy, Suspense } from "react";

import { emptyFunction, resetForm } from "../../utils/appUtils";
import { requestCreateComment } from "../../apis/apiRequests";
import CardCommentInput from "../sharedComponents/CardCommentInput";

const Comment = lazy(() => import("./Comment"));

const CardComments = ({
  handleBoardUpdate,
  activeCard,
  id,
  sourceId,
  saveCardChanges,
  getSourceList,
  board,
  ...props
}) => {
  const [newComment, setNewComment] = useState(null);

  const saveComment = (comment) => setNewComment(comment);

  useEffect(() => {
    if (!newComment) return emptyFunction();
    const body = {
      comment: newComment,
      cardId: activeCard._id,
      listId: sourceId,
    };

    const createComment = async () => {
      await requestCreateComment(body, id).then((res) => {
        setNewComment(null);
        try {
          saveCardChanges(res.data);
          resetForm("comment-input");
          console.log("comment: ", res.data);
        } catch (error) {}
      });
    };

    createComment();
  }, [newComment, id, sourceId, activeCard, saveCardChanges]);

  return (
    <Fragment>
      <CardCommentInput saveComment={saveComment} {...props} />

      {activeCard.comments.map((comment) => (
        <Suspense fallback={<div>Loading...</div>}>
          <Comment
            key={comment._id}
            comment={comment}
            getSourceList={getSourceList}
            sourceId={sourceId}
            activeCard={activeCard}
            handleBoardUpdate={handleBoardUpdate}
            board={board}
            saveCardChanges={saveCardChanges}
          />
        </Suspense>
      ))}
    </Fragment>
  );
};

export default CardComments;
