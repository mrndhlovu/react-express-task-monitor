import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { BoardContext } from "../utils/contextUtils";
import { getBoardDetail, makeBoardUpdate } from "../actions/BoardActions";
import { getBoardDetails } from "../selectors/appSelectors";
import Board from "../components/boardDetail/Board";

const StyledContainer = styled.div`
  display: grid;
`;

const mapStateToProps = state => ({
  board: getBoardDetails(state)
});

class BoardContainer extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBoardDetail(id);
  }
  render() {
    return (
      <BoardContext.Provider value={this.props}>
        <StyledContainer>
          {this.props.board.dataReceived && <Board />}
        </StyledContainer>
      </BoardContext.Provider>
    );
  }
}

export default connect(mapStateToProps, { getBoardDetail, makeBoardUpdate })(
  BoardContainer
);
