

export type TeacherTimeTableResponse = TeacherTimeTable[];

export interface TeacherTimeTable {
  timeTableId: number;
  periodName: string;
  startTime: string;
  endTime: string;
  subjectName: string;
  roomName: string;
  employeeName: string;
  imageURI: string;
}
