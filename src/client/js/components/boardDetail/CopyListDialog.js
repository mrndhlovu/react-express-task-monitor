import React, { useState } from "react";

import CreateInput from "../sharedComponents/CreateInput";
import { requestNewBoardList } from "../../apis/apiRequests";
import { withRouter } from "react-router";

const CopyListDialog = ({
  close,
  getSourceList,
  listPosition,
  saveBoardChanges,
  title,
  match,
}) => {
  const sourceId = listPosition;
  const { id } = match.params;

  const [newListTitle, setListTitle] = useState(`${title} clone`);

  const handleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleCreateClick = () => {
    const listCopy = getSourceList(sourceId - 1);
    delete listCopy._id;
    const updatedClone = { ...listCopy, title: newListTitle };

    const getNewList = async () => {
      await requestNewBoardList(updatedClone, id).then((res) => {
        saveBoardChanges(res.data);
        return close();
      });
    };
    getNewList();
  };

  return (
    <CreateInput
      buttonText="Copy List"
      close={close}
      defaultValue={newListTitle}
      handleChange={handleChange}
      handleCreateClick={handleCreateClick}
    />
  );
};

export default withRouter(CopyListDialog);
