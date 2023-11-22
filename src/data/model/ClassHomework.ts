export type ClassHomeworkResponse = ClassHomeworkDetail[];

export interface ClassHomeworkDetail {
  id: number;
  batchIds: string;
  batchName: string;
  classId: string;
  streamId: string;
  subjectId: string;
  className: string;
  streamName: string;
  subjectName: string;
  homeWorkText: string;
  homeWorkTitle: string;
  homeWorkDate: string;
  createdDate: string;
  divisions: string;
  teacherId: string;
  uploadFileName: string;
  contentBase: string;
  documentUrl: string;
  documentExtension: string;
  documentFileSize: string;
  documentType: ClassHomeworkType;
  status: string;
}

//Homeworks & Assignments Types : 0 = Image, 1 = Video, 2 = Documents & 3 = Links
export const ClassHomeworkType = {
  IMAGE: 0,
  VIDEO: 1,
  DOCUMENT: 2,
  LINK: 3,
};

export type ClassHomeworkType = (typeof ClassHomeworkType)[keyof typeof ClassHomeworkType];
