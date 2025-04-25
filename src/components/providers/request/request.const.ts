import type { RequestData, ResponseData } from "./request.types";

export const REQUEST_CONTEXT_DEFAULT_REQUEST: RequestData = {
  method: "GET",
  url: "",
  params: [],
  headers: [],
  body: {
    contentType: "json",
    content: "",
  },
  auth: {
    type: "none",
    data: {},
  },
  cookies: [],
};

export const REQUEST_CONTEXT_DEFAULT_RESPONSE: ResponseData = {
  status: 200,
  statusText: "OK",
  time: 132,
  size: "3.4 KB",
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-cache",
    pragma: "no-cache",
    expires: "-1",
    server: "Microsoft-IIS/10.0",
    "x-powered-by": "ASP.NET",
    date: "Wed, 24 Apr 2024 11:02:09 GMT",
    connection: "keep-alive",
    "keep-alive": "timeout=60",
    vary: "Accept-Encoding",
  },
  cookies: {
    "session-id": "12345abcde",
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user-preferences": "theme=dark; sidebar=expanded",
  },
  timeline: [
    { name: "Socket Open", time: 12 },
    { name: "DNS Lookup", time: 25 },
    { name: "SSL Handshake", time: 48 },
    { name: "Request Sent", time: 52 },
    { name: "Waiting (TTFB)", time: 120 },
    { name: "Content Download", time: 132 },
  ],
  body: `{
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "admin",
        lastLogin: "2024-04-23T15:32:10Z",
        settings: {
          notifications: true,
          twoFactorAuth: true,
          theme: "dark",
        },
        permissions: ["read", "write", "delete", "admin"],
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "editor",
        lastLogin: "2024-04-22T09:15:43Z",
        settings: {
          notifications: true,
          twoFactorAuth: false,
          theme: "light",
        },
        permissions: ["read", "write"],
      },
      {
        id: 3,
        name: "Robert Johnson",
        email: "robert.johnson@example.com",
        role: "viewer",
        lastLogin: "2024-04-20T11:22:33Z",
        settings: {
          notifications: false,
          twoFactorAuth: false,
          theme: "system",
        },
        permissions: ["read"],
      },
    ],
    pagination: {
      total: 42,
      page: 1,
      perPage: 3,
      totalPages: 14,
    },
    meta: {
      requestId: "req_7f8e9d6c5b4a3",
      timestamp: "2024-04-24T11:02:09.123Z",
      apiVersion: "v2.1.0",
    },
  }`,
};
