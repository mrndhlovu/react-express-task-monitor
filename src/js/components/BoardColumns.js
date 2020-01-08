import React, { Component } from "react";
import styled from "styled-components";

import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { Container, Header } from "semantic-ui-react";
import ColumnGrid from "./ColumnGrid";
import CreateBoard from "./CreateBoard";
import BoardHeadActions from "./BoardHeadActions";
import { dummyBoardList } from "../constants/constants";

const StyledHeader = styled(Header)`
  margin-top: 50px !important;
  padding-bottom: 10px !important;
`;

class BoardColumns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColumn: "",
      boardName: "",
      cardCount: 0,
      columnCount: 3,
      columns: "",
      dropColumn: "",
      dummyBoardList: false,
      newBoardName: "",
      newCardName: "",
      showAddCardInput: false
    };
    this.handleCreateBoard = this.handleCreateBoard.bind(this);
    this.handleAddBoardName = this.handleAddBoardName.bind(this);
    this.handleAddCardName = this.handleAddCardName.bind(this);
    this.handleCancelAddCard = this.handleCancelAddCard.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  componentDidMount() {
    this.setState({
      columns: dummyBoardList(),
      columnCount: dummyBoardList().length,
      cardCount: dummyBoardList().cards
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

  handleCreateCard() {}

  handleOnChange(event) {
    this.setState({ newCardName: event.target.value });
  }

  handleDrag(dropColumn) {
    this.setState({ isDragging: true, dropColumn });
  }

  handleDrop(dragItem, sourceId) {
    const { columns, dropColumn } = this.state;
    let updatedColumns;
    let updatedSourceColumn;

    const dropTargetColumns = columns.filter(column => column.id !== sourceId);
    const sourceColumn = columns.filter(column => column.id === sourceId)[0];
    const filteredSourceColumnCards = sourceColumn.cards.filter(
      card => card.id !== dragItem.id
    );

    updatedSourceColumn = { ...sourceColumn, cards: filteredSourceColumnCards };

    dropTargetColumns.map(column => {
      if (column.id === dropColumn.id) {
        return dropColumn.cards.push(dragItem);
      }
      return dropTargetColumns;
    });

    updatedColumns = [updatedSourceColumn, ...dropTargetColumns];
    updatedColumns.sort((a, b) => a.position - b.position);

    this.setState({
      isDragging: false,
      columns: updatedColumns
    });
  }

  render() {
    const {
      columnCount,
      cardCount,
      columns,
      showAddCardInput,
      newCardName,
      activeColumn,
      isDragging
    } = this.state;

    const { boardName } = this.props;
    const emptyColumnGrid = columns === 1;
    const columnHasCards = cardCount !== 0;

    return (
      <DndProvider backend={Backend}>
        <Container fluid>
          <StyledHeader>{boardName}</StyledHeader>
          <BoardHeadActions />
          {emptyColumnGrid ? (
            <CreateBoard
              handleAddBoardName={this.handleAddBoardName}
              handleCreateBoard={this.handleCreateBoard}
            />
          ) : (
            <ColumnGrid
              columns={columns}
              columnCount={columnCount}
              handleAddCardName={this.handleAddCardName}
              handleCreateCard={this.handleCreateCard}
              showAddCardInput={showAddCardInput}
              newCardName={newCardName}
              handleCancelAddCard={this.handleCancelAddCard}
              columnHasCards={columnHasCards}
              activeColumn={activeColumn}
              handleOnChange={this.handleOnChange}
              handleDrag={this.handleDrag}
              dragging={isDragging}
              handleDrop={this.handleDrop}
            />
          )}
        </Container>
      </DndProvider>
    );
  }
}

export default BoardColumns;
