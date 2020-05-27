import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";

import { AUTH_EP } from "../../utils/urls";

const StyledSegment = styled.div`
border: 1px solid grey;
box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0px ;
cursor: pointer;
margin-bottom: 10px; 
min-height: 30px;
padding: 10px;
text-align : center;
width: 100%;
&:after{
    content: '${(props) => props.content}'
}
`;

const SocialAuthButton = ({ icon, buttonText, hrefTo, color, size }) => {
  const handleClick = () => (window.location = `${AUTH_EP}/${hrefTo}`);

  return (
    <StyledSegment content={buttonText} onClick={() => handleClick()}>
      <Icon name={icon} color={color} size={size} />
    </StyledSegment>
  );
};

export default SocialAuthButton;
