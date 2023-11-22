export type TimeTableResponse = TimeTable[];

export interface TimeTable {
  timeTableId: number;
  periodName: string;
  startTime: string;
  endTime: string;
  subjectName: string;
  roomName: string;
  employeeName: string;
  imageURI: string;
}


