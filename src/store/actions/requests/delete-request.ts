import { useCollectionsStore } from "../../collections";
import { useRequestTabsStore } from "../../request-tabs/request-tabs.store";
import { useRequestsStore } from "../../requests";

export const deleteRequest = (requestId: string) => {
  useRequestTabsStore.getState().closeAllTabsForRequest(requestId);

  useCollectionsStore.getState().removeRequestNode(requestId);

  useRequestsStore.getState().delete(requestId);
};
