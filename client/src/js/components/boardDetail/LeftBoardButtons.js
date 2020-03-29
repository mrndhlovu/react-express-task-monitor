import React, { useContext, Fragment, useState } from "react";
import styled from "styled-components";

import NavButton from "../sharedComponents/NavButton";
import { BoardContext } from "../../utils/contextUtils";
import { Dropdown, Button, Icon, List, Input } from "semantic-ui-react";
import { ACCESS_LEVELS } from "../../constants/constants";
import MessageAlert from "../sharedComponents/MessageAlert";
import { isEmail } from "validator";

const StyledDiv = styled.div`
  justify-self: start;
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

const StyledTextArea = styled(Input)`
  min-width: 250px;
`;

const StyledDropdownMenu = styled(Dropdown.Menu)`
  padding: 0 10px 10px 10px !important;
`;

export default function LeftBoardButtons({ mobile, isStarred }) {
  const {
    board,
    changeBoardAccessLevel,
    handleBoardStarClick,
    handleInviteClick,
    loading
  } = useContext(BoardContext);
  const { accessLevel } = board;
  let permission;

  const [inviteEmail, setInviteEmail] = useState("");
  const [error, setError] = useState(null);

  const handleChange = e => setInviteEmail(e.target.value);

  const validateEmail = e => {
    const validEmail = isEmail(inviteEmail);
    console.log("validEmail: ", validEmail);

    if (!validEmail) return setError("Email provided is invalid");
    handleInviteClick(inviteEmail);
  };

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
      <StyledButton size="tiny">
        <Dropdown text="Invite" icon={false} closeOnChange={false}>
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
                onChange={e => handleChange(e)}
                onClick={e => e.stopPropagation()}
                onKeyDown={e => (e.key === "Enter" ? validateEmail() : null)}
                placeholder="Add invite email and press Enter"
                loading={loading}
              />
            </Description>
          </StyledDropdownMenu>
        </Dropdown>
      </StyledButton>
    </StyledDiv>
  );
}
