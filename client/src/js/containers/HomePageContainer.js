import React, { Component } from "react";

import { connect } from "react-redux";

import { getBoardList, makeNewBoard } from "../actions/BoardActions";
import { getBoards, getNewBoard } from "../selectors/appSelectors";
import HomePage from "../components/home/HomePage";
import { BoardContext } from "../utils/contextUtils";

const mapStateToProps = state => {
  return {
    boards: getBoards(state),
    newBoard: getNewBoard(state)
  };
};

class HomePageContainer extends Component {
  componentDidMount() {
    this.props.getBoardList();
  }
  render() {
    return (
      <BoardContext.Provider value={this.props}>
        <HomePage />
      </BoardContext.Provider>
    );
  }
}

export default connect(mapStateToProps, { getBoardList, makeNewBoard })(
  HomePageContainer
);
