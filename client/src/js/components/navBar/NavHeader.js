import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

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
    const { history } = this.props;

    return (
      <Menu fluid>
        <Container fluid>
          <Menu.Item as="a">
            <StyledDiv>
              <Button
                icon="home"
                size="tiny"
                onClick={() => history.push("/")}
              />
            </StyledDiv>
            <Button size="tiny" onClick={() => history.push("/boards")}>
              <Icon name="columns" />
              Boards
            </Button>
            <Search
              loading={isLoading}
              onSearchChange={() => console.log("e.target.value")}
              results={results}
              value={value}
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

export default withRouter(NavHeader);
