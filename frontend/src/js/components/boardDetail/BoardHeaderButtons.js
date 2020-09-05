import React, { Fragment, useState } from "react";
import styled from "styled-components";
import isEmail from "validator/lib/isEmail";
import PropTypes from "prop-types";

import { Dropdown, Button, Icon, List } from "semantic-ui-react";

import { ACCESS_LEVELS } from "../../constants/constants";
import {
  useBoardContext,
  useMainContext,
  useAuth,
} from "../../utils/hookUtils";
import NavButton from "../shared/NavButton";
import UIContainer from "../shared/UIContainer";
import UIFormInput from "../shared/UIFormInput";
import UIMessage from "../shared/UIMessage";
import UIWrapper from "../shared/UIWrapper";
import { Check } from "react-feather";

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

const StyledDescription = styled(List.Description)`
  font-size: 9px;
  color: #000;
`;

const BoardHeaderButtons = ({ isBoardMenu }) => {
  const {
    board,
    changeBoardAccessLevel,
    starBoardHandler,
    handleInviteClick,
    handleShowMenuClick,
    inviteDone,
  } = useBoardContext();
  const { mobile } = useMainContext().device;
  const { user } = useAuth();
  const { accessLevel } = board;

  const isStarred = user.starred.includes(board._id);
  let permission;

  const [inviteEmail, setInviteEmail] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => setInviteEmail(e.target.value);

  const validateEmail = () => {
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
      {!isBoardMenu && (
        <>
          <StyledButton className="board-header-button" size="tiny">
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
                            accessLevel[key.option.toLowerCase()]
                              ? "red"
                              : "black"
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
            redirect={() => starBoardHandler()}
            forceText={true}
          />
          <StyledButton size="tiny">
            <Dropdown
              text="Invite"
              icon={false}
              closeOnChange={false}
              direction="left"
              className="board-header-button"
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

                <UIWrapper className="user-invite-wrap">
                  <UIFormInput
                    input
                    id="invite-input"
                    onChange={(e) => handleChange(e)}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) =>
                      e.key === "Enter" ? validateEmail() : null
                    }
                    placeholder={
                      inviteDone
                        ? "Invite Sent"
                        : "Add invite email and press Enter"
                    }
                    icon={() => (inviteDone ? <Check /> : null)}
                  />
                </UIWrapper>
              </StyledDropdownMenu>
            </Dropdown>
          </StyledButton>
        </>
      )}

      <NavButton
        className="board-header-button"
        iconName={!mobile ? "ellipsis horizontal" : false}
        size="tiny"
        buttonText="Show Menu"
        redirect={() => handleShowMenuClick()}
        forceText={true}
        float="right"
      />
    </StyledDiv>
  );
};

BoardHeaderButtons.propTypes = {
  isBoardMenu: PropTypes.bool,
};

export default BoardHeaderButtons;
