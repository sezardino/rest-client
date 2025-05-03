import { LocalApiService } from "./api.local";

export * from "./remote-calls";
export * from "./tree-node";

export const localApi = new LocalApiService();
