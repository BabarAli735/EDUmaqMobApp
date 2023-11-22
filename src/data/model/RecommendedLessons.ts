import { Sessions } from './TrendingChapter';

export interface RecommendedLessonsResponse {
  courseName?: string;
  courseType?: string;
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
