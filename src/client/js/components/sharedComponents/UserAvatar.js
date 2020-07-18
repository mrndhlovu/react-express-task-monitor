import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Span = styled.span`
  font-weight: 700;
  text-align: center;
  font-size: ${(props) => props.fontSize};
`;

const StyledButton = styled.div`
  align-items: center;
  background-color: #dce3eb;
  border-radius: 50px;
  display: flex;
  justify-content: space-evenly;

  max-height: 20px;
  max-width: 18px;
  padding: ${(props) => props.padding};
`;

const UserAvatar = ({
  userInitials = "M",
  padding = "18px",
  fontSize,
  className,
}) => (
  <StyledButton className={className} padding={padding}>
    <Span fontSize={fontSize}>{userInitials}</Span>
  </StyledButton>
);

UserAvatar.propTypes = {
  className: PropTypes.string,
  fontSize: PropTypes.string,
  padding: PropTypes.string,
  userInitials: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UserAvatar;
