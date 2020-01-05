import React, { Component } from "react";
import styled from "styled-components";

import {
  Container,
  Menu,
  Button,
  Label,
  Icon,
  Search,
  Header
} from "semantic-ui-react";

const StyledDiv = styled.div``;

class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { userAbbr: "M" };
  }

  render() {
    const { userAbbr, isLoading, results, value } = this.state;

    return (
      <Menu fixed="top" compact={true}>
        <Container fluid>
          <Menu.Item as="a">
            <StyledDiv>
              <Button icon="home" size="tiny" />
            </StyledDiv>
            <Button size="tiny">
              <Icon name="columns" />
              Boards
            </Button>
            <Search
              loading={isLoading}
              onSearchChange={() => console.log("e.target.value")}
              results={results}
              value={value}
              {...this.props}
            />
          </Menu.Item>
          <Menu.Item>
            <StyledDiv>
              <Header size="small">
                <Icon name="columns" />
                Trello Clone
              </Header>
            </StyledDiv>
          </Menu.Item>

          <Menu.Item position="right">
            <StyledDiv>
              <Button icon="add" size="tiny" />
            </StyledDiv>
            <StyledDiv>
              <Button icon="attention" size="tiny" />
            </StyledDiv>
            <StyledDiv>
              <Button icon="bell" size="tiny" />
            </StyledDiv>
            <StyledDiv>
              <Label
                as="a"
                circular
                size="large"
                color="purple"
                onClick={() => console.log(userAbbr)}
              >
                {userAbbr}
              </Label>
            </StyledDiv>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default NavHeader;
