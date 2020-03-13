import React from "react";
import styled from "styled-components";
import moment from "moment";

import { Comment, Segment } from "semantic-ui-react";

const Divider = styled.div`
  min-height: 30px;
`;

const Thread = ({ avatar, date, comment, name, owner }) => {
  return (
    <>
      <Segment
        floated={owner ? "left" : "right"}
        color={owner ? "olive" : "red"}
        compact
      >
        <Comment>
          <Comment.Avatar as="a" src={avatar} />
          <Comment.Content>
            <Comment.Author>{name}</Comment.Author>
            <Comment.Metadata>
              <div>{moment(date).format("LLL")}</div>
            </Comment.Metadata>
            <Comment.Text>{comment}</Comment.Text>
          </Comment.Content>
        </Comment>
      </Segment>
      <Divider />
    </>
  );
};

export default Thread;
