import { nanoid } from "nanoid";
import { useCollectionsStore } from "../../collections";
import { useRequestTabsStore } from "../../request-tabs/request-tabs.store";
import { useRequestsStore } from "../../requests";

export function createRequest(name: string, parentFolderId: string | null) {
  const requestId = nanoid();

  useRequestsStore.getState().create({
    id: requestId,
    name,
    method: "GET",
    url: "",
    headers: {},
    body: "",
  });

  useCollectionsStore
    .getState()
    .addRequestNode(name, requestId, parentFolderId);

  const newTabId = useRequestTabsStore.getState().create(requestId);
  useRequestTabsStore.getState().create(newTabId);
  useRequestTabsStore.getState().setActiveTab(newTabId);
}
