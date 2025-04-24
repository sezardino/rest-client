import type { SidebarCollection } from "./requests-sidebar.types";

export const MOCKS_REQUEST_SIDEBAR_COLLECTIONS: SidebarCollection = [
  {
    type: "folder",
    name: "Authentication",
    items: [
      {
        type: "request",
        method: "POST",
        name: "Login",
        url: "/api/auth/login",
      },
      {
        type: "request",
        method: "POST",
        name: "Register",
        url: "/api/auth/register",
      },
      {
        type: "request",
        method: "POST",
        name: "Refresh Token",
        url: "/api/auth/refresh",
      },
    ],
  },
  {
    type: "folder",
    name: "Users",
    items: [
      { type: "request", method: "GET", name: "Get Users", url: "/api/users" },
      {
        type: "request",
        method: "GET",
        name: "Get User by ID",
        url: "/api/users/:id",
      },
      {
        type: "request",
        method: "POST",
        name: "Create User",
        url: "/api/users",
      },
      {
        type: "request",
        method: "PUT",
        name: "Update User",
        url: "/api/users/:id",
      },
      {
        type: "request",
        method: "DELETE",
        name: "Delete User",
        url: "/api/users/:id",
      },
    ],
  },
  { type: "request", method: "GET", name: "Health Check", url: "/api/health" },
  { type: "request", method: "GET", name: "Server Info", url: "/api/info" },
];
