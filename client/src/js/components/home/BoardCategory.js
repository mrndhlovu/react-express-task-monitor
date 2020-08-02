import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Header, Icon } from "semantic-ui-react";

import CreateNewBoard from "../sharedComponents/CreateNewBoard";
import Summary from "./Summary";
import { useAuth, useMainContext } from "../../utils/hookUtils";

const Category = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    ${(props) => (props.mobile ? "100%" : props.tablet ? "100%" : "23.5%")}
  );
  vertical-align: top;
  transform: translate(0);
`;

const Span = styled(Header)`
  font-size: 14px !important;
  font-weight: 700 !important;
  padding: 0 5px !important;
  &:after {
    content: '${(props) => props.text}';
  }

`;

const BoardCategory = ({
  header,
  icon,
  isDefault,
  isLast = false,
  openCreateBoardModalHandler,
  boards,
}) => {
  const { tablet, loading, device } = useMainContext();

  const { user } = useAuth();

  return (
    <Fragment>
      <Span text={header}>
        <Icon name={`outline ${icon}`} />
      </Span>
      <Category mobile={device.mobile} tablet={tablet} isLast={isLast}>
        {!loading &&
          boards.map((board) => (
            <Summary
              key={board._id}
              starred={user.starred.includes(board._id)}
              board={board}
            />
          ))}

        {isDefault && (
          <CreateNewBoard
            openCreateBoardModalHandler={openCreateBoardModalHandler}
          />
        )}
      </Category>
    </Fragment>
  );
};

BoardCategory.defaultProps = {
  isLast: false,
  isDefault: false,
  openCreateBoardModalHandler: () => {},
};

BoardCategory.propTypes = {
  openCreateBoardModalHandler: PropTypes.func.isRequired,
  isDefault: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
};

export default BoardCategory;
