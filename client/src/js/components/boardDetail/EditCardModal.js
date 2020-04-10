import React, { useState, useEffect, useContext } from "react";

import { Modal, Button } from "semantic-ui-react";

import { BoardListsContext } from "../../utils/contextUtils";
import { emptyFunction } from "../../utils/appUtils";
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
  card,
  handleDeleteCard,
  history,
  id,
  listPosition,
  mobile,
  openCardModal,
  saveBoardChanges,
  setOpenCardModal,
}) => {
  const { board } = useContext(BoardListsContext);
  const [startDate, setStartDate] = useState(new Date());
  const [newTitle, setNewTitle] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  const handleChange = (e) => setNewTitle(e.target.value);

  const handleChangeMembers = (member) => {
    console.log("member: ", member);
  };

  useEffect(() => {
    if (!saveCard) return emptyFunction();

    const updateCardTitle = async () => {
      const newCard = { ...card, title: newTitle };
      const body = {
        newCard,
        listId: listPosition,
      };

      await requestCardUpdate(body, id).then((res) => {
        saveBoardChanges(res.data);
      });
    };

    updateCardTitle();

    return () => {
      setNewTitle(null);
      setSaveCard(false);
    };
  }, [saveCard, saveBoardChanges, id, card, listPosition, newTitle]);

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
              board={board}
              card={card}
              history={history}
              listPosition={listPosition}
              saveBoardChanges={saveBoardChanges}
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
          <EditCardButton buttonText="Change Due Date" icon="users">
            <PickDueDate startDate={startDate} setStartDate={setStartDate} />
          </EditCardButton>

          <StyledEditButton
            content="Archive"
            icon="archive"
            compact
            labelPosition="left"
            fluid
          />
        </StyledModalActions>
      </Wrapper>
    </Modal>
  );
};

export default EditCardModal;
