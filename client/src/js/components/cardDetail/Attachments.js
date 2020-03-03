import React, { memo } from "react";
import styled from "styled-components";
import moment from "moment";

import { Item, Button, Dropdown } from "semantic-ui-react";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import { deleteAttachmentText } from "../../constants/constants";

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

const StyledDropdownMenu = styled(Dropdown.Menu)`
  padding: 0 10px 10px 10px !important;
`;

const Attachments = ({
  activeCover,
  card,
  handleAttachmentComment,
  handleDeleteAttachment,
  handleRemoveCover,
  handleMakeCover,
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
          {images.reverse().map((image, index) => (
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
                  <AttachmentLink>
                    <Dropdown text="Delete" multiple icon={false}>
                      <StyledDropdownMenu>
                        <Dropdown.Header content={deleteAttachmentText} />
                        <Button
                          content="Delete Attachment?"
                          color="red"
                          fluid
                          icon=""
                          size="tiny"
                          onClick={() => handleDeleteAttachment(image.imgUrl)}
                        />
                      </StyledDropdownMenu>
                    </Dropdown>
                  </AttachmentLink>

                  <AttachmentLink
                    content={
                      image.imgUrl === activeCover
                        ? "Remove Cover"
                        : "Make Cover"
                    }
                    onClick={() =>
                      image.imgUrl === activeCover
                        ? handleRemoveCover()
                        : handleMakeCover(image.imgUrl)
                    }
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

export default memo(Attachments);
