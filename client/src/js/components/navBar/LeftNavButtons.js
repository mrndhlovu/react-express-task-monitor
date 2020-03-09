import React, { useState, Fragment, useContext } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import NavButton from "../sharedComponents/NavButton";
import SearchBar from "./SearchBar";
import { Divider, Dropdown, Icon } from "semantic-ui-react";
import { AppContext } from "../../utils/contextUtils";

const StyledDiv = styled.div`
  display: flex;
  padding-left: 3px;
`;

const StyledButton = styled(Dropdown)`
  background-color: #ffffff3d !important;
`;

const StyledSpan = styled.span`
  color: ${props => props.color};
`;

const LeftNavButtons = ({ history, results, value }) => {
  const [showBoardList, setShowBoardList] = useState(false);
  const { isLoading, device, boards } = useContext(AppContext);

  return (
    <StyledDiv>
      <NavButton iconName="home" redirect={() => history.push("/")} />

      <StyledButton
        text="Boards"
        icon={
          !device.mobile && <Icon name="trello" className="nav-button-icon" />
        }
        labeled={!device.mobile}
        button
        loading={isLoading}
        className="icon nav-button-text"
        size="tiny"
        onClick={() => setShowBoardList(!showBoardList)}
      >
        <Dropdown.Menu>
          {boards &&
            boards.map(board => (
              <Fragment key={board._id}>
                <Dropdown.Item
                  onClick={() => history.push(`/boards/id/${board._id}`)}
                  icon={
                    <StyledSpan color={board.styleProperties.color}>
                      <Icon name="columns" />
                    </StyledSpan>
                  }
                  text={board.title}
                />
                <Divider />
              </Fragment>
            ))}
        </Dropdown.Menu>
      </StyledButton>

      <SearchBar isLoading={isLoading} results={results} value={value} />
    </StyledDiv>
  );
};

export default withRouter(LeftNavButtons);
