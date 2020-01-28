import React, { Component } from "react";
import styled from "styled-components";

import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import BoardHeadActions from "../home/BoardHeadActions";
import ColumnGrid from "./ColumnGrid";
import CreateBoard from "../sharedComponents/CreateBoard";
import { filterObject } from "../../utils/appUtils";

const StyledListContainer = styled.div`
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  vertical-align: top;
`;

class BoardLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColumn: "",
      boardName: "",
      cardPositions: "",
      columns: "",
      draggingCardId: "",
      dropColumnId: undefined,
      dummyBoardList: false,
      newListName: "",
      newCardName: "",
      newSourceColumn: "",
      showAddCardInput: false,
      sourceId: undefined,
      dragging: false,
      allowed: ["title", "lists"],
      changeOrder: false
    };
    this.handleAddList = this.handleAddList.bind(this);
    this.handleAddCardName = this.handleAddCardName.bind(this);
    this.handleCancelAddCard = this.handleCancelAddCard.bind(this);
    this.handleCreateList = this.handleCreateList.bind(this);
    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleMoveCard = this.handleMoveCard.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleReorderCards = this.handleReorderCards.bind(this);
    this.updateDropTarget = this.updateDropTarget.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.setState({
      columns: this.props.board.lists
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

  handleAddList(event) {
    this.setState({ newListName: event.target.value });
  }

  handleCreateList() {
    const { board } = this.props;
    const { allowed } = this.state;
    const id = board._id;
    const boardData = { ...board };

    const data = {
      title: this.state.newListName,
      cards: [],
      position: boardData.lists.length + 1
    };

    boardData.lists.push(data);

    const filtered = filterObject(boardData, allowed);

    this.props.makeBoardUpdate(id, filtered);
  }

  handleAddCardName(columnId) {
    this.setState({ showAddCardInput: true, activeColumn: columnId });
  }

  handleCancelAddCard() {
    this.setState({ activeColumn: "" });
  }

  handleCreateCard(columnId) {
    const { columns, newCardName, allowed } = this.state;
    const { board } = this.props;
    const id = board._id;

    const sourceColumn = columns
      .filter(column => column.position === columnId)
      .shift();

    const newCard = {
      title: newCardName,
      position: sourceColumn.cards.length + 1
    };

    sourceColumn.cards.push(newCard);
    const filteredBoard = filterObject(board, allowed);

    this.props.makeBoardUpdate(id, filteredBoard);
  }

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
      column => column.position !== sourceId
    );

    const sourceColumn = copyColumns
      .filter(column => column.position === sourceId)
      .shift();

    const draggingCard = sourceColumn.cards.find(
      card => card.position === draggingCardId
    );

    const sourceColumnCards = sourceColumn.cards.filter(card =>
      changeCardColumn ? card.position !== draggingCardId : draggingCardId
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
          column.position === dropColumnId &&
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

      this.setState({ changeOrder: true });
    }

    this.setState({
      columns: updatedColumns,
      newSourceColumn: updatedSourceColumn,
      dropColumnId: undefined,
      sourceId: undefined
    });

    this.handleReorderCards(updatedColumns);
  }

  handleReorderCards(updatedColumns) {
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
    const { columns } = this.state;
    this.setState({ dragging: false });

    const { dragging, allowed, changeOrder } = this.state;

    const { board } = this.props;
    const id = board._id;

    const filteredBoard = filterObject(board, allowed);

    if (changeOrder) {
    } else {
      const updatedList = {
        ...filteredBoard,
        lists: columns
      };

      !dragging && this.props.makeBoardUpdate(id, updatedList);
    }
  }

  render() {
    const {
      columns,
      showAddCardInput,
      newCardName,
      activeColumn,
      dropColumnId,
      sourceId,
      draggingCardId,
      dragging
    } = this.state;

    return (
      <DndProvider backend={Backend}>
        <BoardHeadActions />
        <StyledListContainer>
          <ColumnGrid
            activeColumn={activeColumn}
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
          <div>
            <CreateBoard
              handleChange={this.handleAddList}
              handleCreateClick={this.handleCreateList}
              buttonText="Create List"
              placeholder="Enter new list title..."
            />
          </div>
        </StyledListContainer>
      </DndProvider>
    );
  }
}

export default BoardLists;
