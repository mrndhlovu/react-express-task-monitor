import React, { useState, Fragment } from "react";
import styled from "styled-components";

import { Dropdown, Icon } from "semantic-ui-react";

import { useMainContext } from "../../utils/hookUtils";
import NavButton from "../sharedComponents/NavButton";

const StyledDiv = styled.div`
  display: flex;
  padding-left: 3px;
`;

const StyledButton = styled(Dropdown)`
  background-color: #ffffff3d !important;
`;

const StyledSpan = styled.span`
  color: ${(props) => props.color};
  margin-right: 37px;
`;

const LeftNavButtons = ({ history }) => {
  const { isLoading, device, boards } = useMainContext();
  const [showBoardList, setShowBoardList] = useState(false);

  return (
    <StyledDiv>
      <NavButton iconName="home" redirect={() => history.push("/")} />

      <StyledButton
        text="Boards"
        icon={
          !device.mobile && <Icon name="target" className="nav-button-icon" />
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
            boards.map((board) => (
              <Fragment key={board._id}>
                <Dropdown.Item
                  onClick={() => history.push(`/boards/id/${board._id}`)}
                  image={
                    board.styleProperties.image && (
                      <img
                        className="nav-board-image"
                        src={board.styleProperties.image}
                      />
                    )
                  }
                  icon={
                    board.styleProperties.color && (
                      <StyledSpan color={board.styleProperties.color}>
                        <Icon size="big" name="window maximize" />
                      </StyledSpan>
                    )
                  }
                  text={board.title}
                />
              </Fragment>
            ))}
        </Dropdown.Menu>
      </StyledButton>

      {/* <SearchBar isLoading={isLoading} results={results} value={value} /> */}
    </StyledDiv>
  );
};

export default LeftNavButtons;
