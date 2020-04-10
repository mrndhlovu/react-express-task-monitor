import React, { useState } from "react";

import { Button, Divider } from "semantic-ui-react";

import AddCoverImage from "./AddCoverImage";
import DropdownButton from "../sharedComponents/DropdownButton";
import UIMessage from "../sharedComponents/UIMessage";
import UIWrapper from "../sharedComponents/UIWrapper";

const AddCover = ({
  color,
  buttonSize,
  hasCover,
  handleRemoveCover,
  upward = true,
  ...props
}) => {
  const [addCover, setAddCover] = useState(false);

  const handleClose = () => setAddCover(false);

  return (
    <DropdownButton
      icon="image"
      buttonText="Cover"
      header="Cover"
      callback={() => handleClose()}
      color={color}
      size={buttonSize}
      upward={upward}
    >
      {!hasCover && !addCover ? (
        <>
          <UIMessage fontSize="11px" margin="10px 10px">
            Seems you don't have card covers. Lets add one now!
          </UIMessage>
          <UIWrapper padding="5">
            <Button
              content="Add cover"
              positive
              fluid
              size="tiny"
              onClick={() => setAddCover(true)}
            />
          </UIWrapper>
        </>
      ) : (
        <UIWrapper>
          <AddCoverImage hasCover={hasCover} {...props} />

          {hasCover && (
            <>
              <Divider />
              <Button
                content="Remove Cover"
                fluid
                compact
                onClick={() => handleRemoveCover()}
              />
            </>
          )}
        </UIWrapper>
      )}
    </DropdownButton>
  );
};

export default AddCover;
