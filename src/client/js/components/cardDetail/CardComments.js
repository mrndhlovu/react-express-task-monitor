import React, { useState, useEffect, lazy, Suspense } from "react";

import { emptyFunction, resetForm } from "../../utils/appUtils";
import { requestCreateComment } from "../../apis/apiRequests";
import CardCommentInput from "../sharedComponents/CardCommentInput";
import UIContainer from "../sharedComponents/UIContainer";

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
        saveCardChanges(res.data);
        resetForm("comment-input");
      });
    };

    createComment();
  }, [newComment, id, sourceId, activeCard, saveCardChanges]);

  return (
    <>
      <CardCommentInput saveComment={saveComment} {...props} />
      <Suspense fallback={<div>Loading...</div>}>
        {activeCard.comments.map((comment) => (
          <UIContainer key={comment._id} padding="10px 0">
            <Comment
              comment={comment}
              getSourceList={getSourceList}
              sourceId={sourceId}
              activeCard={activeCard}
              handleBoardUpdate={handleBoardUpdate}
              board={board}
              saveCardChanges={saveCardChanges}
            />
          </UIContainer>
        ))}
      </Suspense>
    </>
  );
};

export default CardComments;
