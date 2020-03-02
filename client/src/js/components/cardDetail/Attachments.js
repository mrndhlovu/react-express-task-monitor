import React from "react";
import styled from "styled-components";
import moment from "moment";

import { Item } from "semantic-ui-react";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";

const Container = styled.div``;

const HeaderWrapper = styled.div`
  display: flex;
`;

const AttachmentName = styled.div`
  padding: 10px 0 10px 15px;
`;

const AttachmentCtaWrapper = styled.div`
  padding-left: 10px;
`;

const DateWrapper = styled.div`
  padding-top: 6px;
`;

const AttachmentLink = styled.a`
  color: grey;
  transition-duration: 600ms;
  transition-property: color;
  &:hover {
  color: #e0e1e2  
  }

  &:after{
  content:'${props => props.content}';
  padding: 0 5px;
  }
`;

const Attachments = ({
  card,
  handleAttachmentComment,
  handleDeleteAttachment,
  handleRemoveCover,
  isLoading
}) => {
  const { images } = card.attachments;

  const hasAttachments = images.length > 0;

  return isLoading ? (
    <CardDetailSegment>Loading...</CardDetailSegment>
  ) : (
    hasAttachments && (
      <CardDetailSegment>
        <HeaderWrapper>
          <CardDetailHeader icon="attach" description="Attachments" />
        </HeaderWrapper>
        <Item.Group divided>
          {images.map((image, index) => (
            <Item key={index}>
              <AttachmentName>
                <Item.Image size="tiny" src={image.imgUrl} />
              </AttachmentName>
              <Container>
                <AttachmentName>
                  <Item.Content verticalAlign="middle">
                    {image.name}
                  </Item.Content>
                  <DateWrapper>
                    Added {moment(image.uploadDate).format("LL")}
                  </DateWrapper>
                </AttachmentName>

                <AttachmentCtaWrapper>
                  <AttachmentLink
                    content="Comment"
                    onClick={() => handleAttachmentComment()}
                  />
                  <AttachmentLink
                    content="Delete"
                    onClick={() => handleDeleteAttachment()}
                  />
                  <AttachmentLink
                    content="Remove Cover"
                    onClick={() => handleRemoveCover()}
                  />
                </AttachmentCtaWrapper>
              </Container>
            </Item>
          ))}
        </Item.Group>
      </CardDetailSegment>
    )
  );
};

export default Attachments;
