import { createContext } from "react";
import type { RequestContextType } from "./request.types";

export const RequestContext = createContext<RequestContextType | undefined>(
  undefined
);
