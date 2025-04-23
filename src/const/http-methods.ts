export const HTTP_METHODS = Object.freeze({
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
});

export type HTTPMethod = keyof typeof HTTP_METHODS;
