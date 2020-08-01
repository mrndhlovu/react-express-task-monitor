import React, { useState, Fragment, lazy, Suspense } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { getUserInitials, getFormattedDate } from "../../utils/appUtils";

import { useCardDetailContext } from "../../utils/hookUtils";
import CreateInput from "../sharedComponents/CreateInput";
import UserAvatar from "../sharedComponents/UserAvatar";

const EditCommentIcons = lazy(() => import("./EditCommentIcons"));

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 16fr;
  align-items: center;
  justify-items: start;
`;

const StyledSmall = styled.div`
  padding-left: 10px;
`;

const TimeStamp = styled.small`
  padding-left: 10px;
`;

const UserLabel = styled.span`
  font-weight: 700;
`;

const StyledSegment = styled.div`
  display: flex;
  flex-flow: column-reverse;
`;

const EditCommentInputWrapper = styled.div`
  padding: 8px 2%;
`;

const CommentWrapper = styled.div`
  padding-left: 9%;
  display: flex;
`;

const Comment = ({ comment }) => {
  const { card, updatedCardChanges } = useCardDetailContext();

  const { creator, createdAt } = comment;

  const [editComment, setEditComment] = useState(false);
  const [newComment, setNewComment] = useState(null);

  const handleEmojiClick = (emoji, comment, removeEmoji) => {
    const commentIndex = card.comments.indexOf(comment);
    const emojiIndex = comment.emojis.indexOf(emoji);

    if (removeEmoji) comment.emojis.splice(emojiIndex, 1);
    else comment.emojis.push(emoji);

    card.comments.splice(commentIndex, 1, comment);

    updatedCardChanges(card);
  };

  const handleEditComment = () => setEditComment(!editComment);

  const handleDeleteComment = (targetComment) => {
    const commentIndex = card.comments.indexOf(targetComment);
    card.comments.splice(commentIndex, 1);
    updatedCardChanges(card);
  };

  const handleAddClick = () => {
    const commentIndex = card.comments.indexOf(comment);
    card.comments.splice(commentIndex, 1, {
      ...comment,
      comment: newComment,
    });
    updatedCardChanges(card);
    setEditComment(!editComment);
  };

  const handleChange = (e) => setNewComment(e.target.value);

  return (
    <Fragment>
      <Container>
        <UserAvatar userInitials={getUserInitials(creator)} />
        <StyledSmall>
          <UserLabel> {creator}</UserLabel>
          <TimeStamp>{getFormattedDate(createdAt, null, true)}</TimeStamp>
        </StyledSmall>
      </Container>
      {editComment && (
        <EditCommentInputWrapper>
          <CreateInput
            close={handleEditComment}
            buttonText="Add"
            defaultValue={comment.comment}
            createItemClickHandler={handleAddClick}
            handleChange={handleChange}
            id="edit-comment-input"
            width="100%"
          />
        </EditCommentInputWrapper>
      )}
      <StyledSegment>
        <CommentWrapper>
          {!editComment && comment.comment}
          <Suspense fallback={<div>Loading...</div>}>
            <EditCommentIcons
              handleEmojiClick={handleEmojiClick}
              handleEditComment={handleEditComment}
              handleDeleteComment={handleDeleteComment}
              comment={comment}
            />
          </Suspense>
        </CommentWrapper>
      </StyledSegment>
    </Fragment>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    emojis: PropTypes.arrayOf(PropTypes.object).isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
