import React, { useContext, useState } from "react";

import { MainContext, HomepageContext } from "../../utils/contextUtils";
import { Icon, Label } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const CardHeader = styled.div`
  position: absolute;
  top: 6px;
  left: 10px;
  

  &:after {
    content: '${(props) => props.content}';
    font-weight: 700;
    letter-spacing: 0.9px;
    font-size: 16px;
    font-family: 'Noto Sans', sans-serif;
    color: white;
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin: 5px;
  min-height: 80px;
`;

const Card = styled.div`
  ${({ bgStyle }) =>
    bgStyle.image
      ? `background: url(${bgStyle.image})`
      : `background:${bgStyle.color}`};
  background-size: contain;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 2px !important;
  height: 100px !important;
  min-width: 100%;
  opacity: 5;
  cursor: pointer;
  position: relative;
`;

const Summary = ({ board, history, starred }) => {
  const { mobile } = useContext(MainContext).device;
  const [showStar, setShowStar] = useState(false);
  const { starBoardHandler } = useContext(HomepageContext);
  const { title, _id, styleProperties, isTemplate } = board;

  const handleCardClick = (e, star) => {
    e.target.id
      ? starBoardHandler(_id, star)
      : history.push(`/boards/id/${_id}`);
  };

  return (
    <Wrapper
      onMouseLeave={() => setShowStar(!showStar)}
      onMouseEnter={() => setShowStar(!showStar)}
      mobile={mobile}
    >
      <Card
        bgStyle={styleProperties}
        mobile={mobile}
        onClick={(e) => handleCardClick(e)}
      >
        {isTemplate && (
          <Label
            size="tiny"
            content="TEMPLATE"
            className="card-template-label"
          />
        )}
        <CardHeader content={title} />

        {(starred || showStar) && (
          <Icon
            onClick={(e) => handleCardClick(e, "star")}
            id={_id}
            name="star outline"
            className={starred ? "yellow-star" : "white-star star"}
          />
        )}
      </Card>
    </Wrapper>
  );
};

export default withRouter(Summary);
