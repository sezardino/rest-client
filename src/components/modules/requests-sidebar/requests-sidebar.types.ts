import type { HTTPMethod } from "@/const/http-methods";

export type RequestItem = {
  type: "request";
  method: HTTPMethod;
  name: string;
  url: string;
};

export type FolderItem = {
  type: "folder";
  name: string;
  items: RequestItem[];
};

export type SidebarItem = RequestItem | FolderItem;

export type SidebarCollection = SidebarItem[];
