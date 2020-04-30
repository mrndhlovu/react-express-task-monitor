import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

import { Button } from "semantic-ui-react";

import { emptyFunction, resetForm } from "../../utils/appUtils";
import { requestNewChecklistItem } from "../../apis/apiRequests";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import CreateInput from "../sharedComponents/CreateInput";
import ProgressBar from "./ProgressBar";
import ChecklistItem from "./ChecklistItem";

const CheckListHeader = styled.div`
  display: grid;
  grid-template-columns: 50% 49%;
  align-items: center;
  width: 100%;
`;

const CheckLists = ({
  activeCard,
  match,
  saveBoardChanges,
  sourceId,
  checklistName = "Checklist",
  getSourceList,
  board,
  handleBoardUpdate,
  saveCardChanges,
}) => {
  const [checked, setChecked] = useState(null);
  const [createItem, setCreateItem] = useState(false);
  const [description, setDescription] = useState(null);
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [removeChecklist, setRemoveChecklist] = useState(false);

  const { id } = match.params;
  const sourceList = getSourceList(sourceId, "_id");

  const deleteChecklist = () => setRemoveChecklist(true);
  const handleChange = (e) => setDescription(e.target.value);
  const handleAddClick = () => setDone(true);

  const handleCheckboxClick = useMemo(
    () => (id, status) => {
      setChecked({ id, status });
      setIsLoading(true);
    },
    []
  );

  useEffect(() => {
    let newCard;
    if (removeChecklist) {
      newCard = { ...activeCard, checklists: [] };
    }

    if (removeChecklist) {
      saveCardChanges(newCard);

      sourceList.cards.splice(sourceList.cards.indexOf(activeCard), 1, newCard);
      board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

      handleBoardUpdate(board, "lists", "removeChecklist");
    }
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
  ]);

  useEffect(() => {
    let newCard;
    if (checked) {
      newCard = {
        ...activeCard,
        checklists: activeCard.checklists.map((item) =>
          item._id === checked.id
            ? { ...item, status: checked.status }
            : { ...item }
        ),
      };
    }

    if (newCard) {
      saveCardChanges(newCard);

      sourceList.cards.splice(sourceList.cards.indexOf(activeCard), 1, newCard);
      board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

      handleBoardUpdate(board, "lists", "updatedChecklist");
    }

    return () => {
      setChecked(null);
      setIsLoading(false);
    };
  }, [
    activeCard,
    handleBoardUpdate,
    board,
    checked,
    getSourceList,
    sourceId,
    saveCardChanges,
    sourceList,
  ]);

  useEffect(() => {
    if (!done) return emptyFunction();

    const listItem = {
      description,
      name: checklistName,
    };

    const createListItem = async () =>
      await requestNewChecklistItem(
        {
          listItem,
          cardId: activeCard._id,
          listId: sourceId,
        },
        id
      )
        .then((res) => {
          saveBoardChanges(res.data);

          const updatedList = res.data.lists
            .filter((list) => list._id === sourceId)
            .shift();

          const newCard = updatedList.cards
            .filter((cardItem) => cardItem._id === activeCard._id)
            .shift();

          saveCardChanges(newCard);
        })
        .catch((error) => {});
    createListItem();
    setDone(false);

    return () => {
      resetForm("checklist-item");
      setDone(false);
      setDescription(null);
      setDescription(null);
    };
  }, [
    activeCard,
    checklistName,
    description,
    done,
    id,
    sourceId,
    saveBoardChanges,
    saveCardChanges,
  ]);

  return (
    <CardDetailSegment className="card-checklist">
      <CheckListHeader>
        <div>
          <CardDetailHeader
            description="Checklist"
            icon="check square outline"
          />
        </div>

        <div>
          <Button
            onClick={() => deleteChecklist()}
            size="tiny"
            content="Delete"
            floated="right"
          />
        </div>
      </CheckListHeader>
      <ProgressBar checklistName={checklistName} activeCard={activeCard} />
      {activeCard.checklists.map((item) => (
        <ChecklistItem
          handleCheckboxClick={handleCheckboxClick}
          isChecked={item.status === "done"}
          item={item}
          key={item._id}
          isLoading={isLoading}
        />
      ))}

      {createItem ? (
        <CreateInput
          placeholder="Add an item"
          buttonText="Add"
          close={() => setCreateItem(!createItem)}
          handleChange={handleChange}
          handleCreateClick={handleAddClick}
          id="checklist-item"
        />
      ) : (
        <Button
          content="Add an item"
          compact
          positive
          onClick={() => setCreateItem(!createItem)}
        />
      )}
    </CardDetailSegment>
  );
};

export default CheckLists;
