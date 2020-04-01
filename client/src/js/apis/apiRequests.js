import axios from "axios";

import { BOARDS_EP, UPLOAD_EP, params, CARDS_EP, AUTH_EP } from "../utils/urls";

export const requestNewBoard = board =>
  axios.post(`${BOARDS_EP}/create`, board, params);

export const requestBoardList = () => axios.get(BOARDS_EP, params);

export const requestBoardDetail = id =>
  axios.get(`${BOARDS_EP}/id/${id}`, params);

export const requestBoardDelete = id =>
  axios.delete(`${BOARDS_EP}/id/${id}`, params);

export const requestBoardUpdate = (id, body) => {
  return axios.patch(`${BOARDS_EP}/id/${id}`, { ...body }, params);
};

export const requestUpload = body =>
  axios.post(`${UPLOAD_EP}/image`, body, params);

export const requestCreateNewCard = (body, id) =>
  axios.patch(`${CARDS_EP}/${id}`, body, params);

export const requestDeleteCard = (body, id) =>
  axios.patch(`${CARDS_EP}/delete/${id}`, { ...body });

export const requestCardCoverUpdate = (body, id) =>
  axios.patch(`${CARDS_EP}/cover/${id}`, { ...body }, params);

export const requestDeleteAttachment = (body, id) =>
  axios.patch(`${CARDS_EP}/delete-attachment/${id}`, { ...body });

export const requestAuthSignup = body =>
  axios.post(`${AUTH_EP}/signup`, body, { withCredentials: true });

export const requestAuthLogin = body =>
  axios.post(`${AUTH_EP}/login`, body, params);

export const requestAuthLogout = () =>
  axios.post(`${AUTH_EP}/logoutAll`, null, params);

export const userInfo = () =>
  axios.get(`${AUTH_EP}/users/me`, { withCredentials: true });

export const requestUserUpdate = body =>
  axios.patch(`${AUTH_EP}/update`, body, params);

export const requestUserInvite = (id, email) =>
  axios.patch(`${BOARDS_EP}/id/${id}/invite`, { email }, params);

export const requestNewChecklistItem = (body, id) =>
  axios.patch(`${CARDS_EP}/${id}/list-item`, body, params);
