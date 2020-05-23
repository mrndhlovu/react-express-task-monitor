import React, { useContext, Fragment } from "react";
import styled from "styled-components";

import { Header, Icon } from "semantic-ui-react";

import { HomepageContext, MainContext } from "../../utils/contextUtils";
import CreateNewBoard from "../sharedComponents/CreateNewBoard";
import Summary from "./Summary";

const Category = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    ${(props) => (props.mobile ? "100%" : props.tablet ? "100%" : "21.5%")}
  );
  vertical-align: top;
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
  isLast,
  showNewBoardModal,
  starred,
  viewedRecent,
}) => {
  const { tablet, loading, device } = useContext(MainContext);
  const { boards, user } = useContext(HomepageContext);

  return (
    <Fragment>
      <Span text={header}>
        <Icon name={`outline ${icon}`} />
      </Span>
      <Category mobile={device.mobile} tablet={tablet} isLast={isLast}>
        {!loading &&
          boards.map(
            (board) =>
              ((user.starred.includes(board._id) && starred) ||
                (user.viewedRecent.includes(board._id) && viewedRecent) ||
                isDefault) && (
                <Summary
                  key={board._id}
                  starred={user.starred.includes(board._id)}
                  board={board}
                />
              )
          )}
        {isDefault && <CreateNewBoard showNewBoardModal={showNewBoardModal} />}
      </Category>
    </Fragment>
  );
};

export default BoardCategory;
