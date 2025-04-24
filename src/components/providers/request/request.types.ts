import type { HTTPMethod } from "@/const/http-methods";

export type RequestData = {
  method: HTTPMethod;
  url: string;
  params: Array<{ key: string; value: string; enabled: boolean }>;
  headers: Array<{ key: string; value: string; enabled: boolean }>;
  body: {
    contentType: "json" | "form-data" | "x-www-form-urlencoded" | "raw";
    content: string;
  };
  auth: {
    type: "none" | "basic" | "bearer" | "oauth2";
    data: Record<string, string>;
  };
  cookies: Array<{ key: string; value: string; enabled: boolean }>;
};

export type ResponseData = {
  status: number;
  statusText: string;
  time: number;
  size: string;
  headers: Record<string, string>;
  body: string;
  cookies: Record<string, string>;
  timeline: Array<{ name: string; time: number }>;
};

export type RequestContextType = {
  request: RequestData;
  setRequest: (request: RequestData) => void;
  response: ResponseData | null;
  setResponse: (response: ResponseData | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  sendRequest: () => void;
};
