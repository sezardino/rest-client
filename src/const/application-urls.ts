export const ApplicationUrlPrefixes = Object.freeze({
  redactor: "redactor",
});

export const ApplicationUrlParams = Object.freeze({
  requestId: ":requestId",
});

export const ApplicationUrls = Object.freeze({
  home: "/",
  redactor: {
    index: `/${ApplicationUrlPrefixes.redactor}`,
    request: (requestId: string = ApplicationUrlParams.requestId) =>
      `/${ApplicationUrlPrefixes.redactor}/${requestId}`,
  },
});
