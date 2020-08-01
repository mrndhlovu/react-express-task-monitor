import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import { requestTemplates, requestNewBoard } from "../apis/apiRequests";
import { useMainContext } from "../utils/hookUtils";
import TemplatesPage from "../components/home/TemplatesPage";

const TemplatesContainer = ({ history }) => {
  const [templates, setTemplates] = useState(null);
  const { alertUser } = useMainContext();

  const handleUseTemplate = async (board) => {
    delete board._id;
    board = { ...board, isTemplate: false };

    await requestNewBoard(board).then((res) => {
      if (res.status === 200) history.push(`/boards/id/${res.data._id}`);
    });
  };

  useEffect(() => {
    const getTemplates = async () => {
      await requestTemplates()
        .then((res) => setTemplates(res.data))
        .catch((error) => alertUser(error.response.data.message));
    };
    getTemplates();
    return setTemplates(null);
  }, [alertUser]);

  return (
    templates && (
      <TemplatesPage
        handleUseTemplate={handleUseTemplate}
        templates={templates}
      />
    )
  );
};

TemplatesContainer.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

export default withRouter(TemplatesContainer);
