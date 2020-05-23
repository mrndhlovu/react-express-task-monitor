import React, { useState } from "react";

import { Header, Button } from "semantic-ui-react";

import UIWrapper from "../sharedComponents/UIWrapper";
import BoardContainer from "../../containers/BoardContainer";
import UISmall from "../sharedComponents/UISmall";
import { requestNewBoard } from "../../apis/apiRequests";

const TemplatesPage = ({ templates, history }) => {
  const [openDemo, setOpenDemo] = useState(null);

  const handleUseTemplate = async (template) => {
    delete template._id;
    await requestNewBoard(template).then((res) => {
      if (res.status === 200) history.push(`/boards/id/${res.data._id}`);
    });
  };

  return !openDemo ? (
    <UIWrapper className="template-page">
      <Header content="Templates" className="templates-header" />
      <UIWrapper className="templates-wrap">
        {templates.map((template, index) => {
          template.lists[0] === null && template.lists.splice(0, 1);
          return (
            <UIWrapper className="template-individual" key={index}>
              <img
                className="template-image"
                onClick={() => setOpenDemo(template)}
                src="https://boards-app.s3.eu-west-1.amazonaws.com/landscape-5186058_1920.jpg"
              />
              <span className="template-text">{template.title}</span>
              <small className="template-small">{template.description}</small>
              <Button
                positive
                content="View template"
                floated="left"
                onClick={() => setOpenDemo(template)}
              />
              <UISmall
                handleClick={() => handleUseTemplate(template)}
                className="use-template"
              >
                Category {template.category}: Use Template
              </UISmall>
            </UIWrapper>
          );
        })}
      </UIWrapper>
    </UIWrapper>
  ) : (
    <UIWrapper className="template-container">
      <BoardContainer templateBoard={openDemo} />
      <Button
        compact
        negative
        content="Close Template"
        className="close-template-demo"
        onClick={() => setOpenDemo(null)}
      />
    </UIWrapper>
  );
};

export default TemplatesPage;
