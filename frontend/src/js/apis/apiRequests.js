import axios from "axios";

import { AUTH_EP, BOARDS_EP, CARDS_EP, PARAMS, UPLOAD_EP } from "../utils/urls";

const axiosInstance = axios.create({ ...PARAMS });

export const requestNewBoard = (board) =>
  axiosInstance.post(`${BOARDS_EP}/create-board`, board);

export const requestNewBoardList = (body, id) =>
  axiosInstance.post(`${BOARDS_EP}/${id}/create-list`, body);

export const requestBoardList = () => axiosInstance.get(BOARDS_EP);

export const requestBoardDetail = (id) =>
  axiosInstance.get(`${BOARDS_EP}/id/${id}`);

export const requestBoardDelete = (id) =>
  axiosInstance.delete(`${BOARDS_EP}/${id}/delete-board`);

export const requestBoardUpdate = (id, body) => {
  return axiosInstance.patch(`${BOARDS_EP}/${id}/update-board`, body);
};

export const requestCreateTemplate = (body) =>
  axiosInstance.post(`${BOARDS_EP}/create-template`, body);

export const requestUpload = (type, body, boardId, listId, cardId) =>
  axiosInstance.post(
    `${UPLOAD_EP}/${type}/${boardId}/${listId}/${cardId}/upload`,
    body
  );

export const requestCreateNewCard = (body, id) =>
  axiosInstance.patch(`${CARDS_EP}/${id}/new-card`, body);

export const requestCardUpdate = (body, id) =>
  axiosInstance.patch(`${CARDS_EP}/${id}/update-card`, body);

export const requestAuthSignup = (body) =>
  axiosInstance.post(`${AUTH_EP}/signup`, body);

export const requestAuthLogin = (body, token) =>
  axiosInstance.post(`${AUTH_EP}/login?token=${token}`, body);

export const requestAuthLogout = () =>
  axiosInstance.post(`${AUTH_EP}/logoutAll`);

export const userInfo = () => axiosInstance.get(`${AUTH_EP}/users/me`);

export const requestUserUpdate = (body) =>
  axiosInstance.patch(`${AUTH_EP}/update`, body);

export const requestEmailRecovery = (body) => {
  return axiosInstance.post(`${AUTH_EP}/recovery`, body);
};

export const requestDeleteAccount = () => {
  return axiosInstance.delete(`${AUTH_EP}/delete-account`);
};

export const requestUpdatePassword = (body, token) => {
  return axiosInstance.post(`${AUTH_EP}/${token}/update-password`, body);
};

export const requestUserInvite = (id, email) =>
  axiosInstance.patch(`${BOARDS_EP}/id/${id}/invite`, { email });

export const requestChecklistTask = (body, id) =>
  axiosInstance.post(`${CARDS_EP}/${id}/checklist-task`, body);

export const requestNewChecklist = (body, id) =>
  axiosInstance.patch(`${CARDS_EP}/${id}/create-checklist`, body);

export const requestCreateComment = (body, id) =>
  axiosInstance.patch(`${CARDS_EP}/${id}/comment`, body);

export const requestBoardMembers = (id) =>
  axiosInstance.get(`${BOARDS_EP}/id/${id}/members`);

export const requestImages = (query, page, orientation = "landscape") =>
  axiosInstance.get(
    `${BOARDS_EP}/images?query=${query}&page=${page}&orientation=${orientation}`
  );

export const requestTemplates = () =>
  axiosInstance.get(`${BOARDS_EP}/templates`);
