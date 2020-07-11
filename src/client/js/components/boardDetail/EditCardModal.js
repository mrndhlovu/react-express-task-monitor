import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { Button } from "semantic-ui-react";

import { BoardListsContext } from "../../utils/contextUtils";
import { requestCardUpdate } from "../../apis/apiRequests";
import BoardMembersList from "../sharedComponents/BoardMembersList";
import CreateInput from "../sharedComponents/CreateInput";
import EditCardButton from "../sharedComponents/EditCardButton";
import MoveCardDialog from "./MoveCardDialog";
import PickDueDate from "../sharedComponents/PickDueDate";
import UIModal from "../sharedComponents/UIModal";

const Wrapper = styled.div`
  display: flex;
  vertical-align: top;
  justify-content: space-evenly;
`;

const StyledModalContent = styled.div`
  background: transparent !important;
  padding-bottom: 10px;
  padding-left: 10px;
  width: fit-content;
`;

const StyledModalActions = styled.div`
  background: transparent !important;
  display: flex;
  flex-direction: column;
  margin-top: 10px !important;
  width: fit-content;
`;

const EditCardModal = ({
  cardItem,
  handleBoardUpdate,
  handleDeleteCard,
  history,
  id,
  listPosition,
  openCardModal,
  saveBoardChanges,
  setOpenCardModal,
  sourceListId,
  setSourceId,
}) => {
  const { board } = useContext(BoardListsContext);

  const [archive, setArchive] = useState(false);
  const [boardMember, setBoardMember] = useState(null);
  const [card, setCard] = useState(cardItem);
  const [newDate, setNewDate] = useState({ add: false, remove: false });
  const [newTitle, setNewTitle] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [close, setClose] = useState(false);

  const handleChange = (e) => setNewTitle(e.target.value);

  const handleChangeMembers = (member) => setBoardMember(member);

  const handleUpdateDueDate = (remove) => {
    remove
      ? setNewDate({ ...newDate, remove: true })
      : setNewDate({ ...newDate, add: true });
  };

  useEffect(() => {
    let newCard;
    const saveCardChanges = async () => {
      const body = {
        newCard,
        listId: sourceListId,
      };

      await requestCardUpdate(body, id).then((res) => {
        setCard(newCard);
        saveBoardChanges(res.data);
      });
    };

    if (saveCard) {
      newCard = { ...card, title: newTitle };
      setSaveCard(false);
      setNewTitle(null);
      saveCardChanges();
    }

    if (newDate.add || newDate.remove) {
      newCard = {
        ...card,
        dueDate: newDate.add ? { date: `${startDate}`, complete: false } : "",
      };

      setNewDate({ add: false, remove: false });
      saveCardChanges();
    }
    if (archive) {
      newCard = { ...card, archived: true };
      setArchive(false);
      saveCardChanges();
    }

    if (boardMember) {
      const isInAssigneeList = card.assignees.some(
        (member) => member._id === boardMember._id
      );

      isInAssigneeList
        ? card.assignees.splice(card.assignees.indexOf(boardMember), 1)
        : card.assignees.push(boardMember);
      newCard = { ...card };

      saveCardChanges();
    }
    return () => {
      setBoardMember(null);
    };
  }, [
    archive,
    boardMember,
    card,
    id,
    sourceListId,
    newDate,
    newTitle,
    saveBoardChanges,
    saveCard,
    startDate,
  ]);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setClose(false);
      }, 500);
    };
  });

  const EDIT_CARD_MODAL_STYLE = {
    top: "6%",
    left: "28%",
    bottom: "1%",
    padding: "0px",
    width: "45%",
    border: "none",
    backgroundColor: "transparent",
  };

  return (
    <UIModal
      className="create-card-modal"
      isOpen={openCardModal}
      bgColor="transparent"
      modalStyle={EDIT_CARD_MODAL_STYLE}
    >
      <Wrapper className="edit-card-actions">
        <StyledModalContent>
          <CreateInput
            close={() => setOpenCardModal(false)}
            defaultValue={card.title}
            buttonText="Save"
            placeholder="Update card title"
            handleCreateClick={() => setSaveCard(true)}
            handleChange={handleChange}
          />
        </StyledModalContent>
        <StyledModalActions>
          <EditCardButton
            header="Delete"
            closeOnSelect={true}
            color="#000000de"
            buttonText="Delete"
            icon="delete"
          >
            <Button
              content="Delete Card"
              negative
              compact
              size="tiny"
              onClick={() => handleDeleteCard()}
              fluid
            />
          </EditCardButton>
          <EditCardButton
            close={close}
            buttonText="Move"
            header="Move"
            icon="right arrow"
          >
            <MoveCardDialog
              originalBoard={board}
              originalCard={card}
              history={history}
              originalListPosition={listPosition}
              sourceListId={sourceListId}
              saveBoardChanges={saveBoardChanges}
              id={id}
              handleBoardUpdate={handleBoardUpdate}
              setClose={() => setClose(true)}
              setSourceId={setSourceId}
            />
          </EditCardButton>
          <EditCardButton
            buttonText="Change Members"
            icon="users"
            closeOnSelect={true}
          >
            <BoardMembersList
              boardMembers={board.members}
              handleBoardMemberClick={handleChangeMembers}
              activeCard={card}
            />
          </EditCardButton>

          <EditCardButton buttonText="Change Due Date" icon="clock">
            <PickDueDate
              startDate={startDate}
              setStartDate={setStartDate}
              handleUpdateDueDate={handleUpdateDueDate}
            />
          </EditCardButton>
          <EditCardButton
            buttonText="Archive"
            icon="archive"
            closeOnSelect={true}
          >
            <Button
              content="Archive"
              negative
              compact
              fluid
              onClick={() => setArchive(true)}
            />
          </EditCardButton>
        </StyledModalActions>
      </Wrapper>
    </UIModal>
  );
};

export default EditCardModal;
