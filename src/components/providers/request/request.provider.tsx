import { useState, type PropsWithChildren } from "react";
import { REQUEST_CONTEXT_DEFAULT_REQUEST } from "./request.const";
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

    // Simulate a request
    setTimeout(() => {
      const mockResponse: ResponseData = {
        status: 200,
        statusText: "OK",
        time: 123,
        size: "1.2 KB",
        headers: {
          "content-type": "application/json",
          server: "nginx",
        },
        body: JSON.stringify(
          {
            message: "Success",
            data: { id: 1, name: "Example" },
          },
          null,
          2
        ),
        cookies: {
          session: "example-session-cookie",
        },
        timeline: [
          { name: "Socket Open", time: 10 },
          { name: "DNS Lookup", time: 15 },
          { name: "SSL Handshake", time: 20 },
          { name: "Request Sent", time: 30 },
          { name: "Waiting (TTFB)", time: 80 },
          { name: "Content Download", time: 123 },
        ],
      };

      setResponse(mockResponse);
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
