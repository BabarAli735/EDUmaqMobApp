export type SyllabusResponse = Syllabus[];

export interface Syllabus {
  termName: string;
  termPeriod: string;
  chapters: number;
  duration: string;
  subjects: Subject[];
}

export interface Subject {
  subjectName: string;
  subjectCode: string;
  chapterName: string;
  description: string;
  fileName?: string;
  fileUrl?: string;
  termId?: number;
}
