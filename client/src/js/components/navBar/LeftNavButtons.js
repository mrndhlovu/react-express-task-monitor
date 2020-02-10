import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";

import NavButton from "../sharedComponents/NavButton";
import SearchBar from "./SearchBar";
import { Divider, Dropdown, Icon } from "semantic-ui-react";
import { useFetch } from "../../utils/hookUtils";

const StyledDiv = styled.div`
  display: flex;
  padding-left: 3px;
`;

const StyledButton = styled(Dropdown)`
  background-color: #ffffff3d !important;
`;

const StyledSpan = styled.span`
  color: ${props => props.color};
`;

const LeftNavButtons = ({ history, isLoading, results, value }) => {
  const [showBoardList, setShowBoardList] = useState(false);
  const [data, loading] = useFetch();
  const [boards, setBoards] = useState({});

  useEffect(() => {
    setBoards(data);
  }, [data]);

  return (
    <StyledDiv>
      <NavButton iconName="home" redirect={() => history.push("/")} />

      <StyledButton
        text="Boards"
        icon="columns"
        floating
        labeled
        button
        className="icon"
        size="tiny"
        onClick={() => setShowBoardList(!showBoardList)}
      >
        <Dropdown.Menu>
          {!loading &&
            boards.map(board => (
              <Fragment key={board._id}>
                <Dropdown.Item
                  onClick={() => history.push(`/boards/id/${board._id}`)}
                  icon={
                    <StyledSpan color={board.styleProperties.color}>
                      <Icon name="columns" />
                    </StyledSpan>
                  }
                  text={board.title}
                />
                <Divider />
              </Fragment>
            ))}
        </Dropdown.Menu>
      </StyledButton>

      <SearchBar isLoading={isLoading} results={results} value={value} />
    </StyledDiv>
  );
};

export default LeftNavButtons;
