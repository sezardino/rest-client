import { useContext } from "react";
import { RequestContext } from "./request.context";

export function useRequest() {
  const context = useContext(RequestContext);

  if (context === undefined)
    throw new Error("useRequest must be used within a RequestProvider");

  return context;
}
