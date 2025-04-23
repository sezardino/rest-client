import { useCollectionsStore } from "@/store/collections";
import { useRequestTabsStore } from "@/store/request-tabs/request-tabs.store";
import { useRequestsStore } from "@/store/requests";
import { nanoid } from "nanoid";

export function duplicateRequest(
  originalRequestId: string,
  newName: string,
  targetFolderId: string | null
): string | null {
  const original = useRequestsStore.getState().requests[originalRequestId];
  if (!original) return null;

  const newRequestId = nanoid();
  const copy = { ...original, id: newRequestId };

  useRequestsStore.getState().create(copy);
  useCollectionsStore
    .getState()
    .addRequestNode(newName, newRequestId, targetFolderId);

  useRequestTabsStore.getState().create(newRequestId);
  useRequestTabsStore.getState().setActiveTab(newRequestId);

  return newRequestId;
}
