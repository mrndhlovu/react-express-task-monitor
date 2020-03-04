import React, { useContext, useState } from "react";

import { AppContext } from "../../utils/contextUtils";
import { Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const CardHeader = styled.div`
  position: absolute;
  top: 6px;
  left: 10px;

  &:after {
    content: '${props => props.content}';
    font-weight: 700;
    letter-spacing: 0.9px;
    font-size: 16px;
    font-family: 'Noto Sans', sans-serif;
  }
`;

const StarWrapper = styled.div`
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 20px;
  height: 20px;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;

  &:after {
    z-index: 100;
    font-size: 20px !important;
  }
`;

const Wrapper = styled.div`
  padding-right: 7px;
  padding-bottom: 7px;
`;

const Card = styled.div`
  background-color: ${props => props.color};
  border-radius: 2px !important;
  height: 100px !important;
  width: ${props => (props.mobile ? "100%" : "200px")}!important;
  opacity: 5;
  cursor: pointer;
  position: relative;

  &:before {
    z-index: 0;
  }
`;

const Summary = ({
  color,
  handleBoardStarClick,
  header,
  history,
  id,
  starred
}) => {
  const { mobile } = useContext(AppContext).device;
  const [showStar, setShowStar] = useState(false);

  return (
    <Wrapper
      onMouseLeave={() => setShowStar(!showStar)}
      onMouseEnter={() => setShowStar(!showStar)}
      mobile={mobile}
    >
      <Card
        color={color}
        mobile={mobile}
        onClick={() => history.push(`/boards/id/${id}`)}
      >
        <CardHeader content={header} />

        <StarWrapper onClick={() => handleBoardStarClick(id)}>
          {(starred || showStar) && (
            <Icon
              id={id}
              name="star outline"
              color={starred ? "yellow" : "black"}
            />
          )}
        </StarWrapper>
      </Card>
    </Wrapper>
  );
};

export default withRouter(Summary);
