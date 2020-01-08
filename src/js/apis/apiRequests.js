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

export const requestCardDetail = () => {};

export const requestCardUpdate = () => {};

export const requestBoardList = () => {};

export const requestBoardDetail = () => {};

export const requestBoardUpdate = () => {};
