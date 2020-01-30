import React, { Component } from "react";
import styled from "styled-components";

import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import BoardHeader from "../home/BoardHeader";
import ListGrid from "./ListGrid";
import CreateBoard from "../sharedComponents/CreateBoard";
import { filterObject } from "../../utils/appUtils";

const StyledListContainer = styled.div`
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  vertical-align: top;
`;

const INITIAL_STATE = {
  activeList: "",
  allowed: ["title", "lists"],
  dragging: false,
  draggingCardId: "",
  dropListColumnId: undefined,
  hoverIndex: "",
  lists: "",
  newCardName: "",
  newListName: "",
  newSourceColumn: "",
  reorder: false,
  showAddCardInput: false,
  sourceId: undefined
};

class BoardLists extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.handleAddCardName = this.handleAddCardName.bind(this);
    this.handleAddList = this.handleAddList.bind(this);
    this.handleCardsReorder = this.handleCardsReorder.bind(this);
    this.handleChangeCardList = this.handleChangeCardList.bind(this);
    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleCreateList = this.handleCreateList.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleStartDrag = this.handleStartDrag.bind(this);
    this.updateDropTargetId = this.updateDropTargetId.bind(this);
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

  handleChangeCardList() {
    const { lists, sourceId, dropListColumnId, draggingCardId } = this.state;

    const copyLists = [...lists];
    const changeCardList = sourceId !== dropListColumnId;
    let updatedLists;
    let updatedSourceList;

    if (changeCardList) {
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

      dropTargetLists.filter(
        list =>
          list.position === dropListColumnId &&
          list.cards.push({
            ...draggingCard,
            position: list.cards.length + 1
          })
      );

      updatedLists = [updatedSourceList, ...dropTargetLists];
      updatedLists.sort((a, b) => a.position - b.position);
      this.setState({
        lists: updatedLists,
        newSourceColumn: updatedSourceList,
        dropListColumnId: undefined,
        sourceId: undefined
      });
    }
  }

  handleCardsReorder(hoverIndex, draggingCardId) {
    const { lists, sourceId, dropListColumnId } = this.state;

    const changeCardsOrder = sourceId === dropListColumnId;

    if (changeCardsOrder) {
      const sourceList = lists
        .filter(list => list.position === sourceId)
        .shift();

      const otherLists = lists.filter(list => list.position !== sourceId);

      const cards = sourceList.cards;
      let adjustedCardPositions = [];

      cards.filter(card => {
        const newCard = {
          ...card,
          position:
            card.position === draggingCardId
              ? hoverIndex
              : card.position === hoverIndex
              ? draggingCardId
              : card.position
        };
        return adjustedCardPositions.push(newCard);
      });

      adjustedCardPositions.sort((a, b) => a.position - b.position);

      const updatedLists = { ...sourceList, cards: adjustedCardPositions };

      otherLists.push(updatedLists);

      otherLists.sort((a, b) => a.position - b.position);

      this.setState({ lists: otherLists, draggingCardId });
    }
  }

  updateDropTargetId(dropTargetId) {
    this.setState({ dropListColumnId: dropTargetId });
  }

  handleStartDrag(sourceId, draggingCardId) {
    this.setState({ sourceId, draggingCardId, dragging: true });
  }

  handleDrop() {
    const { allowed, lists } = this.state;
    const { board } = this.props;
    const id = board._id;

    const filteredBoard = filterObject(board, allowed);

    const updatedList = {
      ...filteredBoard,
      lists
    };
    this.props.makeBoardUpdate(id, updatedList);
  }

  render() {
    const {
      activeList,
      dragging,
      draggingCardId,
      lists,
      newCardName,
      showAddCardInput,
      sourceId
    } = this.state;

    const { board } = this.props;

    return (
      <DndProvider backend={Backend}>
        <BoardHeader boardTitle={board.title} />
        <StyledListContainer>
          <ListGrid
            activeList={activeList}
            dragging={dragging}
            draggingCardId={draggingCardId}
            handleAddCardName={this.handleAddCardName}
            handleCancelAddCard={() => this.setState({ activeList: "" })}
            handleCreateCard={this.handleCreateCard}
            handleChangeCardList={this.handleChangeCardList}
            handleDrop={this.handleDrop}
            handleStartDrag={this.handleStartDrag}
            handleOnChange={this.handleOnChange}
            handleCardsReorder={this.handleCardsReorder}
            lists={lists}
            newCardName={newCardName}
            showAddCardInput={showAddCardInput}
            sourceId={sourceId}
            updateDropTargetId={this.updateDropTargetId}
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
