export const LS_API_NAMES = Object.freeze({
  threeNode: "rest-client-three-node",
  remoteCalls: "rest-client-remoteCalls",
});

export type LSApiName = (typeof LS_API_NAMES)[keyof typeof LS_API_NAMES];
