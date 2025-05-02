export const BODY_TYPES = Object.freeze({
  JSON: "json",
  TEXT: "text",
});

export const BODY_TYPES_LIST = Object.values(BODY_TYPES);
export type BodyType = (typeof BODY_TYPES)[keyof typeof BODY_TYPES];
