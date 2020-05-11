import React, { memo } from "react";
import styled from "styled-components";

import { Item, Button, Dropdown, Icon } from "semantic-ui-react";

import { getFormattedDate } from "../../utils/appUtils";
import UIContainer from "../sharedComponents/UIContainer";

const Container = styled.div``;

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
  handleRemoveCover,
  handleMakeCover,
  attachment,
  isLoading,
  editAttachments,
  type,
}) => {
  const hasAttachment = attachment.length > 0;

  return isLoading ? (
    <UIContainer display={display}>Loading...</UIContainer>
  ) : (
    hasAttachment && (
      <Item.Group divided>
        {attachment.map((item, index) => (
          <Item key={index}>
            {type === "image" ? (
              <Item.Image
                className="attachment-thumbnail"
                size="tiny"
                src={item.imgUrl}
              />
            ) : (
              <div className="attachment-thumbnail-wrap">
                <a
                  className="attachment-link"
                  rel="noopener noreferrer"
                  target="_blank"
                  href={item.name}
                >
                  <span className="attachment-link-span">LINK</span>
                </a>
              </div>
            )}

            <Container>
              <AttachmentName>
                <Item.Content verticalAlign="middle">
                  {type === "image" ? (
                    item.name
                  ) : (
                    <a
                      className="attachment-link-text"
                      rel="noopener noreferrer"
                      target="_blank"
                      href={item.name}
                    >
                      {item.name}
                      <Icon
                        name="long arrow alternate right"
                        className="redirect-icon"
                      />
                    </a>
                  )}
                </Item.Content>
                <DateWrapper>
                  Added {getFormattedDate(item.uploadDate, "LL")}
                </DateWrapper>
              </AttachmentName>

              <AttachmentCtaWrapper>
                <AttachmentLink>
                  <Dropdown as="small" text="Delete" multiple icon={false}>
                    <StyledDropdownMenu>
                      <Dropdown.Header content="Delete Attachment?" />
                      <Button
                        content="Yes delete attachment!"
                        color="red"
                        fluid
                        icon=""
                        size="tiny"
                        onClick={() => editAttachments(item, type, null, true)}
                      />
                    </StyledDropdownMenu>
                  </Dropdown>
                </AttachmentLink>

                {type === "image" && (
                  <AttachmentLink>
                    <Dropdown
                      as="small"
                      text={
                        item.imgUrl === activeCover
                          ? "Remove Cover"
                          : "Make Cover"
                      }
                      multiple
                      icon={false}
                    >
                      <StyledDropdownMenu>
                        <Dropdown.Header
                          content={
                            item.imgUrl === activeCover
                              ? "Remove Cover?"
                              : "Make Cover?"
                          }
                        />
                        <Button
                          content={
                            item.imgUrl === activeCover
                              ? "Yes remove cover!"
                              : "Yes make cover!"
                          }
                          color="red"
                          fluid
                          icon=""
                          size="tiny"
                          onClick={() =>
                            item.imgUrl === activeCover
                              ? handleRemoveCover(item.imgUrl)
                              : handleMakeCover(item.imgUrl)
                          }
                        />
                      </StyledDropdownMenu>
                    </Dropdown>
                  </AttachmentLink>
                )}
              </AttachmentCtaWrapper>
            </Container>
          </Item>
        ))}
      </Item.Group>
    )
  );
};

export default memo(Attachments);
