import React, { memo } from "react";
import styled from "styled-components";

import { deleteAttachmentText } from "../../constants/constants";
import { Item, Button, Dropdown } from "semantic-ui-react";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import { getFormattedDate } from "../../utils/appUtils";
import UIContainer from "../sharedComponents/UIContainer";

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
  transition-duration: 400ms;
  transition-property: color;
  &:hover {
  color: #000  
  }

  &:after{
  content:'${(props) => props.content}';
  padding: 0 5px;
  font-size: 11px
  }
`;

const StyledDropdownMenu = styled(Dropdown.Menu)`
  padding: 10px 5px !important;
  max-width: 200px !important;
`;

const display = {
  backgroundColor: "#e2dfe4 !important",
  height: "80px",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Attachments = ({
  activeCover,
  activeCard,
  handleAttachmentComment,
  handleDeleteAttachment,
  handleRemoveCover,
  handleMakeCover,
  isLoading,
}) => {
  const { images } = activeCard.attachments;
  const hasAttachments = images.length > 0;

  return isLoading ? (
    <UIContainer display={display}>Loading...</UIContainer>
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
                    Added {getFormattedDate(image.uploadDate, "LL")}
                  </DateWrapper>
                </AttachmentName>

                <AttachmentCtaWrapper>
                  <AttachmentLink
                    content="Comment"
                    onClick={() => handleAttachmentComment()}
                  />
                  <AttachmentLink>
                    <Dropdown as="small" text="Delete" multiple icon={false}>
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

                  <AttachmentLink>
                    <Dropdown
                      as="small"
                      text={
                        image.imgUrl === activeCover
                          ? "Remove Cover"
                          : "Make Cover"
                      }
                      multiple
                      icon={false}
                    >
                      <StyledDropdownMenu>
                        <Button
                          content={
                            image.imgUrl === activeCover
                              ? "Remove Cover"
                              : "Make Cover"
                          }
                          color="red"
                          fluid
                          icon=""
                          size="tiny"
                          onClick={() =>
                            image.imgUrl === activeCover
                              ? handleRemoveCover()
                              : handleMakeCover(image.imgUrl)
                          }
                        />
                      </StyledDropdownMenu>
                    </Dropdown>
                  </AttachmentLink>
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
