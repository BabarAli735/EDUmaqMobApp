export type FeedbackResponse = FeedbackDetail[];

export interface FeedbackDetail {
  id: number;
  senderId: number;
  branchId: number;
  subject: string;
  message: string;
  status: boolean;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: string;
  deletedBy: number;
  deletedDate: string;
  isDeleted: boolean;
}

export interface FeedbackRequestParams {
  Id?: number;
  Subject?: string;
  Message?: string;
  SenderId?: number;
}
