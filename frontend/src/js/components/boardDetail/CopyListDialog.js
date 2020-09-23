import React, { useState } from "react";
import PropTypes from "prop-types";

import { useBoardContext } from "../../utils/hookUtils";
import CreateInput from "../shared/CreateInput";

const CopyListDialog = ({ close, listId, title }) => {
  const { getSourceList, createListHandler } = useBoardContext();

  const [newListTitle, setListTitle] = useState(`${title} clone`);

  const handleChange = (e) => {
    setListTitle(e.target.value);
  };

  const createItemClickHandler = () => {
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
      createItemClickHandler={createItemClickHandler}
      id="create-item-form"
    />
  );
};

CopyListDialog.propTypes = {
  close: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CopyListDialog;
