import React, { useState } from "react";
import styled from "styled-components";

import { Dropdown } from "semantic-ui-react";
import EditableHeader from "../sharedComponents/EditableHeader";
import ListMenu from "./ListMenu";
import CopyListDialog from "./CopyListDialog";
import MoveListDialog from "./MoveListDialog";

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  padding-bottom: 10px;
`;

const StyledDiv = styled.div`
  cursor: pointer;
`;

const StyledDropdown = styled(Dropdown)`
  background-color: #ffffff3d !important;
`;

const ListHeader = ({ title, position, ...otherProps }) => {
  const [hideMoveListOption, setHideMoveListOption] = useState(true);
  const [hideCopyList, setHideCopyList] = useState(false);
  const [hideListMenu, setHideListMenu] = useState(true);

  return (
    <HeaderWrapper>
      <StyledDiv>
        <EditableHeader
          type="listHeader"
          title={title}
          listPosition={position}
        />
      </StyledDiv>

      <StyledDiv>
        <StyledDropdown
          icon="ellipsis horizontal"
          onClick={() => setHideListMenu(!hideListMenu)}
          floating
          button
          className="icon"
          size="tiny"
        >
          <Dropdown.Menu>
            <ListMenu
              listPosition={position}
              handleShowCopyListClick={() => setHideCopyList(!hideCopyList)}
              handleShowMoveListClick={() =>
                setHideMoveListOption(!hideMoveListOption)
              }
            />
          </Dropdown.Menu>
        </StyledDropdown>
      </StyledDiv>
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
