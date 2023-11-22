import { Event } from '../../components';

export interface AttendanceResponse {
  presentDays?: number;
  absentDays?: number;
  holidayDays?: number;
  leaveDays?: number;
  totalDays?: number;
  monthlyAttendances?: Attendance[];
  events?: Event[];
}
export interface AttendanceTeacherResponse {
  presentDays?: number;
  absentDays?: number;
  holidayDays?: number;
  leaveDays?: number;
  totalDays?: number;
  monthlyAttendances?: Attendance[];
  events?: Event[];
}
export interface Attendance {
  currentDate: string;
  currentDateType: AttendanceType;
}

export enum AttendanceType {
  HOLIDAY = 'Holiday',
  PRESENT = 'Present',
  ABSENT = 'Absent',
  LEAVE = 'Leave',
}
