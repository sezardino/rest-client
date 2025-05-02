const LOCAL_STORAGE_APP_NAME = "rest-client";

export const LS_API_NAMES = Object.freeze({
  threeNode: `${LOCAL_STORAGE_APP_NAME}-three-node`,
  remoteCalls: `${LOCAL_STORAGE_APP_NAME}-remote-calls`,
});

export type LSApiName = (typeof LS_API_NAMES)[keyof typeof LS_API_NAMES];
