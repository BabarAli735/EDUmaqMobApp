export interface TrendingChapterResponse {
  courseName?: string;
  subjectName?: string;
  topicName?: string;
  topicId?: number;
  description?: string | null;
  teacherId?: number;
  teacherName?: string;
  teacherImage?: string;
  lastCreatedChapter?: string | number | null;
  typeOfClass?: string;
  dateTime?: string;
  sessions?: Sessions[];
}
export interface Sessions {
  sessionId?: string;
  sessionDate?: string;
  meetingLink?: string;
  externalLink?: string;
  uploadedLink?: string;
  sessionStartTime?: string;
  sessionEndTime?: string;
  sessionDuration?: string;
  sessionType?: string;
  sessionStatus?: string;
  teacherName?: string;
  teacherImage?: string;
}
