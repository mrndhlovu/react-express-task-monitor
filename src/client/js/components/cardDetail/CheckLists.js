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
import ProgressBar from "./ProgressBar";
import UIContainer from "../sharedComponents/UIContainer";
import { CheckSquare } from "react-feather";

const CheckLists = () => {
  const { card } = useCardDetailContext();

  return card.checklists.map((list, index) => (
    <CheckLists.Single key={index} listIndex={index} listItem={list} />
  ));
};

CheckLists.Single = ({ listItem, listIndex }) => {
  const {
    card,
    match,
    saveCardChanges,
    sourceId,
    updatedCardChanges,
  } = useCardDetailContext();
  const { updateBoardState } = useBoardContext();
  const { alertUser } = useMainContext();

  const [checklist, setChecklist] = useState(listItem);
  const [createItem, setCreateItem] = useState(false);
  const [isOverCurrent, setIsOverCurrent] = useState(null);
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

  const editCheckListTaskHandler = (id, status, description) => {
    const targetTask = findArrayItem(checklist.tasks, id);
    targetTask[status ? "status" : "description"] = status
      ? status
      : description;

    checklist.tasks.splice(id, 1, targetTask);
    if (status) {
      const inProgress = checklist.tasks.find((task) =>
        stringsEqual(task.status, "doing")
      );

      if (!inProgress) checklist.status = "complete";
      else checklist.status = "doing";
    }

    setChecklist(checklist);
    card.checklists.splice(listIndex, 1, checklist);

    updatedCardChanges(card);
  };

  return (
    <>
      <UIContainer padding="0px" className="checklist-header">
        <CardDetailHeader
          field="name"
          handleEditTitle={updatedChecklistTitle}
          section="Checklist"
          editable
          editItem={checklist}
          icon={() => <CheckSquare />}
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
            <ChecklistItem
              editCheckListTaskHandler={editCheckListTaskHandler}
              handleConvertToCard={handleConvertToCard}
              handleDeleteChecklistItem={handleDeleteChecklistItem}
              isCompleted={stringsEqual(task.status, "done")}
              isOverCurrent={isOverCurrent}
              task={task}
              position={index + 1}
              setIsOverCurrent={setIsOverCurrent}
              key={index}
            />
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
