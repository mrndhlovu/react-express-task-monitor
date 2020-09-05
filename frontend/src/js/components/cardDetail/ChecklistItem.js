import React, { memo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Checkbox } from "semantic-ui-react";
import DropdownButton from "../shared/DropdownButton";
import EditableHeader from "../shared/EditableHeader";
import UIButton from "../shared/UIButton";
import UIWrapper from "../shared/UIWrapper";

const TextContainer = styled.div`
  display: flex !important;
  width: 100%;
  position: relative;
  margin-left: 10px;
  cursor: pointer;
`;

const ChecklistItem = ({
  editCheckListTaskHandler,
  handleConvertToCard,
  handleDeleteChecklistItem,
  isCompleted,
  isOverCurrent,
  task,
  position,
  setIsOverCurrent,
}) => {
  return (
    <UIWrapper className="checklist-task-wrap">
      <Checkbox
        id={task._id}
        checked={isCompleted}
        onChange={() =>
          editCheckListTaskHandler(position - 1, isCompleted ? "doing" : "done")
        }
      />
      <TextContainer onMouseEnter={() => setIsOverCurrent(task._id)}>
        <EditableHeader
          field="description"
          fontSize="12px"
          className={isCompleted ? "task-complete" : "task-doing"}
          editItem={task}
          handleEditTitle={(newTask) =>
            editCheckListTaskHandler(position - 1, null, newTask.description)
          }
          sourceId={position - 1}
        />
        {isOverCurrent === task._id && (
          <div className="checklist-edit-button">
            <DropdownButton
              className="checklist-edit-ellipsis"
              labeled={false}
              icon="ellipsis horizontal"
              header="Item Actions"
              width="200px"
            >
              <div className="checklist-task-actions">
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
        )}
      </TextContainer>
    </UIWrapper>
  );
};

ChecklistItem.propTypes = {
  editCheckListTaskHandler: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(ChecklistItem);
