import { generateUUID } from "./mocks.utils";

export const MOCKS_IDS_CONSTANTS = {
  LOGIN_REQUEST_ID: generateUUID(),
  REGISTRATION_REQUEST_ID: generateUUID(),
  REFRESH_TOKENS_REQUEST_ID: generateUUID(),
  GET_USER_REQUEST_ID: generateUUID(),
  GET_USERS_REQUEST_ID: generateUUID(),
  CREATE_USER_REQUEST_ID: generateUUID(),
  UPDATE_USER_REQUEST_ID: generateUUID(),
  DELETE_USER_REQUEST_ID: generateUUID(),
  HEALTH_CHECK_REQUEST_ID: generateUUID(),
  SERVER_INFO_REQUEST_ID: generateUUID(),

  AUTHENTICATION_NODE_ID: generateUUID(),
  USERS_NODE_ID: generateUUID(),
  HEALTH_NODE_ID: generateUUID(),
  SERVER_INFO_NODE_ID: generateUUID(),
  LOGIN_NODE_ID: generateUUID(),
  REGISTRATION_NODE_ID: generateUUID(),
  REFRESH_TOKENS_NODE_ID: generateUUID(),
  GET_USER_NODE_ID: generateUUID(),
  GET_USERS_NODE_ID: generateUUID(),
  CREATE_USER_NODE_ID: generateUUID(),
  UPDATE_USER_NODE_ID: generateUUID(),
  DELETE_USER_NODE_ID: generateUUID(),
};
