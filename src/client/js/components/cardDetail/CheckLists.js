import React, { useState } from "react";

import { Button } from "semantic-ui-react";

import { resetForm, findArrayItem, stringsEqual } from "../../utils/appUtils";
import {
  requestChecklistTask,
  requestCreateNewCard,
} from "../../apis/apiRequests";
import {
  useCardDetailContext,
  useBoardContext,
  useMainContext,
} from "../../utils/hookUtils";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import ChecklistItem from "./ChecklistItem";
import CreateInput from "../sharedComponents/CreateInput";
import DropdownButton from "../sharedComponents/DropdownButton";
import ProgressBar from "./ProgressBar";
import UIButton from "./UIButton";
import UIContainer from "../sharedComponents/UIContainer";
import UIWrapper from "../sharedComponents/UIWrapper";

const CheckLists = () => {
  const { card } = useCardDetailContext();

  return card.checklists.map((list, index) => (
    <CheckLists.Single
      checklistName={list.name}
      key={index}
      listIndex={index}
      listItem={list}
    />
  ));
};

CheckLists.Single = ({ checklistName, listItem, listIndex }) => {
  const {
    card,
    sourceId,
    saveCardChanges,
    match,
    updatedCardChanges,
  } = useCardDetailContext();
  const { updateBoardState } = useBoardContext();
  const { alertUser } = useMainContext();

  const [checklist, setChecklist] = useState(listItem);
  const [createItem, setCreateItem] = useState(false);
  const [task, setTask] = useState(null);

  const { id } = match.params;

  const deleteChecklist = () => {
    card.checklists.splice(listIndex, 1);
    updatedCardChanges(card);
  };

  const handleChange = (e) => setTask(e.target.value);

  const handleAddClick = async () => {
    if (!task) return alertUser("Add a task name");
    const data = {
      task,
      cardId: card._id,
      checkListId: checklist._id,
      listId: sourceId,
    };

    await requestChecklistTask(data, id)
      .then((res) => {
        setChecklist(res.data.checklist);
        saveCardChanges(res.data.card);
        updateBoardState(res.data.board);
      })
      .catch((error) => alertUser(error.response.data.message));

    resetForm("checklist-item");
    setTask(null);
  };

  const handleDeleteChecklistItem = (item) => {
    const itemIndex = checklist.tasks.indexOf(item);
    checklist.tasks.splice(itemIndex, 1);

    card.checklists.splice(listIndex, 1, checklist);
    updatedCardChanges(card);
  };

  const handleConvertToCard = (item) => {
    const card = { title: item.description };
    handleDeleteChecklistItem(item);
    setTimeout(async () => {
      await requestCreateNewCard({ card, listId: sourceId }, id).then((res) => {
        updateBoardState(res.data);
      });
    }, 1000);
  };

  const updatedChecklistTitle = (newChecklist) => {
    setChecklist(newChecklist);
    card.checklists.splice(listIndex, 1, newChecklist);

    updatedCardChanges(card);
  };

  const toggleCompletedList = () => {
    checklist.archived = !checklist.archived;
    setChecklist(checklist);
    card.checklists.splice(listIndex, 1, checklist);

    updatedCardChanges(card);
  };

  const handleCheckboxClick = (id, status) => {
    const targetTask = findArrayItem(checklist.tasks, id);
    targetTask.status = status;

    checklist.tasks.splice(id, 1, targetTask);

    const inProgress = checklist.tasks.find((task) =>
      stringsEqual(task.status, "doing")
    );

    if (!inProgress) checklist.status = "complete";
    else checklist.status = "doing";

    setChecklist(checklist);
    card.checklists.splice(listIndex, 1, checklist);

    updatedCardChanges(card);
  };

  return (
    <>
      <UIContainer padding="0px" className="checklist-header">
        <CardDetailHeader
          description={checklistName}
          updatedChecklistTitle={updatedChecklistTitle}
          section="Checklist"
          editable
          checklist={checklist}
        />
        <div>
          <Button
            onClick={() => deleteChecklist()}
            size="tiny"
            content="Delete"
          />
          {stringsEqual(checklist.status, "complete") && (
            <Button
              onClick={() => toggleCompletedList()}
              size="tiny"
              content={
                checklist.archived
                  ? "Show completed tasks"
                  : "Hide completed tasks"
              }
            />
          )}
        </div>
      </UIContainer>
      <CardDetailSegment className="card-checklist">
        <ProgressBar checklist={checklist} />

        {checklist.archived ? (
          <UIContainer padding="0 0 20px 15px">
            Everything in this list is complete!
          </UIContainer>
        ) : (
          checklist.tasks.map((task, index) => (
            <UIWrapper className="checklist-item-wrap" key={index}>
              <ChecklistItem
                handleCheckboxClick={handleCheckboxClick}
                item={task}
                position={index + 1}
                isCompleted={stringsEqual(task.status, "done")}
              />
              <div className="checklist-edit-wrap">
                <DropdownButton
                  className="checklist-edit-ellipsis"
                  labeled={false}
                  icon="ellipsis horizontal"
                  header="Item Actions"
                  width="200px"
                  size="tiny"
                >
                  <div className="checklist-item-actions">
                    <UIButton
                      content="Convert to card"
                      fluid={true}
                      onClick={() => handleConvertToCard(task)}
                    />
                    <UIButton
                      content="Delete"
                      fluid={true}
                      onClick={() => handleDeleteChecklistItem(task)}
                    />
                  </div>
                </DropdownButton>
              </div>
            </UIWrapper>
          ))
        )}

        {createItem ? (
          <CreateInput
            placeholder="Add an item"
            buttonText="Add"
            close={() => setCreateItem(!createItem)}
            handleChange={handleChange}
            createItemClickHandler={handleAddClick}
            id="checklist-item"
            width="100%"
          />
        ) : (
          <Button
            content="Add an item"
            compact
            onClick={() => setCreateItem(!createItem)}
          />
        )}
      </CardDetailSegment>
    </>
  );
};

export default CheckLists;
