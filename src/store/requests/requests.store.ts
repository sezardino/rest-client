import { create } from "zustand";
import type {
  RequestConfiguration,
  RequestsStoreState,
} from "./requests.types";

export const useRequestsStore = create<RequestsStoreState>((set, get) => ({
  requests: {},

  get: (id) => get().requests[id],

  create: (dto) => {
    const now = new Date().toISOString();
    const newRequest: RequestConfiguration = {
      ...dto,
      createdAt: now,
      updatedAt: now,
    };

    set((state) => ({
      requests: { ...state.requests, [dto.id]: newRequest },
    }));
  },

  update: (id, patch) => {
    set((state) => {
      const prev = state.requests[id];
      if (!prev) return state;
      return {
        requests: {
          ...state.requests,
          [id]: { ...prev, ...patch, updatedAt: new Date().toISOString() },
        },
      };
    });
  },

  delete: (id) => {
    set((state) => {
      const { [id]: _, ...rest } = state.requests;
      return { requests: rest };
    });
  },
}));
