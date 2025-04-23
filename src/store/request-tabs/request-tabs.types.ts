export type RequestTab = {
  id: string;
  requestId?: string;
  title: string;
};

export type RequestTabsStoreState = {
  tabs: RequestTab[];
  activeTabId: string | null;

  create: (requestId?: string) => string;
  delete: (tabId: string) => void;
  update: (tabId: RequestTab["id"], payload: Pick<RequestTab, "title">) => void;
  setActiveTab: (tabId: string) => void;
  closeAllTabsForRequest: (requestId: string) => void;
};
