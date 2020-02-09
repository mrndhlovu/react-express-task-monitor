import React, { useContext, Fragment } from "react";
import styled from "styled-components";

import NavButton from "../navBar/NavButton";
import { BoardContext } from "../../utils/contextUtils";
import { Dropdown, Button, Icon, List } from "semantic-ui-react";
import { visibilityOptions } from "../../constants/constants";

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

export default function LeftBoardButtons({ mobile, color, id }) {
  const { handleBoardStarClick, changeBoardVisibility, board } = useContext(
    BoardContext
  );
  const { visibility } = board;
  let activeOption;

  Object.keys(visibility).forEach((key, index) => {
    const active = visibilityOptions[index].option.toLowerCase();
    if (visibility[active]) return (activeOption = visibilityOptions[index]);
  });

  return (
    <StyledDiv mobile={mobile}>
      <NavButton
        iconName="star outline"
        color={color && "yellow"}
        redirect={() => handleBoardStarClick(id)}
      />
      <NavButton buttonText="Personal" forceText={true} />
      <StyledButton size="tiny">
        <Icon name={activeOption.icon} />
        <Dropdown icon={false} text={activeOption.option}>
          <Dropdown.Menu>
            {visibilityOptions.map((key, index) => (
              <Fragment key={key.option}>
                <Dropdown.Item
                  icon={
                    <Icon
                      name={key.icon}
                      size={
                        visibility[key.option.toLowerCase()] ? "large" : "small"
                      }
                      color={
                        visibility[key.option.toLowerCase()] ? "red" : "black"
                      }
                    />
                  }
                  text={key.option}
                  onClick={() =>
                    changeBoardVisibility(key.option.toLowerCase())
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
