export type ClassAssignmentResponse = ClassAssignmentDetail[];

export interface ClassAssignmentDetail {
  id: number;
  batchIds: string;
  batchName: string;
  classId: string;
  streamId: string;
  subjectId: string;
  className: string;
  streamName: string;
  subjectName: string;
  assignmentText: string;
  assignmentTitle: string;
  assignmentDate: string;
  assignmentType: string;
  createdDate: string;
  divisions: string;
  teacherId: string;
  uploadFileName: string;
  contentBase: string;
  documentUrl: string;
  uploadFile: string;
  file: string;
  status: string;
}
