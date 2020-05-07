import React, { useContext, Fragment, useState } from "react";
import styled from "styled-components";
import isEmail from "validator/lib/isEmail";

import { Dropdown, Button, Icon, List, Input } from "semantic-ui-react";

import { ACCESS_LEVELS } from "../../constants/constants";
import { BoardContext } from "../../utils/contextUtils";
import NavButton from "../sharedComponents/NavButton";
import UIContainer from "../sharedComponents/UIContainer";
import UIMessage from "../sharedComponents/UIMessage";

const StyledDiv = styled.div`
  justify-self: ${(props) => (props.mobile ? "center" : "end")};
  display: flex;
  flex-direction: ${(props) => props.mobile && "row"};
  align-items: ${(props) => props.mobile && "flex-start"};
`;

const StyledButton = styled(Button)`
  background-color: #ffffff3d !important;
`;

const StyledDropdownMenu = styled(Dropdown.Menu)`
  min-width: 180px !important;
`;

const StyledInput = styled(Input)`
  min-width: 185px !important;
`;

const StyledDescription = styled(List.Description)`
  font-size: 9px;
`;

export default function BoardHeaderButtons({ mobile, isStarred }) {
  const {
    board,
    changeBoardAccessLevel,
    handleBoardStarClick,
    handleInviteClick,
    handleShowMenuClick,
    inviteDone,
    loading,
  } = useContext(BoardContext);
  const { accessLevel } = board;
  let permission;

  const [inviteEmail, setInviteEmail] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => setInviteEmail(e.target.value);

  const validateEmail = (e) => {
    const validEmail = isEmail(inviteEmail);

    if (!validEmail) return setError("Email provided is invalid");
    handleInviteClick(inviteEmail);
  };

  Object.keys(accessLevel).forEach((key, index) => {
    const active = ACCESS_LEVELS[index].option.toLowerCase();
    if (accessLevel[active]) return (permission = ACCESS_LEVELS[index]);
  });

  return (
    <StyledDiv mobile={mobile}>
      <StyledButton size="tiny">
        {!mobile && <Icon name={permission.icon} />}
        <Dropdown icon={false} text={permission.option}>
          <StyledDropdownMenu>
            {ACCESS_LEVELS.map((key) => (
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

                <UIContainer>
                  <StyledDescription>{key.description}</StyledDescription>
                </UIContainer>
              </Fragment>
            ))}
          </StyledDropdownMenu>
        </Dropdown>
      </StyledButton>
      <NavButton
        iconName="star outline"
        buttonColor={isStarred ? "yellow" : "grey"}
        redirect={() => handleBoardStarClick()}
        buttonText="Star"
        forceText={true}
      />
      <StyledButton size="tiny">
        <Dropdown
          text="Invite"
          icon={false}
          closeOnChange={false}
          direction="left"
        >
          <StyledDropdownMenu>
            {error ? (
              <Dropdown.Header>
                <UIMessage
                  message={error}
                  error={true}
                  handleDismiss={() => setError(null)}
                />
              </Dropdown.Header>
            ) : (
              <Dropdown.Header content="Add an invite email" />
            )}

            <Dropdown.Divider />

            <StyledInput
              id="invite-input"
              onChange={(e) => handleChange(e)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => (e.key === "Enter" ? validateEmail() : null)}
              placeholder={
                inviteDone ? "Invite Sent" : "Add invite email and press Enter"
              }
              icon={inviteDone && <Icon name="check" color="green" />}
              loading={loading}
            />
          </StyledDropdownMenu>
        </Dropdown>
      </StyledButton>
      {!mobile && (
        <NavButton
          iconName={!mobile ? "ellipsis horizontal" : false}
          size="tiny"
          buttonText="Show Menu"
          redirect={() => handleShowMenuClick()}
          forceText={true}
          float="right"
        />
      )}
    </StyledDiv>
  );
}
