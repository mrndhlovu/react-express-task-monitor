import React, { lazy, Suspense } from "react";
import styled from "styled-components";

import { Picker, Emoji } from "emoji-mart";

const DropdownButton = lazy(() => import("../sharedComponents/DropdownButton"));

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
  color: grey 
  }

  &:after{
  content:'${(props) => props.content}';
  padding: 0 5px;
  text-decoration: underline;
  font-size: 10px
  }
`;

const EditCommentIcons = ({
  handleEmojiClick,
  handleEditComment,
  handleDeleteComment,
  commentId,
  emojis = [],
}) => {
  const hasEmojis = emojis.length !== 0;

  return (
    <Container>
      {hasEmojis ? (
        emojis.map((emoji) => (
          <EmojiWrapper key={emoji.id}>
            <Emoji
              emoji={{ id: emoji.id }}
              size={16}
              onClick={(emoji, event) =>
                handleEmojiClick(emoji, commentId, "remove")
              }
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
              onSelect={(emoji, event) => handleEmojiClick(emoji, commentId)}
            />
          </DropdownButton>
        </Suspense>
      )}

      <CommentLink content="Edit" onClick={() => handleEditComment()} />
      <CommentLink
        content="Delete"
        onClick={() => handleDeleteComment(commentId)}
      />
    </Container>
  );
};

export default EditCommentIcons;
