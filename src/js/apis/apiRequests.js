import axios from "axios";
import { TEST_EP } from "../utils/urls";

export const authQueryParams = {
  headers: {
    Authorization: ``,
    "Content-Type": "application/json"
  }
};

export const userInfo = () => {
  return axios.get(TEST_EP);
};
