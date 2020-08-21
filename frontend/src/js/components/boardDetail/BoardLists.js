import React, { useState, Suspense, lazy } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { BoardListsContext } from "../../utils/contextUtils";

import { useBoardContext } from "../../utils/hookUtils";
import CreateItemForm from "../sharedComponents/CreateItemForm";
import Lists from "./Lists";
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

  const [activeCard, setActiveCard] = useState(undefined);
  const [activeListId, setActiveListId] = useState("");
  const [hideCardDetail, setHideCardDetail] = useState(true);
  const [newListName, setNewListName] = useState("");
  const [showInputField, setShowInputField] = useState(false);
  const [sourceId, setSourceId] = useState(undefined);

  const hasLists = board.lists.length !== 0;

  const handleAddList = (event) => setNewListName(event.target.value);

  const cardClickHandler = (card, sourceId) => {
    if (sourceId) {
      setActiveCard(card);
      setSourceId(sourceId);
    }
    setHideCardDetail(!hideCardDetail);
  };

  const context = {
    activeCard,
    activeListId,
    closeAddCardOption: () => setActiveListId(""),
    cardClickHandler,
    hideCardDetail,
    setActiveListId,
    setSourceId,
  };

  return (
    <BoardListsContext.Provider value={context}>
      <StyledListContainer className="lists-container">
        <Lists />

        <CreateItemForm
          buttonText="Create List"
          placeholder="Enter new list title..."
          ctaText={hasLists ? "Add another list" : "Add a list"}
          handleAddList={() => setShowInputField(!showInputField)}
          showInputField={showInputField}
          handleChange={handleAddList}
          createItemClickHandler={() =>
            createListHandler({ title: newListName })
          }
        />
      </StyledListContainer>

      {!hideCardDetail && (
        <Suspense fallback={<UILoadingSpinner />}>
          <CardDetailContainer
            listId={sourceId}
            history={history}
            modalOpen={!hideCardDetail}
          />
        </Suspense>
      )}
    </BoardListsContext.Provider>
  );
};

BoardLists.propTypes = {
  context: PropTypes.shape({
    activeCard: PropTypes.object,
    activeListId: PropTypes.string,
    closeAddCardOption: PropTypes.func.isRequired,
    cardClickHandler: PropTypes.func.isRequired,
    hideCardDetail: PropTypes.bool.isRequired,
    setActiveListId: PropTypes.func.isRequired,
    setSourceId: PropTypes.func.isRequired,
  }),
};

export default BoardLists;
