import React, { useState, useEffect } from "react";

import { Header, Button } from "semantic-ui-react";

import { useMainContext } from "../../utils/hookUtils";
import BoardContainer from "../../containers/BoardContainer";
import UISmall from "../sharedComponents/UISmall";
import UIWrapper from "../sharedComponents/UIWrapper";

const TemplatesPage = ({ templates, handleUseTemplate }) => {
  const [template, setTemplate] = useState(null);

  const { navDataHandler } = useMainContext();

  useEffect(() => {
    if (!template) navDataHandler({ image: "", color: "" });
  }, [template]);

  return !template ? (
    <UIWrapper className="template-page">
      <Header content="Templates" className="templates-header" />
      <UIWrapper className="templates-wrap">
        {templates.map((item, index) => {
          item.lists[0] === null && item.lists.splice(0, 1);
          return (
            <UIWrapper className="template-individual" key={index}>
              <img
                className="template-image"
                onClick={() => setTemplate(item)}
                src={item.styleProperties.image}
              />
              <span className="template-text">{item.title}</span>
              <small className="template-small">{item.description}</small>
              <Button
                positive
                content="View template"
                floated="left"
                onClick={() => setTemplate(item)}
              />
              <UISmall
                handleClick={() => handleUseTemplate(item)}
                className="use-template"
              >
                Category {item.category}: Use Template
              </UISmall>
            </UIWrapper>
          );
        })}
      </UIWrapper>
    </UIWrapper>
  ) : (
    <UIWrapper className="template-container">
      <BoardContainer templateBoard={template} />
      <Button
        compact
        content="Close Template"
        className="close-template-demo"
        onClick={() => setTemplate(null)}
      />
    </UIWrapper>
  );
};

export default TemplatesPage;
