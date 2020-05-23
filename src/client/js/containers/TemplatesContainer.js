import React, { useState, useEffect } from "react";

import { emptyFunction } from "../utils/appUtils";
import { useAlert } from "../utils/hookUtils";
import { requestTemplates } from "../apis/apiRequests";
import TemplatesPage from "../components/home/TemplatesPage";
import { withRouter } from "react-router";

const TemplatesContainer = ({ history }) => {
  const [templates, setTemplates] = useState(null);
  const { notify } = useAlert();

  useEffect(() => {
    if (templates) return emptyFunction();

    const getTemplates = async () => {
      await requestTemplates()
        .then((res) => {
          setTemplates(res.data);
        })
        .catch((error) => {
          notify({ message: error.response.data.message });
        });
    };
    getTemplates();
  }, [templates]);

  return templates && <TemplatesPage templates={templates} history={history} />;
};

export default withRouter(TemplatesContainer);
