import React, { Component } from "react";
import styled from "styled-components";

import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import BoardHeadActions from "../home/BoardHeadActions";
import ListGrid from "./ListGrid";
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
      activeList: "",
      lists: "",
      draggingCardId: "",
      dropListId: undefined,
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
      lists: this.props.board.lists
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
    const copyBoard = { ...board };

    const data = {
      title: this.state.newListName,
      cards: [],
      position: copyBoard.lists.length + 1
    };

    copyBoard.lists.push(data);

    const filtered = filterObject(copyBoard, allowed);

    this.props.makeBoardUpdate(id, filtered);
  }

  handleAddCardName(listId) {
    this.setState({ showAddCardInput: true, activeList: listId });
  }

  handleCancelAddCard() {
    this.setState({ activeList: "" });
  }

  handleCreateCard(listId) {
    const { lists, newCardName, allowed } = this.state;
    const { board } = this.props;
    const id = board._id;

    const sourceList = lists.filter(list => list.position === listId).shift();

    const newCard = {
      title: newCardName,
      position: sourceList.cards.length + 1
    };

    sourceList.cards.push(newCard);
    const filteredBoard = filterObject(board, allowed);

    this.props.makeBoardUpdate(id, filteredBoard);
  }

  handleOnChange(event) {
    this.setState({ newCardName: event.target.value });
  }

  handleDrag() {
    const { lists, sourceId, dropListId, draggingCardId } = this.state;

    const copyLists = [...lists];
    const changeCardList = sourceId !== dropListId;

    let updatedLists;
    let updatedSourceList;
    const adjustedCardPositions = [];

    const dropTargetLists = copyLists.filter(
      list => list.position !== sourceId
    );

    const sourceList = copyLists
      .filter(list => list.position === sourceId)
      .shift();

    const draggingCard = sourceList.cards.find(
      card => card.position === draggingCardId
    );

    const sourceListCards = sourceList.cards.filter(card =>
      changeCardList ? card.position !== draggingCardId : draggingCardId
    );

    sourceListCards.filter((card, index) => {
      const newCard = {
        ...card,
        position: index + 1
      };
      return adjustedCardPositions.push(newCard);
    });

    updatedSourceList = {
      ...sourceList,
      cards: adjustedCardPositions
    };

    if (changeCardList) {
      dropTargetLists.filter(
        list =>
          list.position === dropListId &&
          list.cards.push({
            ...draggingCard,
            position: list.cards.length + 1
          })
      );

      updatedLists = [updatedSourceList, ...dropTargetLists];
      updatedLists.sort((a, b) => a.position - b.position);
    } else {
      updatedLists = [updatedSourceList, ...dropTargetLists];
      updatedLists.sort((a, b) => a.position - b.position);

      this.setState({ changeOrder: true });
    }

    this.setState({
      lists: updatedLists,
      newSourceColumn: updatedSourceList,
      dropListId: undefined,
      sourceId: undefined
    });

    this.handleReorderCards(updatedLists);
  }

  handleReorderCards(updatedLists) {
    // TODO  handle card reorder on same list
  }

  updateDropTarget(dropListId) {
    this.setState({ dropListId });
  }

  handleMoveCard(sourceId, draggingCardId) {
    this.setState({ sourceId, draggingCardId, dragging: true });
    this.updateDropTarget(sourceId);
  }

  handleDrop() {
    const { lists } = this.state;
    this.setState({ dragging: false });

    const { dragging, allowed, changeOrder } = this.state;

    const { board } = this.props;
    const id = board._id;

    const filteredBoard = filterObject(board, allowed);

    if (changeOrder) {
    } else {
      const updatedList = {
        ...filteredBoard,
        lists
      };

      !dragging && this.props.makeBoardUpdate(id, updatedList);
    }
  }

  render() {
    const {
      lists,
      showAddCardInput,
      newCardName,
      activeList,
      dropListId,
      sourceId,
      draggingCardId,
      dragging
    } = this.state;

    return (
      <DndProvider backend={Backend}>
        <BoardHeadActions />
        <StyledListContainer>
          <ListGrid
            activeList={activeList}
            lists={lists}
            draggingCardId={draggingCardId}
            dropListId={dropListId}
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
