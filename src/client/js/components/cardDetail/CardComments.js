import React, { lazy, Suspense } from "react";

import { resetForm } from "../../utils/appUtils";
import { requestCreateComment } from "../../apis/apiRequests";
import { useCardDetailContext, useMainContext } from "../../utils/hookUtils";
import CardCommentInput from "../sharedComponents/CardCommentInput";
import UIContainer from "../sharedComponents/UIContainer";

const Comment = lazy(() => import("./Comment"));

const CardComments = () => {
  const { card, sourceId, saveCardChanges, id } = useCardDetailContext();
  const { alertUser } = useMainContext();

  const handleSaveComment = async (comment) => {
    const body = {
      comment,
      cardId: card._id,
      listId: sourceId,
    };

    await requestCreateComment(body, id)
      .then((res) => {
        saveCardChanges(res.data);
        resetForm("comment-input");
      })
      .catch((error) => alertUser(error.response.data.message));
  };

  return (
    <>
      <CardCommentInput saveComment={handleSaveComment} />
      <Suspense fallback={<div>Loading...</div>}>
        {card.comments.map((comment) => (
          <UIContainer key={comment._id} padding="10px 0">
            <Comment comment={comment} />
          </UIContainer>
        ))}
      </Suspense>
    </>
  );
};

export default CardComments;
