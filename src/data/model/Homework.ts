export type HomeworkResponse = HomeworkDetail[];

export interface HomeworkDetail {
  homeWorkText: string;
  homeWorkTitle: string;
  contentBase: string;
  documentUrl: string;
  documentExtension: string;
  documentFileSize: string;
  documentType: HomeworkType;
  pageCount: number;
  isLive: boolean;
}

//Homeworks & Assignments Types : 0 = Image, 1 = Video, 2 = Documents & 3 = Links
export const HomeworkType = {
  IMAGE: 0,
  VIDEO: 1,
  DOCUMENT: 2,
  LINK: 3,
};

export type HomeworkType = typeof HomeworkType[keyof typeof HomeworkType];
