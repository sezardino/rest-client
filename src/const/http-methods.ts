export const HTTP_METHODS = Object.freeze({
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
});

export const HTTP_METHODS_LIST = Object.values(HTTP_METHODS);

export type HTTPMethod = keyof typeof HTTP_METHODS;
