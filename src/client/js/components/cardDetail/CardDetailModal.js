import React, { Suspense, lazy } from "react";

import { Grid } from "semantic-ui-react";

import {
  useCardDetailContext,
  useBoardListContext,
} from "../../utils/hookUtils";

import CardLabels from "./CardLabels";
import CheckLists from "./CheckLists";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import UIWrapper from "../sharedComponents/UIWrapper";
import UIModal from "../sharedComponents/UIModal";

const Attachments = lazy(() => import("./Attachments"));
const CardModalActivities = lazy(() => import("./CardModalActivities"));
const CardModalDescription = lazy(() => import("./CardModalDescription"));
const CardModalSidebar = lazy(() => import("./CardModalSidebar"));
const DueDate = lazy(() => import("./DueDate"));
const ModalHeader = lazy(() => import("./ModalHeader"));
const ModalImageCover = lazy(() => import("./ModalImageCover"));

const CardDetailModal = () => {
  const {
    card,
    hasChecklist,
    hasLabel,
    modalOpen,
    hasDueDate,
  } = useCardDetailContext();

  const { cardClickHandler } = useBoardListContext();

  const CARD_DETAIL_MODAL_STYLE = {
    top: "3%",
    left: "28%",
    bottom: "1%",
    padding: "0px",
    width: "45%",
    border: "none",
  };

  return (
    <UIModal
      isOpen={card && modalOpen}
      onClose={cardClickHandler}
      closeIcon
      modalStyle={CARD_DETAIL_MODAL_STYLE}
    >
      <Suspense fallback={<UILoadingSpinner />}>
        <ModalImageCover />
        <UIWrapper>
          <ModalHeader />
          <Grid columns={2} divided stackable>
            <Grid.Row stretched>
              <Grid.Column width={12}>
                <div>
                  {hasDueDate && <DueDate />}
                  {hasLabel && <CardLabels />}
                  <CardModalDescription />
                  {hasChecklist && <CheckLists />}
                  <Attachments />
                  <CardModalActivities />
                </div>
              </Grid.Column>
              <Grid.Column width={4}>
                <CardModalSidebar />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </UIWrapper>
      </Suspense>
    </UIModal>
  );
};

export default CardDetailModal;
