export type NotificationResponse = Notification[];

export interface Notification {
  title: string;
  message: string;
  activityStatus: string;
  isViewed: boolean;
  isCompleted: boolean;
  notifierId: number;
  id: number;
  branchId: number;
  status: boolean;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: number;
}
