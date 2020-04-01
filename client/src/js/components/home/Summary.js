import React, { useContext, useState } from "react";

import { MainContext, HomepageContext } from "../../utils/contextUtils";
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

  header,
  history,
  id,
  starred
}) => {
  const { mobile } = useContext(MainContext).device;
  const [showStar, setShowStar] = useState(false);
  const { handleBoardStarClick } = useContext(HomepageContext);

  const handleCardClick = (e, star) =>
    e.target.id
      ? handleBoardStarClick(id, star)
      : history.push(`/boards/id/${id}`);

  return (
    <Wrapper
      onMouseLeave={() => setShowStar(!showStar)}
      onMouseEnter={() => setShowStar(!showStar)}
      mobile={mobile}
    >
      <Card color={color} mobile={mobile} onClick={e => handleCardClick(e)}>
        <CardHeader content={header} />

        <StarWrapper onClick={e => handleCardClick(e, "star")}>
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
