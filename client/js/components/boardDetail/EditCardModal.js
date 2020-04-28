import React, { useState, useEffect, useContext } from "react";

import { Modal, Button } from "semantic-ui-react";

import { BoardListsContext } from "../../utils/contextUtils";
import { requestCardUpdate } from "../../apis/apiRequests";
import BoardMembersList from "../sharedComponents/BoardMembersList";
import CreateInput from "../sharedComponents/CreateInput";
import EditCardButton from "../sharedComponents/EditCardButton";
import MoveCardDialog from "./MoveCardDialog";
import PickDueDate from "../sharedComponents/PickDueDate";
import styled from "styled-components";

const mobileLayout = {
  display: "flex",
  background: "transparent !important",
  position: "absolute",
  flexDirection: "column",
};

const defaultLayout = {
  display: "grid",
  gridTemplateColumns: "52% 30%",
  background: "transparent !important",
  position: "absolute",
  width: "495px",
  left: "-15%",
};

const StyledEditButton = styled(Button)`
  font-size: 13px !important;
  font-weight: 500 !important;
`;

const Wrapper = styled.div`
  ${(props) => (props.mobile ? { ...mobileLayout } : { ...defaultLayout })};
`;

const StyledModalContent = styled(Modal.Content)`
  background: transparent !important;
  padding-bottom: 10px;
  padding-left: 10px;
`;

const StyledModalActions = styled(Modal.Actions)`
  background: transparent !important;
  display: flex;
  flex-direction: column;
  margin-top: 10px !important;
`;

const EditCardModal = ({
  cardItem,
  handleBoardUpdate,
  handleDeleteCard,
  history,
  id,
  listPosition,
  mobile,
  openCardModal,
  saveBoardChanges,
  setOpenCardModal,
  sourceListId,
}) => {
  const { board } = useContext(BoardListsContext);

  const [archive, setArchive] = useState(false);
  const [boardMember, setBoardMember] = useState(null);
  const [card, setCard] = useState(cardItem);
  const [newDate, setNewDate] = useState({ add: false, remove: false });
  const [newTitle, setNewTitle] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (e) => setNewTitle(e.target.value);

  const handleChangeMembers = (member) => setBoardMember(member);

  const handleRemoveDueDate = () => setNewDate({ ...newDate, remove: true });
  const handleAddDueDate = () => setNewDate({ ...newDate, add: true });

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

      saveCardChanges();
    }

    if (boardMember) {
      const isInAssigneeList = card.assignees.some(
        (member) => member._id === boardMember._id
      );
      console.log("isInAssigneeList: ", isInAssigneeList);

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

  return (
    <Modal
      centered={false}
      className="create-card-modal"
      open={openCardModal}
      size="tiny"
    >
      <Wrapper mobile={mobile}>
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
          <EditCardButton buttonText="Move" header="Move" icon="right arrow">
            <MoveCardDialog
              originalBoard={board}
              originalCard={card}
              history={history}
              originalListPosition={listPosition}
              sourceListId={sourceListId}
              saveBoardChanges={saveBoardChanges}
              id={id}
              handleBoardUpdate={handleBoardUpdate}
            />
          </EditCardButton>
          <EditCardButton
            buttonText="Change Members"
            icon="users"
            closeOnSelect={true}
          >
            <BoardMembersList
              boardMembers={board.members}
              handleClick={handleChangeMembers}
            />
          </EditCardButton>

          <EditCardButton buttonText="Change Due Date" icon="clock">
            <PickDueDate
              startDate={startDate}
              setStartDate={setStartDate}
              handleAddClick={handleAddDueDate}
              handleRemoveClick={handleRemoveDueDate}
            />
          </EditCardButton>

          <StyledEditButton
            content="Archive"
            icon="archive"
            compact
            labelPosition="left"
            fluid
            onClick={() => setArchive(true)}
          />
        </StyledModalActions>
      </Wrapper>
    </Modal>
  );
};

export default EditCardModal;
