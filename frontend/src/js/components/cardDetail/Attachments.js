import React, { memo } from "react";

import { Paperclip } from "react-feather";

import { stringsEqual } from "../../utils/appUtils";
import { useCardDetailContext } from "../../utils/hookUtils";
import AddAttachment from "./AddAttachment";
import CardDetailHeader from "../shared/CardDetailHeader";
import CardDetailSegment from "../shared/CardDetailSegment";
import SingleAttachment from "./SingleAttachment";
import UIWrapper from "../shared/UIWrapper";

const Attachments = () => {
  const { card, hasAttachments, isLoading } = useCardDetailContext();

  return (
    <>
      <CardDetailHeader description="Attachments" icon={() => <Paperclip />} />
      <CardDetailSegment>
        {hasAttachments &&
          card.attachments.map((attachment, index) => (
            <SingleAttachment
              attachment={attachment}
              key={index}
              attachmentIndex={index}
            />
          ))}
        {stringsEqual(isLoading, "attachment") && (
          <UIWrapper className="loading-attachment-placeholder">
            Loading...
          </UIWrapper>
        )}
        {hasAttachments && (
          <AddAttachment
            buttonText="Add an attachment"
            direction="right"
            fluid={false}
            icon=""
            labeled={false}
          />
        )}
      </CardDetailSegment>
    </>
  );
};

export default memo(Attachments);
