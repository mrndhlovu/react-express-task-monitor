import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";

import { Container, Header } from "semantic-ui-react";
import ColumnGrid from "./ColumnGrid";
import CreateBoard from "./CreateBoard";

const StyledHeader = styled(Header)`
  margin-top: 50px !important;
  padding-bottom: 10px !important;
`;

const getCards = () => {
  let columns = [];

  const card = {
    name: "Card",
    id: 0,
    detail: "Card detail"
  };
  _.times(4, i => {
    let newCard = { ...card, name: `Card ${i + 1}`, id: i++ };
    columns.push(newCard);
  });

  return columns;
};

const getColumns = () => {
  let columns = [];
  const cards = getCards();

  const column = {
    name: "Column",
    id: 0
  };
  _.times(4, i => {
    let newColumn = {
      ...column,
      name: `Column ${i + 1}`,
      id: i++,
      cards: []
    };

    columns.push(newColumn);
  });

  if (columns[0]) {
    const updatedColumn = { ...columns[0], cards };
    columns.shift();
    columns.unshift(updatedColumn);
  }

  return columns;
};

class BoardColumns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: "",
      columnCount: 3,
      newBoardName: "",
      newCardName: "",
      columns: "",
      showAddCardInput: false,
      cardCount: 0,
      activeColumn: ""
    };
    this.handleCreateBoard = this.handleCreateBoard.bind(this);
    this.handleAddBoardName = this.handleAddBoardName.bind(this);
    this.handleAddCardName = this.handleAddCardName.bind(this);
    this.handleCancelAddCard = this.handleCancelAddCard.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleCreateCard = this.handleCreateCard.bind(this);
  }

  componentDidMount() {
    this.setState({
      columns: getColumns(),
      columnCount: getColumns().length,
      cardCount: getColumns().cards
    });
  }

  handleAddBoardName(event) {
    this.setState({ newBoardName: event.target.value });
  }

  handleCreateBoard() {
    const { newBoardName, columns } = this.state;
    const newColumn = {
      name: newBoardName,
      id: 4
    };

    columns.push(newColumn);
    this.setState({ columns, columnCount: 2 });
  }

  handleAddCardName(columnId) {
    this.setState({ showAddCardInput: true, activeColumn: columnId });
  }

  handleCancelAddCard() {
    this.setState({ activeColumn: "" });
  }

  handleCreateCard() {
    const { newCardName } = this.state;
  }

  handleOnChange(event) {
    this.setState({ newCardName: event.target.value });
  }

  render() {
    const {
      columnCount,
      cardCount,
      columns,
      showAddCardInput,
      newCardName,
      activeColumn
    } = this.state;
    const { boardName } = this.props;
    const emptyColumnGrid = columns === 1;
    const columnHasCards = cardCount !== 0;

    return (
      <Container fluid>
        <StyledHeader>{boardName}</StyledHeader>
        {emptyColumnGrid ? (
          <CreateBoard
            handleAddBoardName={this.handleAddBoardName}
            handleCreateBoard={this.handleCreateBoard}
          />
        ) : (
          <ColumnGrid
            columns={getColumns()}
            columnCount={columnCount}
            handleAddCardName={this.handleAddCardName}
            handleCreateCard={this.handleCreateCard}
            showAddCardInput={showAddCardInput}
            newCardName={newCardName}
            handleCancelAddCard={this.handleCancelAddCard}
            columnHasCards={columnHasCards}
            activeColumn={activeColumn}
            handleOnChange={this.handleOnChange}
          />
        )}
      </Container>
    );
  }
}

export default BoardColumns;
