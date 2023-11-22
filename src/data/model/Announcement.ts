export enum AnnouncementStatus {
  SEEN = 'Seen',
  UNSEEN = 'Unseen',
  TOTAL = 'Total',
}
export interface AnnouncementResponse {
  totalCount: number;
  seenCount: number;
  unSeenCount: number;
  events: Announcement[];
}

export interface Announcement {
  id: number;
  eventName: string;
  startDate: string;
  eventType: string;
  description: string;
  isSeen: boolean;
}
