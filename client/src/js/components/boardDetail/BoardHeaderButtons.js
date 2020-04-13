import React, { useContext, Fragment, useState } from "react";
import styled from "styled-components";
import { isEmail } from "validator";

import { ACCESS_LEVELS } from "../../constants/constants";
import { BoardContext } from "../../utils/contextUtils";
import { Dropdown, Button, Icon, List, Input } from "semantic-ui-react";
import MessageAlert from "../sharedComponents/MessageAlert";
import NavButton from "../sharedComponents/NavButton";

const StyledDiv = styled.div`
  justify-self: ${(props) => (props.mobile ? "center" : "end")};
  padding: 2px;
  display: flex;
  flex-direction: ${(props) => props.mobile && "column"};
  align-items: ${(props) => props.mobile && "flex-start"};
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

const StyledTextArea = styled(Input)`
  min-width: 200px;
`;

const StyledDropdownMenu = styled(Dropdown.Menu)`
  width: 200px !important;
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
        <Icon name={permission.icon} />
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

                <Description>
                  <List.Description>{key.description}</List.Description>
                </Description>
              </Fragment>
            ))}
          </StyledDropdownMenu>
        </Dropdown>
      </StyledButton>
      <NavButton
        iconName="star outline"
        buttonColor={isStarred ? "yellow" : "grey"}
        redirect={() => handleBoardStarClick()}
      />
      <StyledButton size="tiny">
        <Dropdown
          text="Invite"
          icon={<Icon name="mail" />}
          closeOnChange={false}
          direction={mobile ? "right" : "left"}
        >
          <StyledDropdownMenu>
            {error ? (
              <Dropdown.Header>
                <MessageAlert
                  message={error}
                  open={true}
                  close={() => setError(null)}
                />
              </Dropdown.Header>
            ) : (
              <Dropdown.Header content="Add an invite email" />
            )}

            <Dropdown.Divider />
            <Description>
              <StyledTextArea
                id="invite-input"
                onChange={(e) => handleChange(e)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === "Enter" ? validateEmail() : null)}
                placeholder={
                  inviteDone ? "Done" : "Add invite email and press Enter"
                }
                icon={inviteDone && <Icon name="check" color="green" />}
                loading={loading}
              />
            </Description>
          </StyledDropdownMenu>
        </Dropdown>
      </StyledButton>
      <NavButton
        iconName={!mobile ? "ellipsis horizontal" : false}
        size="tiny"
        buttonText="Show Menu"
        redirect={() => handleShowMenuClick()}
        forceText={true}
        float="right"
      />
    </StyledDiv>
  );
}
