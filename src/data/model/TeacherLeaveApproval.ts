

export type TeacherLeaveApproval = LeaveApproval[];

export interface LeaveApproval {
  id: number;
  batchId: number;
  batchName: string;
  classId: number;
  className: string;
  studentName: string;
  fromDate: string;
  requiredDays: string;
  reason: string;
  source: string;
  leaveStatus: string;
}
