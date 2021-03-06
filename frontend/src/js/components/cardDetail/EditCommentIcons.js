import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Picker, Emoji } from "emoji-mart";

const DropdownButton = lazy(() => import("../shared/DropdownButton"));

const Container = styled.div`
  padding-left: 10px;
  display: flex;
  justify-content: center;
`;

const EmojiWrapper = styled.span`
  cursor: pointer;
`;

const CommentLink = styled.a`
  color: grey;
  transition-duration: 600ms;
  transition-property: color;
  cursor: pointer;
  &:hover {
    color: grey;
  }

  &:after {
    content: "${(props) => props.content}";
    padding: 0 5px;
    text-decoration: underline;
    font-size: 10px;
  }
`;

const EditCommentIcons = ({
  handleEmojiClick,
  handleEditComment,
  handleDeleteComment,
  comment,
}) => {
  const hasEmojis = comment.emojis.length !== 0;

  return (
    <Container>
      {hasEmojis ? (
        comment.emojis.map((emoji) => (
          <EmojiWrapper key={emoji.id}>
            <Emoji
              emoji={{ id: emoji.id }}
              size={16}
              onClick={(emoji) => handleEmojiClick(emoji, comment, "remove")}
            />
          </EmojiWrapper>
        ))
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <DropdownButton
            upward={true}
            button={false}
            header="Emoji"
            icon="meh outline"
            direction="right"
          >
            <Picker
              set="apple"
              onSelect={(emoji) => handleEmojiClick(emoji, comment)}
            />
          </DropdownButton>
        </Suspense>
      )}

      <CommentLink content="Edit" onClick={() => handleEditComment()} />
      <CommentLink
        content="Delete"
        onClick={() => handleDeleteComment(comment)}
      />
    </Container>
  );
};

EditCommentIcons.propTypes = {
  handleEmojiClick: PropTypes.func.isRequired,
  handleEditComment: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    emojis: PropTypes.arrayOf(PropTypes.object).isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditCommentIcons;
