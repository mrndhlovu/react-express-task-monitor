import React, { memo, useState, lazy, Suspense } from "react";
import styled from "styled-components";

import { Item, Button, Dropdown, Icon } from "semantic-ui-react";

import {
  getFormattedDate,
  stringsEqual,
  emptyFunction,
} from "../../utils/appUtils";

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import EditableHeader from "../sharedComponents/EditableHeader";
import { ALLOWED_IMAGE_TYPES } from "../../constants/constants";

const DocumentModal = lazy(() => import("./DocumentModal"));

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
  color: #000;
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

const Attachments = ({
  attachment,
  editAttachments,
  handleMakeCover,
  handleRemoveCover,
  attachmentIndex,
  activeCard,
  updatedChanges,
  ...rest
}) => {
  const [openDocument, setOpenDocument] = useState(null);
  const [attachmentItem, setAttachmentItem] = useState(attachment);

  const { filetype, name, uploadDate, url } = attachmentItem;
  const isAnImage = ALLOWED_IMAGE_TYPES.includes(filetype);
  const isActiveCover =
    activeCard.cardCover &&
    isAnImage &&
    stringsEqual(url, activeCard.cardCover);

  const handleClick = (item) => setOpenDocument(item);

  const handleEditAttachmentName = (editedAttachment) => {
    setAttachmentItem(editedAttachment);
    activeCard.attachments.splice(attachmentIndex, 1, editedAttachment);
    updatedChanges(activeCard);
  };

  return (
    <Item.Group divided>
      <Item>
        {isAnImage ? (
          <Item.Image
            className="attachment-thumbnail"
            size="tiny"
            src={url}
            onClick={() => handleClick(attachmentItem)}
          />
        ) : (
          <div className="attachment-thumbnail-wrap">
            <a
              className="attachment-link"
              rel="noopener noreferrer"
              href={stringsEqual(filetype, "url") ? url : ""}
              target={stringsEqual(filetype, "url") ? "_blank" : ""}
              onClick={() =>
                !stringsEqual(filetype, "url")
                  ? handleClick(attachmentItem)
                  : emptyFunction()
              }
            >
              <span className="attachment-link-span">
                {stringsEqual(filetype, "url") ? "LINK" : filetype}
              </span>
            </a>
          </div>
        )}

        <Container>
          <AttachmentName>
            {stringsEqual(filetype, "url") ? (
              <>
                <EditableHeader
                  title={name}
                  type="imageTitle"
                  handleEditAttachmentName={handleEditAttachmentName}
                  {...rest}
                  attachment={attachmentItem}
                />
                <a
                  className="attachment-link-text"
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`${url}`}
                >
                  <Icon
                    name="long arrow alternate right"
                    className="redirect-icon"
                  />
                </a>
              </>
            ) : (
              <>
                <EditableHeader
                  title={name}
                  type="imageTitle"
                  handleEditAttachmentName={handleEditAttachmentName}
                  {...rest}
                  attachment={attachmentItem}
                />
                <Item.Content
                  verticalAlign="middle"
                  className="attachment-link-text"
                  onClick={() => handleClick(attachmentItem)}
                >
                  <Icon
                    name="long arrow alternate right"
                    className="redirect-icon"
                  />
                </Item.Content>
              </>
            )}

            <DateWrapper>
              Added {getFormattedDate(uploadDate, "LL")}
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
                    onClick={() => editAttachments(attachmentItem, null, true)}
                  />
                </StyledDropdownMenu>
              </Dropdown>
            </AttachmentLink>

            {isAnImage && (
              <AttachmentLink>
                <Dropdown
                  as="small"
                  text={isActiveCover ? "Remove Cover" : "Make Cover"}
                  multiple
                  icon={false}
                >
                  <StyledDropdownMenu>
                    <Dropdown.Header
                      content={isActiveCover ? "Remove Cover?" : "Make Cover?"}
                    />
                    <Button
                      content={
                        isActiveCover ? "Yes remove cover!" : "Yes make cover!"
                      }
                      color="red"
                      fluid
                      icon=""
                      size="tiny"
                      onClick={() =>
                        isActiveCover
                          ? handleRemoveCover(url)
                          : handleMakeCover(url)
                      }
                    />
                  </StyledDropdownMenu>
                </Dropdown>
              </AttachmentLink>
            )}
          </AttachmentCtaWrapper>
        </Container>
      </Item>

      {openDocument && (
        <Suspense fallback={<UILoadingSpinner />}>
          <DocumentModal
            handleMakeCover={handleMakeCover}
            editAttachments={editAttachments}
            file={openDocument}
            setOpenDocument={setOpenDocument}
          />
        </Suspense>
      )}
    </Item.Group>
  );
};

export default memo(Attachments);
