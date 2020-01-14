import React, { Component } from "react";
import styled from "styled-components";
import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import ColumnGrid from "./ColumnGrid";
import CreateBoard from "./CreateBoard";
import BoardHeadActions from "./BoardHeadActions";
import { dummyBoardList } from "../constants/constants";

const StyledListContainer = styled.div`
  display: flex;

  width: ${props => props.width && props.width + props.height};
  height: ${props => props.height && props.height};
  overflow-y: auto;
  overflow-x: hidden;
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
      draggingCardId: "",
      dropColumnId: undefined,
      dummyBoardList: false,
      newBoardName: "",
      newCardName: "",
      newColumns: "",
      newSourceColumn: "",
      showAddCardInput: false,
      sourceId: undefined,
      dragging: false,
      width: 0,
      height: 0
    };
    this.handleAddBoardName = this.handleAddBoardName.bind(this);
    this.handleAddCardName = this.handleAddCardName.bind(this);
    this.handleMoveCard = this.handleMoveCard.bind(this);
    this.handleCancelAddCard = this.handleCancelAddCard.bind(this);
    this.handleReorderCards = this.handleReorderCards.bind(this);
    this.handleCreateBoard = this.handleCreateBoard.bind(this);
    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.updateDropTarget = this.updateDropTarget.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.setState({
      columns: dummyBoardList(),
      columnCount: dummyBoardList().length,
      cardCount: dummyBoardList().cards
    });

    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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
    const { columns, sourceId, dropColumnId, draggingCardId } = this.state;

    const copyColumns = [...columns];
    const changeCardColumn = sourceId !== dropColumnId;

    let updatedColumns;
    let updatedSourceColumn;
    const adjustedCardPositions = [];

    const dropTargetColumns = copyColumns.filter(
      column => column.id !== sourceId
    );

    const sourceColumn = copyColumns
      .filter(column => column.id === sourceId)
      .shift();

    const draggingCard = sourceColumn.cards.find(
      card => card.id === draggingCardId
    );

    const sourceColumnCards = sourceColumn.cards.filter(card =>
      changeCardColumn ? card.id !== draggingCardId : draggingCardId
    );

    sourceColumnCards.filter((card, index) => {
      const newCard = {
        ...card,
        position: index + 1
      };
      return adjustedCardPositions.push(newCard);
    });

    updatedSourceColumn = {
      ...sourceColumn,
      cards: adjustedCardPositions
    };

    if (changeCardColumn) {
      dropTargetColumns.filter(
        column =>
          column.id === dropColumnId &&
          column.cards.push({
            ...draggingCard,
            position: column.cards.length + 1
          })
      );

      updatedColumns = [updatedSourceColumn, ...dropTargetColumns];
      updatedColumns.sort((a, b) => a.position - b.position);
    } else {
      updatedColumns = [updatedSourceColumn, ...dropTargetColumns];
      updatedColumns.sort((a, b) => a.position - b.position);

      this.handleReorderCards(sourceId, draggingCardId);
    }

    this.setState({
      newColumns: updatedColumns,
      newSourceColumn: updatedSourceColumn,
      dropColumnId: undefined,
      sourceId: undefined
    });
  }

  handleReorderCards(sourceId, draggingCardId, newPosition) {
    // TODO  handle card reorder on same column
  }

  updateDropTarget(dropColumnId) {
    this.setState({ dropColumnId });
  }

  handleMoveCard(sourceId, draggingCardId) {
    this.setState({ sourceId, draggingCardId, dragging: true });
    this.updateDropTarget(sourceId);
  }

  handleDrop() {
    this.setState({ columns: this.state.newColumns, dragging: false });
  }

  render() {
    const {
      columnCount,
      cardCount,
      columns,
      showAddCardInput,
      newCardName,
      activeColumn,
      dropColumnId,
      sourceId,
      draggingCardId,
      width,
      height,
      dragging
    } = this.state;

    const emptyColumnGrid = columns.length === 0;
    const columnHasCards = cardCount !== 0;

    return (
      <DndProvider backend={Backend}>
        <BoardHeadActions />
        <StyledListContainer width={width} height={height}>
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
              draggingCardId={draggingCardId}
              dropColumnId={dropColumnId}
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
              handleMoveCard={this.handleMoveCard}
              handleReorderCards={this.handleReorderCards}
              dragging={dragging}
            />
          )}
        </StyledListContainer>
      </DndProvider>
    );
  }
}

export default BoardColumns;
