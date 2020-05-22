import React, { memo, useState, lazy, Suspense } from "react";
import styled from "styled-components";

import { Item, Button, Dropdown, Icon } from "semantic-ui-react";

import {
  getFormattedDate,
  stringsEqual,
  emptyFunction,
} from "../../utils/appUtils";

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
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
  activeCover,
  attachment,
  editAttachments,
  handleMakeCover,
  handleRemoveCover,
}) => {
  const [openDocument, setOpenDocument] = useState(null);
  const { filetype, name, uploadDate, url } = attachment;
  const isAnImage = ALLOWED_IMAGE_TYPES.includes(filetype);
  const isActiveCover =
    activeCover && isAnImage && stringsEqual(url, activeCover);

  const handleClick = (item) => setOpenDocument(item);

  return (
    <Item.Group divided>
      <Item>
        {isAnImage ? (
          <Item.Image
            className="attachment-thumbnail"
            size="tiny"
            src={url}
            onClick={() => handleClick(attachment)}
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
                  ? handleClick(attachment)
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
              <a
                className="attachment-link-text"
                rel="noopener noreferrer"
                target="_blank"
                href={`${url}`}
              >
                {name}
                <Icon
                  name="long arrow alternate right"
                  className="redirect-icon"
                />
              </a>
            ) : (
              <Item.Content
                verticalAlign="middle"
                className="attachment-link-text"
                onClick={() => handleClick(attachment)}
              >
                {name}
                <Icon
                  name="long arrow alternate right"
                  className="redirect-icon"
                />
              </Item.Content>
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
                    onClick={() => editAttachments(attachment, null, true)}
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
