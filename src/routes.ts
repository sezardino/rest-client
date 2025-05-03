import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("pages/index.tsx"),
  layout("./layouts/redactor.layout.tsx", [
    ...prefix("redactor", [
      index("pages/redactor/index.tsx"),
      route(":requestId", "pages/redactor/[requestId].tsx"),
    ]),
  ]),
] satisfies RouteConfig;
