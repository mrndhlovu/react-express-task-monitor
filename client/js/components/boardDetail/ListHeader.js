import React, { useState } from "react";
import styled from "styled-components";

import { Dropdown } from "semantic-ui-react";

import CopyListDialog from "./CopyListDialog";
import EditableHeader from "../sharedComponents/EditableHeader";
import ListMenu from "./ListMenu";
import MoveListDialog from "./MoveListDialog";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 5px;
  justify-content: space-between;
`;

const StyledDropdown = styled(Dropdown)`
  background-color: transparent !important;
  font-size: 12px !important;
  font-weight: 100 !important;
`;

const ListHeader = ({ title, position, mobile, ...otherProps }) => {
  const [hideMoveListOption, setHideMoveListOption] = useState(true);
  const [hideCopyList, setHideCopyList] = useState(false);
  const [hideListMenu, setHideListMenu] = useState(true);

  return (
    <HeaderWrapper>
      <EditableHeader type="listHeader" title={title} listPosition={position} />

      <StyledDropdown
        icon="ellipsis horizontal"
        onClick={() => setHideListMenu(!hideListMenu)}
        floating
        button
        className="icon"
        direction={mobile ? "left" : "right"}
        size="tiny"
      >
        <Dropdown.Menu>
          <Dropdown.Header content="List actions" as="h3" />
          <ListMenu
            listPosition={position}
            handleShowCopyListClick={() => setHideCopyList(!hideCopyList)}
            handleShowMoveListClick={() =>
              setHideMoveListOption(!hideMoveListOption)
            }
          />
        </Dropdown.Menu>
      </StyledDropdown>

      {hideCopyList && (
        <CopyListDialog
          title={title}
          close={() => setHideCopyList(!hideCopyList)}
          listPosition={position}
          {...otherProps}
        />
      )}

      {!hideMoveListOption && (
        <MoveListDialog
          title={title}
          close={() => setHideMoveListOption(!hideMoveListOption)}
          listPosition={position}
          {...otherProps}
        />
      )}
    </HeaderWrapper>
  );
};

export default ListHeader;
