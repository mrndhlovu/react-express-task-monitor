import React from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";

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
    content: '${props => props.content}'
}
`;

const OtherSignupOptionButton = ({ icon, buttonText }) => {
  return (
    <StyledSegment content={buttonText}>
      <Icon name={icon} />
    </StyledSegment>
  );
};

export default OtherSignupOptionButton;
