import React from "react";
import styled from "styled-components";

import { checkStringEquality } from "../../utils/appUtils";
import { Dropdown, Header } from "semantic-ui-react";
import UIContainer from "./UIContainer";

const Span = styled.span`
  font-size: ${(props) => props.size};
`;

const displayStyle = {
  background: "#f5f6f7",
  margin: "5px",
};

const DropdownList = ({
  list = [],
  header,
  position,
  title,
  handleSelection,
  hasList,
  hasCards,
  current,
}) => {
  const isBoardsDropdown = checkStringEquality(header, "Board");
  const isListDropdown = checkStringEquality(header, "List");
  const isPositionDropdown = checkStringEquality(header, "Position");

  return (
    <UIContainer
      width={isBoardsDropdown ? "97%" : "150px"}
      display={displayStyle}
    >
      <Header content={header} as="h5" />
      {hasList || isBoardsDropdown ? (
        <Dropdown
          text={title || `${position}`}
          pointing="left"
          icon=""
          className="link item"
        >
          <Dropdown.Menu>
            {list.map((item, index) => (
              <Dropdown.Item
                key={index}
                onClick={() =>
                  handleSelection(
                    item,
                    header,
                    isBoardsDropdown ? 1 : index + 1
                  )
                }
              >
                <Span>
                  {isPositionDropdown ? (
                    <>
                      {hasCards ? index + 1 : "1"}
                      {current === item._id && " (current)"}
                    </>
                  ) : (
                    <>
                      {item.title}{" "}
                      {((isListDropdown && current - 1 === index) ||
                        current === item._id) &&
                        " (current)"}
                    </>
                  )}
                </Span>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : isListDropdown ? (
        "No Lists"
      ) : (
        "N/A"
      )}
    </UIContainer>
  );
};

export default DropdownList;
