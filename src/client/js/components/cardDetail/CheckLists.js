import React, { useState, useEffect, useMemo } from "react";

import { Button, Icon } from "semantic-ui-react";

import {
  emptyFunction,
  resetForm,
  findArrayItem,
  stringsEqual,
} from "../../utils/appUtils";
import { requestChecklistTask } from "../../apis/apiRequests";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import CreateInput from "../sharedComponents/CreateInput";
import ProgressBar from "./ProgressBar";
import ChecklistItem from "./ChecklistItem";
import UIContainer from "../sharedComponents/UIContainer";
import UIWrapper from "../sharedComponents/UIWrapper";

const display = {
  display: "grid",
  gridTemplateColumns: "50% 49%",
  alignItems: "center",
  width: "100%",
  padding: 0,
};

const wrapperStyle = {
  padding: 0,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "baseline",
  verticalAlign: "top",
};

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
  let [checklist, setChecklist] = useState(checkItem);

  const { id } = match.params;
  const sourceList = getSourceList(sourceId, "_id");

  const updatedChanges = () => {
    sourceList.cards.splice(
      sourceList.cards.indexOf(activeCard),
      1,
      activeCard
    );
    board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

    handleBoardUpdate(board, "lists");
  };

  const deleteChecklist = () => setRemoveChecklist(true);
  const handleChange = (e) => setTask(e.target.value);
  const handleAddClick = () => setDone(true);

  const handleCheckboxClick = useMemo(
    () => (id, status) => {
      setChecked({ id, status });
      setIsLoading(true);
    },
    []
  );

  const handleDeleteChecklistItem = (item) => {
    checklist.tasks.splice(checklist.tasks.indexOf(item), 1);
    setChecklist(checklist);

    updatedChanges();
  };

  const handleEditChecklist = (item) => {
    checklist.tasks.splice(checklist.tasks.indexOf(item), 1);
    setChecklist(checklist);

    activeCard.checklists.splice(
      activeCard.checklists.indexOf(checklist),
      1,
      checklist
    );

    updatedChanges();
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
    checklist = { ...checklist, archived: checklist.archived ? false : true };
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
      let targetTask = findArrayItem(checklist.tasks, checked.id);
      targetTask = { ...targetTask, status: checked.status };

      checklist.tasks.splice(checked.id, 1, targetTask);

      const inProgress = checklist.tasks.find((task) =>
        stringsEqual(task.status, "doing")
      );

      if (!inProgress) checklist = { ...checklist, status: "complete" };
      else checklist = { ...checklist, status: "doing" };

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
    <CardDetailSegment className="card-checklist">
      <UIContainer display={display}>
        <UIWrapper>
          <CardDetailHeader
            description={checklistName}
            icon="check square outline"
          />
        </UIWrapper>

        <UIWrapper padding="0 10" display={wrapperStyle}>
          {stringsEqual(checklist.status, "complete") && (
            <Button
              onClick={() => setHideCompleted(true)}
              size="tiny"
              content={
                checklist.archived
                  ? "Show completed tasks"
                  : "Hide completed tasks"
              }
              floated="right"
            />
          )}

          <Button
            onClick={() => deleteChecklist()}
            size="tiny"
            content="Delete"
            floated="right"
          />
        </UIWrapper>
      </UIContainer>
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
              handleEditChecklist={handleEditChecklist}
            />
            <div className="checklist-edit-wrap">
              <Icon
                className="ellipsis"
                circular
                link
                size="small"
                name="ellipsis horizontal"
              />
              <Icon
                className="bin"
                circular
                link
                size="small"
                name="trash alternate outline"
                onClick={() => handleDeleteChecklistItem(task)}
              />
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
  );
};

export default CheckLists;
