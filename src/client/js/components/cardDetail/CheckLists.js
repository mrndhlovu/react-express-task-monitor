import React, { useState, useEffect } from "react";

import { Button } from "semantic-ui-react";

import {
  emptyFunction,
  resetForm,
  findArrayItem,
  stringsEqual,
} from "../../utils/appUtils";
import {
  requestChecklistTask,
  requestCreateNewCard,
} from "../../apis/apiRequests";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import CreateInput from "../sharedComponents/CreateInput";
import ProgressBar from "./ProgressBar";
import ChecklistItem from "./ChecklistItem";
import UIContainer from "../sharedComponents/UIContainer";
import UIWrapper from "../sharedComponents/UIWrapper";
import DropdownButton from "../sharedComponents/DropdownButton";
import UIButton from "./UIButton";

const CheckLists = ({
  activeCard,
  board,
  checkItem,
  checklistName,
  getSourceList,
  handleBoardUpdate,
  listIndex,
  match,
  saveBoardChanges,
  saveCardChanges,
  sourceId,
}) => {
  const [checked, setChecked] = useState(null);
  const [createItem, setCreateItem] = useState(false);
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [removeChecklist, setRemoveChecklist] = useState(false);
  const [task, setTask] = useState(null);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [checklist, setChecklist] = useState(checkItem);

  const { id } = match.params;
  const sourceList = getSourceList(sourceId, "_id");
  const sourceIndex = board.lists.indexOf(sourceList);
  const cardIndex = sourceList.cards.indexOf(activeCard);

  const updatedChanges = () => {
    sourceList.cards.splice(cardIndex, 1, activeCard);
    updateLists();
  };

  const updateLists = (newBoard) => {
    board.lists.splice(sourceIndex, 1, sourceList);

    handleBoardUpdate(newBoard ? newBoard : board, "lists");
  };

  const deleteChecklist = () => setRemoveChecklist(true);
  const handleChange = (e) => setTask(e.target.value);
  const handleAddClick = () => setDone(true);

  const handleCheckboxClick = (id, status) => {
    setChecked({ id, status });
    setIsLoading(true);
  };

  const handleDeleteChecklistItem = (item) => {
    checklist.tasks.splice(checklist.tasks.indexOf(item), 1);
    setChecklist(checklist);

    updatedChanges();
  };

  const handleConvertToCard = (item) => {
    const card = { title: item.description };
    handleDeleteChecklistItem(item);
    setTimeout(async () => {
      await requestCreateNewCard({ card, listId: sourceId }, id).then((res) => {
        saveBoardChanges(res.data);
      });
    }, 2000);
  };

  useEffect(() => {
    if (!removeChecklist) return emptyFunction();
    activeCard.checklists.splice(listIndex, 1);

    updatedChanges();

    return () => {
      setRemoveChecklist(false);
    };
  }, [
    removeChecklist,
    handleBoardUpdate,
    board,
    activeCard,
    sourceList,
    checked,
    saveCardChanges,
    checklist,
    listIndex,
  ]);

  useEffect(() => {
    if (!hideCompleted) return emptyFunction();
    checklist.archived = !checklist.archived;
    setChecklist(checklist);
    activeCard.checklists.splice(listIndex, 1, checklist);

    updatedChanges();

    setHideCompleted(false);
  }, [
    board,
    hideCompleted,
    checklist,
    activeCard,
    sourceList,
    saveCardChanges,
    handleBoardUpdate,
    listIndex,
  ]);

  useEffect(() => {
    if (!checked) return emptyFunction();
    const handleCheckBox = () => {
      const targetTask = findArrayItem(checklist.tasks, checked.id);
      targetTask.status = checked.status;

      checklist.tasks.splice(checked.id, 1, targetTask);

      const inProgress = checklist.tasks.find((task) =>
        stringsEqual(task.status, "doing")
      );

      if (!inProgress) checklist.status = "complete";
      else checklist.status = "doing";

      setChecklist(checklist);
      activeCard.checklists.splice(listIndex, 1, checklist);

      updatedChanges();
    };
    handleCheckBox();
    setChecked(null);
    setIsLoading(false);
  }, [
    activeCard,
    board,
    checked,
    checklist,
    getSourceList,
    handleBoardUpdate,
    saveCardChanges,
    sourceId,
    sourceList,
    listIndex,
  ]);

  useEffect(() => {
    if (!done) return emptyFunction();

    const getTaskItem = () => {
      const data = {
        task,
        cardId: activeCard._id,
        checkListId: checklist._id,
        listId: sourceId,
      };

      requestChecklistTask(data, id).then((res) => {
        setChecklist(res.data.checklist);
        saveCardChanges(res.data.card);
        saveBoardChanges(res.data.board);
      });
    };

    getTaskItem();
    setDone(false);
    resetForm("checklist-item");
    setTask(null);
  }, [
    activeCard,
    done,
    checklist,
    id,
    sourceId,
    saveBoardChanges,
    saveCardChanges,
    listIndex,
    task,
  ]);

  return (
    <>
      <UIContainer padding="0px" className="checklist-header">
        <CardDetailHeader description={checklistName} />
        <div>
          <Button
            onClick={() => deleteChecklist()}
            size="tiny"
            content="Delete"
          />
          {stringsEqual(checklist.status, "complete") && (
            <Button
              onClick={() => setHideCompleted(true)}
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
            <UIWrapper className="checklist-item-wrap" key={task._id}>
              <ChecklistItem
                handleCheckboxClick={handleCheckboxClick}
                item={task}
                isLoading={isLoading}
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
            handleCreateClick={handleAddClick}
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
