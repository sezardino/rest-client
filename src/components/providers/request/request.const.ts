import type { RequestData } from "./request.types";

export const REQUEST_CONTEXT_DEFAULT_REQUEST: RequestData = {
  method: "GET",
  url: "",
  params: [],
  headers: [],
  body: {
    contentType: "json",
    content: "",
  },
  auth: {
    type: "none",
    data: {},
  },
  cookies: [],
};
