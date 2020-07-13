import React, { useState } from "react";

import { useBoardContext } from "../../utils/hookUtils";
import CreateInput from "../sharedComponents/CreateInput";

const CopyListDialog = ({ close, listId, title }) => {
  const { getSourceList, createListHandler } = useBoardContext();

  const [newListTitle, setListTitle] = useState(`${title} clone`);

  const handleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleCreateClick = () => {
    const listClone = { ...getSourceList(listId) };
    delete listClone._id;
    createListHandler({ ...listClone, title: newListTitle }, () => close());
  };

  return (
    <CreateInput
      buttonText="Copy List"
      close={close}
      defaultValue={newListTitle}
      handleChange={handleChange}
      handleCreateClick={handleCreateClick}
      id="create-item-form"
    />
  );
};

export default CopyListDialog;
