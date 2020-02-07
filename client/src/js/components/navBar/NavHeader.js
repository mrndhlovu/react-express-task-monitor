import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import LeftNavButtons from "./LeftNavButtons";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import RightNavButtons from "./RightNavButtons";

const NavWrapper = styled.div`
  display: grid;
  grid-template-columns: 10% 10% 70% 10%;
  min-height: 40px;
  padding: 5px 0 1px 5px;
  background: rgba(0, 0, 0, 0.15);
`;

class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { userAbbr: "M" };
  }

  render() {
    const { isLoading, results, value } = this.state;
    const { history } = this.props;

    return (
      <NavWrapper>
        <LeftNavButtons history={history} />
        <SearchBar isLoading={isLoading} results={results} value={value} />
        <Logo />
        <RightNavButtons />
      </NavWrapper>
    );
  }
}

export default withRouter(NavHeader);
