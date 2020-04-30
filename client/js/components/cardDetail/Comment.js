import React, { useState, useEffect, Fragment, lazy, Suspense } from "react";
import styled from "styled-components";

import { getUserInitials, getFormattedDate } from "../../utils/appUtils";

import UserAvatar from "../sharedComponents/UserAvatar";
import CreateInput from "../sharedComponents/CreateInput";

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

const Comment = ({
  activeCard,
  handleBoardUpdate,
  board,
  comment,
  getSourceList,
  sourceId,
  saveCardChanges,
}) => {
  const { creator, createdAt } = comment;

  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [deleteComment, setDeleteComment] = useState(null);
  const [editComment, setEditComment] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(false);
  const [newComment, setNewComment] = useState(null);

  const handleEmojiClick = (emoji, commentId, removeEmoji) =>
    setSelectedEmoji({ emoji, commentId, removeEmoji });

  const handleEditComment = () => setEditComment(!editComment);
  const handleDeleteComment = (commentId) => setDeleteComment(commentId);
  const handleAddClick = () => setUpdatedComment(true);
  const handleChange = (e) => setNewComment(e.target.value);

  useEffect(() => {
    const sourceList = getSourceList(sourceId, "_id");
    let newCard;

    if (updatedComment) {
      newCard = {
        ...activeCard,
        comments: activeCard.comments.map((item) =>
          item._id === comment._id
            ? { ...item, comment: newComment }
            : { ...item }
        ),
      };

      setEditComment(false);
    }

    if (deleteComment) {
      const hasMoreThanOneComment = activeCard.comments.length > 1;
      newCard = {
        ...activeCard,
        comments: hasMoreThanOneComment
          ? activeCard.comments.splice(activeCard.comments.indexOf(comment, 1))
          : [],
      };
    }

    if (selectedEmoji && !selectedEmoji.removeEmoji) {
      newCard = {
        ...activeCard,
        comments: activeCard.comments.map((item) =>
          item._id === selectedEmoji.commentId
            ? { ...item, emojis: [...item.emojis, selectedEmoji.emoji] }
            : { ...item }
        ),
      };
    }
    if (selectedEmoji && selectedEmoji.removeEmoji) {
      newCard = {
        ...activeCard,
        comments: activeCard.comments.map((item) => {
          const removeIndex = item._id === selectedEmoji.commentId;
          const hasMoreThanOneEmoji = item.emojis.length > 1;
          return removeIndex
            ? {
                ...item,
                emojis: hasMoreThanOneEmoji
                  ? item.emojis.splice(
                      item.emojis.indexOf(selectedEmoji.emoji, 1)
                    )
                  : [],
              }
            : { ...item };
        }),
      };
    }

    if (newCard) {
      saveCardChanges(newCard);

      sourceList.cards.splice(sourceList.cards.indexOf(activeCard), 1, newCard);
      board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

      handleBoardUpdate(board, "lists");
    }

    return () => {
      setSelectedEmoji(null);
      setDeleteComment(null);
      setUpdatedComment(false);
    };
  }, [
    selectedEmoji,
    activeCard,
    board,
    handleBoardUpdate,
    getSourceList,
    sourceId,
    saveCardChanges,
    deleteComment,
    updatedComment,
    comment,
    newComment,
  ]);

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
            handleCreateClick={handleAddClick}
            handleChange={handleChange}
            id="edit-comment-input"
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
              commentId={comment._id}
              emojis={comment.emojis}
            />
          </Suspense>
        </CommentWrapper>
      </StyledSegment>
    </Fragment>
  );
};

export default Comment;
