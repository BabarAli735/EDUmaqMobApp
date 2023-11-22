export type ClassClassworkResponse = ClassClassworkDetail[];

export interface ClassClassworkDetail {
  id: number;
  batchIds: string;
  batchName: string;
  classId: string;
  streamId: string;
  subjectId: string;
  className: string;
  streamName: string;
  subjectName: string;
  classWorkText: string;
  classWorkTitle: string;
  classWorkDate: string;
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