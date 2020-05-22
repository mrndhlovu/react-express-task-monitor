import axios from "axios";

import {
  AUTH_EP,
  BOARDS_EP,
  CARDS_EP,
  IMAGES_EP,
  params,
  UPLOAD_EP,
} from "../utils/urls";

export const requestNewBoard = (board) =>
  axios.post(`${BOARDS_EP}/create-board`, board, params);

export const requestNewBoardList = (body, id) =>
  axios.post(`${BOARDS_EP}/${id}/create-list`, body, params);

export const requestBoardList = () => axios.get(BOARDS_EP, params);

export const requestBoardDetail = (id) =>
  axios.get(`${BOARDS_EP}/id/${id}`, params);

export const requestBoardDelete = (id) =>
  axios.delete(`${BOARDS_EP}/${id}/delete-board`, params);

export const requestBoardUpdate = (id, body) => {
  return axios.patch(`${BOARDS_EP}/${id}/update-board`, { ...body }, params);
};

export const requestUpload = (type, body, boardId, listId, cardId) =>
  axios.post(
    `${UPLOAD_EP}/${type}/${boardId}/${listId}/${cardId}/upload`,
    body,
    params
  );

export const requestCreateNewCard = (body, id) =>
  axios.patch(`${CARDS_EP}/${id}/new-card`, body, params);

export const requestCardUpdate = (body, id) =>
  axios.patch(`${CARDS_EP}/${id}/update-card`, body, params);

export const requestAuthSignup = (body) =>
  axios.post(`${AUTH_EP}/signup`, body, { withCredentials: true });

export const requestAuthLogin = (body) =>
  axios.post(`${AUTH_EP}/login`, body, params);

export const requestAuthLogout = () =>
  axios.post(`${AUTH_EP}/logoutAll`, null, params);

export const userInfo = () =>
  axios.get(`${AUTH_EP}/users/me`, { withCredentials: true });

export const requestUserUpdate = (body) =>
  axios.patch(`${AUTH_EP}/update`, body, params);

export const requestEmailRecovery = (body) => {
  return axios.post(`${AUTH_EP}/recovery`, body, params);
};

export const requestDeleteAccount = () => {
  return axios.delete(`${AUTH_EP}/delete-account`, null, params);
};

export const requestUpdatePassword = (body, token) => {
  return axios.post(`${AUTH_EP}/${token}/update-password`, body);
};

export const requestUserInvite = (id, email) =>
  axios.patch(`${BOARDS_EP}/id/${id}/invite`, { email }, params);

export const requestChecklistTask = (body, id) =>
  axios.post(`${CARDS_EP}/${id}/checklist-task`, body, params);

export const requestNewChecklist = (body, id) =>
  axios.patch(`${CARDS_EP}/${id}/create-checklist`, body, params);

export const requestCreateComment = (body, id) =>
  axios.patch(`${CARDS_EP}/${id}/comment`, body, params);

export const requestBoardMembers = (id) =>
  axios.get(`${BOARDS_EP}/id/${id}/members`, params);

export const requestImages = (query) =>
  axios.get(`${IMAGES_EP}&q=${query}&image_type=photo`);
