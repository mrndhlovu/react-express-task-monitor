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
      cardPositions: "",
      columnCount: 3,
      columns: "",
      dragItem: "",
      dropColumn: undefined,
      dropColumnId: "",
      dummyBoardList: false,
      newBoardName: "",
      newCardName: "",
      newColumns: "",
      newSourceColumn: "",
      showAddCardInput: false,
      sourceId: undefined
    };
    this.handleCreateBoard = this.handleCreateBoard.bind(this);
    this.handleAddBoardName = this.handleAddBoardName.bind(this);
    this.handleAddCardName = this.handleAddCardName.bind(this);
    this.handleCancelAddCard = this.handleCancelAddCard.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.updateDropTarget = this.updateDropTarget.bind(this);
    this.handleBeginDrag = this.handleBeginDrag.bind(this);
    this.handleChangeCardPosition = this.handleChangeCardPosition.bind(this);
    this.drag = this.drag.bind(this);
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

  handleDrag() {
    const { columns, sourceId, dropColumn, dragItem } = this.state;

    const copyColumns = [...columns];
    const changeCardColumn = sourceId !== dropColumn.id;

    let updatedColumns;
    let updatedSourceColumn;

    const dropTargetColumns = copyColumns.filter(
      column => column.id !== sourceId
    );

    const sourceColumn = copyColumns
      .filter(column => column.id === sourceId)
      .shift();

    const sourceColumnCards = sourceColumn.cards.filter(card =>
      changeCardColumn ? card.id !== dragItem.id : dragItem.id
    );

    updatedSourceColumn = {
      ...sourceColumn,
      cards: sourceColumnCards
    };

    if (changeCardColumn) {
      dropTargetColumns.filter(
        (column, index) =>
          column.id === dropColumn.id &&
          column.cards.push({ ...dragItem, position: column.cards.length + 1 })
      );

      updatedColumns = [updatedSourceColumn, ...dropTargetColumns];
      updatedColumns.sort((a, b) => a.position - b.position);
    } else {
      updatedColumns = [updatedSourceColumn, ...dropTargetColumns];
      updatedColumns.sort((a, b) => a.position - b.position);

      this.handleChangeCardPosition(sourceColumn, dragItem);
    }

    this.setState({
      newColumns: updatedColumns,
      newSourceColumn: updatedSourceColumn,
      dropColumn: undefined,
      sourceId: undefined
    });
  }

  handleChangeCardPosition(sourceColumn, dragItem) {}

  updateDropTarget(dropColumn) {
    this.setState({ dropColumn });
  }
  drag(dragItem) {}

  handleBeginDrag(dropColumn, sourceId, dragItem) {
    this.setState({ sourceId, dragItem });
    this.updateDropTarget(dropColumn);
  }

  handleDrop() {
    this.setState({ columns: this.state.newColumns });
  }

  render() {
    const {
      columnCount,
      cardCount,
      columns,
      showAddCardInput,
      newCardName,
      activeColumn,
      dropColumn,
      sourceId,
      dragItem
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
              activeColumn={activeColumn}
              columnCount={columnCount}
              columnHasCards={columnHasCards}
              columns={columns}
              dragItem={dragItem}
              dropColumn={dropColumn}
              handleAddCardName={this.handleAddCardName}
              handleCancelAddCard={this.handleCancelAddCard}
              handleCreateCard={this.handleCreateCard}
              handleDrag={this.handleDrag}
              handleDrop={this.handleDrop}
              handleOnChange={this.handleOnChange}
              newCardName={newCardName}
              showAddCardInput={showAddCardInput}
              sourceId={sourceId}
              updateDropTarget={this.updateDropTarget}
              handleBeginDrag={this.handleBeginDrag}
              drag={this.drag}
            />
          )}
        </Container>
      </DndProvider>
    );
  }
}

export default BoardColumns;
