import axios from "axios";
import { BOARDS_EP, UPLOAD_EP, authQueryParams, CARDS_EP } from "../utils/urls";

export const requestNewBoard = board =>
  axios.post(`${BOARDS_EP}/api/create`, board);

export const requestBoardList = () => axios.get(BOARDS_EP);

export const requestBoardDetail = id => axios.get(`${BOARDS_EP}/id/${id}`);

export const requestBoardDelete = id => axios.delete(`${BOARDS_EP}/id/${id}`);

export const requestBoardUpdate = (id, body) =>
  axios.patch(`${BOARDS_EP}/id/${id}/update`, body, authQueryParams);

export const requestUpload = body => axios.post(`${UPLOAD_EP}/image`, body);

export const userInfo = () => axios.get(BOARDS_EP);

export const requestCreateNewCard = (body, id) =>
  axios.patch(`${CARDS_EP}/${id}`, body, authQueryParams);

export const requestDeleteCard = (body, id) =>
  axios.patch(`${CARDS_EP}/delete/${id}`, { ...body });
