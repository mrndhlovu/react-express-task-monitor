import React from "react";
import styled from "styled-components";

import { Form } from "semantic-ui-react";
import UserLabel from "../sharedComponents/UserLabel";

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 7% 93%;
  align-items: center;
`;

const CardComment = () => {
  return (
    <Container>
      <div>
        <UserLabel />
      </div>
      <div>
        <Form>
          <Form.Field>
            <input placeholder="Write a comment" />
          </Form.Field>
        </Form>
      </div>
    </Container>
  );
};

export default CardComment;
