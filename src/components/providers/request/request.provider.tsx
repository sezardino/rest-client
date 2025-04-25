import { useState, type PropsWithChildren } from "react";
import {
  REQUEST_CONTEXT_DEFAULT_REQUEST,
  REQUEST_CONTEXT_DEFAULT_RESPONSE,
} from "./request.const";
import { RequestContext } from "./request.context";
import type { RequestData, ResponseData } from "./request.types";

export const RequestProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [request, setRequest] = useState<RequestData>(
    REQUEST_CONTEXT_DEFAULT_REQUEST
  );
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setResponse(REQUEST_CONTEXT_DEFAULT_RESPONSE);
      setIsLoading(false);
    }, 800);
  };

  return (
    <RequestContext.Provider
      value={{
        request,
        setRequest,
        response,
        setResponse,
        isLoading,
        setIsLoading,
        sendRequest,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};
