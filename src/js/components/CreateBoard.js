import React from "react";

import { Button, Card, Input } from "semantic-ui-react";

const CreateBoard = ({ handleCreateBoard, handleAddBoardName }) => {
  return (
    <Card>
      <Card.Content>
        <Input
          fluid
          focus
          placeholder="Enter list title..."
          onChange={e => handleAddBoardName(e)}
        />
      </Card.Content>
      <Card.Content extra>
        <Button
          color="green"
          size="tiny"
          content="Add List"
          onClick={() => handleCreateBoard()}
        />
      </Card.Content>
    </Card>
  );
};

export default CreateBoard;
