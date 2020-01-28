import React from "react";

import { Button, Card, Input } from "semantic-ui-react";

const CreateBoard = ({
  handleCreateClick,
  handleChange,
  buttonText,
  fluid,
  placeholder
}) => {
  return (
    <Card fluid={fluid}>
      <Card.Content>
        <Input
          fluid
          focus
          placeholder={placeholder}
          onChange={e => handleChange(e)}
        />
      </Card.Content>
      <Card.Content extra>
        <Button
          color="green"
          size="tiny"
          content={buttonText}
          onClick={() => handleCreateClick()}
          floated="right"
        />
      </Card.Content>
    </Card>
  );
};

export default CreateBoard;
