import type { RemoteCall } from "@/api/api.entity";
import { HTTP_METHODS } from "@/const/http-methods";
import { MOCKS_IDS_CONSTANTS } from "./mocks.const";

export const MOCK_LOCAL_REMOTE_CALLS: RemoteCall[] = [
  {
    id: MOCKS_IDS_CONSTANTS.LOGIN_REQUEST_ID,
    method: HTTP_METHODS.POST,
    url: "https://api.example.com/auth/login",
    threeNodeId: MOCKS_IDS_CONSTANTS.LOGIN_NODE_ID,
  },
  {
    id: MOCKS_IDS_CONSTANTS.REGISTRATION_REQUEST_ID,
    method: HTTP_METHODS.POST,
    url: "https://api.example.com/auth/registration",
    threeNodeId: MOCKS_IDS_CONSTANTS.REGISTRATION_NODE_ID,
  },
  {
    id: MOCKS_IDS_CONSTANTS.REFRESH_TOKENS_REQUEST_ID,
    method: HTTP_METHODS.POST,
    url: "https://api.example.com/auth/refresh",
    threeNodeId: MOCKS_IDS_CONSTANTS.REFRESH_TOKENS_NODE_ID,
  },
  {
    id: MOCKS_IDS_CONSTANTS.GET_USER_REQUEST_ID,
    method: HTTP_METHODS.GET,
    url: "https://api.example.com/users/{id}",
    threeNodeId: MOCKS_IDS_CONSTANTS.GET_USER_NODE_ID,
  },
  {
    id: MOCKS_IDS_CONSTANTS.GET_USERS_REQUEST_ID,
    method: HTTP_METHODS.GET,
    url: "https://api.example.com/users",
    threeNodeId: MOCKS_IDS_CONSTANTS.GET_USERS_NODE_ID,
  },
  {
    id: MOCKS_IDS_CONSTANTS.CREATE_USER_REQUEST_ID,
    method: HTTP_METHODS.POST,
    url: "https://api.example.com/users",
    threeNodeId: MOCKS_IDS_CONSTANTS.CREATE_USER_NODE_ID,
  },
  {
    id: MOCKS_IDS_CONSTANTS.UPDATE_USER_REQUEST_ID,
    method: HTTP_METHODS.PUT,
    url: "https://api.example.com/users/{id}",
    threeNodeId: MOCKS_IDS_CONSTANTS.UPDATE_USER_NODE_ID,
  },
  {
    id: MOCKS_IDS_CONSTANTS.DELETE_USER_REQUEST_ID,
    method: HTTP_METHODS.DELETE,
    url: "https://api.example.com/users/{id}",
    threeNodeId: MOCKS_IDS_CONSTANTS.DELETE_USER_NODE_ID,
  },
  {
    id: MOCKS_IDS_CONSTANTS.HEALTH_CHECK_REQUEST_ID,
    method: HTTP_METHODS.GET,
    url: "https://api.example.com/health",
    threeNodeId: MOCKS_IDS_CONSTANTS.HEALTH_NODE_ID,
  },
  {
    id: MOCKS_IDS_CONSTANTS.SERVER_INFO_REQUEST_ID,
    method: HTTP_METHODS.GET,
    url: "https://api.example.com/server-info",
    threeNodeId: MOCKS_IDS_CONSTANTS.SERVER_INFO_NODE_ID,
  },
];
