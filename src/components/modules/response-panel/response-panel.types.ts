export type TimelineEntry = {
  name: string;
  time: number;
};

export type PanelResponse = {
  status: number;
  statusText: string;
  time: number;
  size: string;
  headers: Record<string, string>;
  cookies: Record<string, string>;
  timeline: TimelineEntry[];
  body: any;
};
