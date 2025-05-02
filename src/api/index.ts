import { LocalApiService } from "./api.local";

export * from "./remote-calls";
export * from "./three-node";

export const localApi = new LocalApiService();
