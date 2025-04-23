import type { HTTPMethod } from "@/const/http-methods";

export type RequestConfiguration = {
  id: string;
  name: string;
  method: HTTPMethod;
  url: string;
  headers: Record<string, string>;
  body?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateRequestDto = Omit<
  RequestConfiguration,
  "createdAt" | "updatedAt"
>;

export type RequestsStoreState = {
  requests: Record<string, RequestConfiguration>;

  get: (id: string) => RequestConfiguration | undefined;
  create: (dto: CreateRequestDto) => void;
  update: (id: string, patch: Partial<CreateRequestDto>) => void;
  delete: (id: string) => void;
};
