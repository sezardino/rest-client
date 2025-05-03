import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";
import {
  ApplicationUrlParams,
  ApplicationUrlPrefixes,
} from "./const/application-urls";

export default [
  index("pages/index.tsx"),
  layout("./layouts/redactor.layout.tsx", [
    ...prefix(ApplicationUrlPrefixes.redactor, [
      index("pages/redactor/index.tsx"),
      route(
        `${ApplicationUrlParams.requestId}`,
        "pages/redactor/[requestId].tsx"
      ),
    ]),
  ]),
] satisfies RouteConfig;
