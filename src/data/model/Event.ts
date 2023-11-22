export type EventResponse = Event[];

export interface Event {
  academicYearId: number;
  eventName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  applyType: string;
  eventType: string;
  description: string;
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
