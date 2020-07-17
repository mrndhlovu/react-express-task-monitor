import React, { useState, Suspense, lazy } from "react";
import styled from "styled-components";

import { BoardListsContext } from "../../utils/contextUtils";

import { useBoardContext } from "../../utils/hookUtils";
import CreateItemForm from "../sharedComponents/CreateItemForm";
import ListGrid from "./ListGrid";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const CardDetailContainer = lazy(() =>
  import("../../containers/CardDetailContainer")
);

const StyledListContainer = styled.div`
  display: flex;
  vertical-align: top;
  overflow-x: auto;
  overflow-y: hidden;
`;

const BoardLists = () => {
  const { board, createListHandler, history } = useBoardContext();

  const [activeCard, setActiveCard] = useState(false);
  const [activeList, setActiveList] = useState("");
  const [hideCardDetail, setHideCardDetail] = useState(true);
  const [newListName, setNewListName] = useState("");
  const [showInputField, setShowInputField] = useState(false);
  const [sourceId, setSourceId] = useState(undefined);

  const hasLists = board.lists.length !== 0;

  const handleAddList = (event) => setNewListName(event.target.value);

  const handleCardClick = (card, sourceId) => {
    if (sourceId) {
      setActiveCard(card);
      setSourceId(sourceId);
    }
    setHideCardDetail(!hideCardDetail);
  };

  const context = {
    activeCard,
    activeList,
    closeAddCardOption: () => setActiveList(""),
    handleCardClick,
    hideCardDetail,
    setActiveList,
    setSourceId,
  };

  return (
    <BoardListsContext.Provider value={context}>
      <StyledListContainer className="lists-container">
        <ListGrid />

        <CreateItemForm
          buttonText="Create List"
          placeholder="Enter new list title..."
          ctaText={hasLists ? "Add another list" : "Add a list"}
          handleAddList={() => setShowInputField(!showInputField)}
          showInputField={showInputField}
          handleChange={handleAddList}
          handleCreateClick={() => createListHandler({ title: newListName })}
        />

        {!hideCardDetail && (
          <Suspense fallback={<UILoadingSpinner />}>
            <CardDetailContainer
              listId={sourceId}
              history={history}
              modalOpen={!hideCardDetail}
            />
          </Suspense>
        )}
      </StyledListContainer>
    </BoardListsContext.Provider>
  );
};

export default BoardLists;
