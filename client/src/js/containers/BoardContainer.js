import React, { Component } from "react";
import { connect } from "react-redux";

import { BoardsContext } from "../utils/contextUtils";
import { getBoardDetail, makeBoardUpdate } from "../actions/BoardActions";
import { getBoardDetails } from "../selectors/appSelectors";
import Board from "../components/boardDetail/Board";

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
      <BoardsContext.Provider value={this.props}>
        {this.props.board.dataReceived && <Board />}
      </BoardsContext.Provider>
    );
  }
}

export default connect(mapStateToProps, { getBoardDetail, makeBoardUpdate })(
  BoardContainer
);
