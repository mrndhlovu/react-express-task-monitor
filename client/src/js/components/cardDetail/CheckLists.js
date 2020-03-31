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
  listPosition,
  checklistName = "Checklist",
  getSourceList,
  board,
  backendUpdate
}) => {
  const [card, setCard] = useState(activeCard);
  const [checked, setChecked] = useState(null);
  const [createItem, setCreateItem] = useState(false);
  const [description, setDescription] = useState(null);
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [removeChecklist, setRemoveChecklist] = useState(false);

  const { id } = match.params;
  const sourceList = getSourceList(listPosition).shift();

  const deleteChecklist = () => setRemoveChecklist(true);
  const handleChange = e => setDescription(e.target.value);
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
      newCard = { ...card, checklists: [] };
    }

    if (removeChecklist) {
      setCard(newCard);

      sourceList.cards.splice(sourceList.cards.indexOf(card), 1, newCard);
      board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

      backendUpdate(board, "lists", "removeChecklist");
    }
    return () => {
      setRemoveChecklist(false);
    };
  }, [removeChecklist, backendUpdate, board, card, sourceList, checked]);

  useEffect(() => {
    let newCard;
    if (checked) {
      newCard = {
        ...card,
        checklists: card.checklists.map(item =>
          item._id === checked.id
            ? { ...item, status: checked.status }
            : { ...item }
        )
      };
    }

    if (newCard) {
      setCard(newCard);

      sourceList.cards.splice(sourceList.cards.indexOf(card), 1, newCard);
      board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

      backendUpdate(board, "lists", "updatedChecklist");
    }

    return () => {
      setChecked(null);
      setIsLoading(false);
    };
  }, [
    checked,
    card,
    board,
    backendUpdate,
    getSourceList,
    listPosition,
    sourceList
  ]);

  useEffect(() => {
    if (!done) return emptyFunction();

    const listItem = {
      description,
      name: checklistName
    };

    const createListItem = async () =>
      await requestNewChecklistItem(
        {
          listItem,
          cardId: card.position,
          listId: listPosition
        },
        id
      )
        .then(res => {
          saveBoardChanges(res.data);

          const updatedList = res.data.lists
            .filter(list => list.position === listPosition)
            .shift();

          const newCard = updatedList.cards
            .filter(cardItem => cardItem._id === card._id)
            .shift();

          setCard(newCard);
        })
        .catch(error => {});
    createListItem();
    setDone(false);

    return () => {
      resetForm("checklist-item");
      setDone(false);
      setDescription(null);
      setDescription(null);
    };
  }, [
    card,
    checklistName,
    description,
    done,
    id,
    listPosition,
    saveBoardChanges
  ]);

  return (
    <CardDetailSegment>
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
      <ProgressBar checklistName={checklistName} card={card} />
      {card.checklists.map(item => (
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
