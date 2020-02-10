import React, { useContext, useState } from "react";

import { Icon, Header } from "semantic-ui-react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { DimensionContext } from "../../utils/contextUtils";

const StyledCard = styled.div`
  min-height: 40px;
`;

const HeaderWrapper = styled.div`
  padding: 13px 0 0 13px;
`;

const StarWrapper = styled.div`
  display: grid;
  justify-items: end;
  margin-right: 10px;
  position: relative;
`;

const Wrapper = styled.div`
  padding-right: 10px;
  padding-bottom: 10px;
`;

const Card = styled.div`
  background-color: ${props => props.color};
  border-radius: 5px;
  height: 111px;
  opacity: 5;
  cursor: pointer;
`;

const Summary = ({
  header,
  id,
  history,
  handleBoardStarClick,
  starred,
  color,
  starRef,
  starredRef
}) => {
  const { mobile } = useContext(DimensionContext).device;
  const [showStar, setShowStar] = useState(false);

  return (
    <Wrapper
      onMouseLeave={() => setShowStar(!showStar)}
      onMouseEnter={() => setShowStar(!showStar)}
    >
      <Card color={color} mobile={mobile}>
        <HeaderWrapper onClick={() => history.push(`/boards/id/${id}`)}>
          <Header as="h5" content={header} />
          <StyledCard />
        </HeaderWrapper>
        <StarWrapper>
          {(starred || showStar) && (
            <Icon
              id={id}
              name="star outline"
              onClick={() => handleBoardStarClick()}
              color={starred ? "yellow" : "black"}
              ref={showStar ? starRef : starredRef}
            />
          )}
        </StarWrapper>
      </Card>
    </Wrapper>
  );
};

export default withRouter(Summary);
