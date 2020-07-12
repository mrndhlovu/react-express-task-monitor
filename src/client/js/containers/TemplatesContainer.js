import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";

import { emptyFunction } from "../utils/appUtils";
import { requestTemplates } from "../apis/apiRequests";
import { useMainContext } from "../utils/hookUtils";
import TemplatesPage from "../components/home/TemplatesPage";

const TemplatesContainer = ({ history }) => {
  const [templates, setTemplates] = useState(null);
  const { alertUser } = useMainContext();

  useEffect(() => {
    if (templates) return emptyFunction();

    const getTemplates = async () => {
      await requestTemplates()
        .then((res) => {
          setTemplates(res.data);
        })
        .catch((error) => alertUser(error.response.data.message));
    };
    getTemplates();
  }, [templates]);

  return templates && <TemplatesPage templates={templates} history={history} />;
};

export default withRouter(TemplatesContainer);
