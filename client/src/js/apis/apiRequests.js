import axios from "axios";
import {
  BOARDS_EP,
  UPLOAD_EP,
  getAuthParams,
  CARDS_EP,
  AUTH_EP
} from "../utils/urls";

export const requestNewBoard = board =>
  axios.post(`${BOARDS_EP}/create`, board, getAuthParams());

export const requestBoardList = () => axios.get(BOARDS_EP, getAuthParams());

export const requestBoardDetail = id =>
  axios.get(`${BOARDS_EP}/id/${id}`, getAuthParams());

export const requestBoardDelete = id =>
  axios.delete(`${BOARDS_EP}/id/${id}`, getAuthParams());

export const requestBoardUpdate = (id, body) => {
  return axios.patch(`${BOARDS_EP}/id/${id}`, { ...body }, getAuthParams());
};

export const requestUpload = body =>
  axios.post(`${UPLOAD_EP}/image`, body, getAuthParams());

export const requestCreateNewCard = (body, id) =>
  axios.patch(`${CARDS_EP}/${id}`, body, getAuthParams());

export const requestDeleteCard = (body, id) =>
  axios.patch(`${CARDS_EP}/delete/${id}`, { ...body });

export const requestCardCoverUpdate = (body, id) =>
  axios.patch(`${CARDS_EP}/cover/${id}`, { ...body });

export const requestDeleteAttachment = (body, id) =>
  axios.patch(`${CARDS_EP}/delete-attachment/${id}`, { ...body });

export const requestAuthSignup = body => axios.post(`${AUTH_EP}/signup`, body);

export const requestAuthLogin = body => axios.post(`${AUTH_EP}/login`, body);

export const requestAuthLogout = token =>
  axios.post(`${AUTH_EP}/logout`, null, getAuthParams(token));

export const userInfo = () => axios.get(`${AUTH_EP}/users/me`, getAuthParams());
