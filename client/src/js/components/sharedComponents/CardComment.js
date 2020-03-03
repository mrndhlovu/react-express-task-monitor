import React, { useState } from "react";
import styled from "styled-components";

import { Form, Button } from "semantic-ui-react";
import UserAvatar from "./UserAvatar";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 16fr;
  align-items: center;
  padding-bottom: 10px;
`;

const ButtonContainer = styled.div`
  padding-left: 6%;
`;

const AvatarContainer = styled.div``;

const CardComment = ({ comment, saveComment }) => {
  const [newComment, setNewComment] = useState(null);
  const [focus, setFocus] = useState(false);

  const handleChange = e => {
    setNewComment(e.target.value);
  };

  const handleSaveClick = () => {
    const id = comment ? comment.id : null;
    saveComment(newComment, id);
    setNewComment(null);
    setFocus(false);
  };

  return (
    <>
      <Container>
        <AvatarContainer>
          <UserAvatar />
        </AvatarContainer>
        <div>
          <Form>
            <Form.Field>
              <input
                placeholder={comment ? comment : "Write a comment"}
                onFocus={() => setFocus(true)}
                onChange={e => handleChange(e)}
              />
            </Form.Field>
          </Form>
        </div>
      </Container>
      {focus && (
        <ButtonContainer>
          <Button
            content="Save"
            positive
            size="tiny"
            onClick={() => handleSaveClick()}
          />
        </ButtonContainer>
      )}
    </>
  );
};

export default CardComment;
