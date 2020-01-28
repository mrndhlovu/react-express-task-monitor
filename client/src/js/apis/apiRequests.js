import axios from "axios";
import { BOARDS_EP } from "../utils/urls";

export const authQueryParams = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const requestNewBoard = board =>
  axios.post(`${BOARDS_EP}/api/create`, board);

export const requestBoardList = () => axios.get(BOARDS_EP);

export const requestBoardDetail = id => axios.get(`${BOARDS_EP}/id/${id}`);

export const requestBoardUpdate = (id, body) =>
  axios.patch(`${BOARDS_EP}/id/${id}/update`, body, authQueryParams);

export const userInfo = () => axios.get(BOARDS_EP);

export const requestCardDetail = () => {};

export const requestCardUpdate = () => {};