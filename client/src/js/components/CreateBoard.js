import React from "react";

import { Button, Card, Input } from "semantic-ui-react";

const CreateBoard = ({
  handleCreateClick,
  handleChange,
  buttonText,
  fluid
}) => {
  return (
    <Card fluid={fluid}>
      <Card.Content>
        <Input
          fluid
          focus
          placeholder="Enter list title..."
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
