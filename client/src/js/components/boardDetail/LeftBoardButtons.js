import React, { useContext, Fragment } from "react";
import styled from "styled-components";

import NavButton from "../sharedComponents/NavButton";
import { BoardContext } from "../../utils/contextUtils";
import { Dropdown, Button, Icon, List } from "semantic-ui-react";
import { ACCESS_LEVELS } from "../../constants/constants";

const StyledDiv = styled.div`
  justify-self: ${props => (props.mobile ? "center" : "start")};
  padding-bottom: 5px;
`;

const StyledButton = styled(Button)`
  background-color: #ffffff3d !important;
`;

const Description = styled.div`
  display: grid;
  justify-items: start;
  align-items: center;
  padding: 10px 15px;
`;

export default function LeftBoardButtons({ mobile, isStarred }) {
  const { handleBoardStarClick, changeBoardAccessLevel, board } = useContext(
    BoardContext
  );
  const { accessLevel } = board;
  let permission;

  Object.keys(accessLevel).forEach((key, index) => {
    const active = ACCESS_LEVELS[index].option.toLowerCase();
    if (accessLevel[active]) return (permission = ACCESS_LEVELS[index]);
  });

  return (
    <StyledDiv mobile={mobile}>
      <NavButton
        iconName="star outline"
        buttonColor={isStarred ? "yellow" : "grey"}
        redirect={() => handleBoardStarClick()}
      />
      <NavButton buttonText="Personal" forceText={true} />

      <StyledButton size="tiny">
        <Icon name={permission.icon} />
        <Dropdown icon={false} text={permission.option}>
          <Dropdown.Menu>
            {ACCESS_LEVELS.map(key => (
              <Fragment key={key.option}>
                <Dropdown.Item
                  icon={
                    <Icon
                      name={key.icon}
                      size={
                        accessLevel[key.option.toLowerCase()]
                          ? "large"
                          : "small"
                      }
                      color={
                        accessLevel[key.option.toLowerCase()] ? "red" : "black"
                      }
                    />
                  }
                  text={key.option}
                  onClick={() =>
                    changeBoardAccessLevel(key.option.toLowerCase())
                  }
                />

                <Description>
                  <List.Description>{key.description}</List.Description>
                </Description>
              </Fragment>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </StyledButton>
      <NavButton buttonText="Invite" forceText={true} />
    </StyledDiv>
  );
}
