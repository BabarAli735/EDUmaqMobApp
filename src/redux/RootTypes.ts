import {
  AnnouncementAction,
  AttendanceAction,
  AuthAction,
  EventAction,
  FeedbackAction,
  HomeworkAction,
  InstituteAction,
  LearnWithVideoAction,
  LeaveAction,
  MasterAction,
  MobileAction,
  MyCoursesAction,
  NotificationAction,
  RecommendedLessonsAction,
  RehydrateAction,
  SiblingAction,
  SyllabusAction,
  TimeTableAction,
  TrendingChapterAction,
  UiAction,
  ClassHomeworkAction,
  ClassAssignmentAction,
  ClassClassworkAction
} from './actions';
import { AttendanceTeacherAction } from './actions/AttendanceTeacherActions';
import { ClassAttendancePostAction, ClassAttendnaceGetAction } from './actions/ClassAttendanceActions';
import { ExamCategoryAction, ExamClassesAction, ExamEntriesAction, ExamMarksPostAction, ExamPlannersAction, ExamSubjectAction } from './actions/MarksEntryActions';
import { ComplaintListActions, MyStudentActions, SubmitComplaintStudentActions } from './actions/StudentsByTeacherActions';
import { TeacherLeaveApprovalAction } from './actions/TeacherLeaveApprovalActions';
import { TeacherTimeTableAction } from './actions/TeacherTimeTableActions';
import { persistedReducer } from './RootReducer';

/* ------------- State ------------- */
export type RootState = ReturnType<typeof persistedReducer>;
export type RootAction =
  | RehydrateAction
  | AuthAction
  | InstituteAction
  | UiAction
  | AttendanceAction
  | AttendanceTeacherAction
  | EventAction
  | LeaveAction
  | SyllabusAction
  | MasterAction
  | MobileAction
  | SiblingAction
  | TimeTableAction
  | AnnouncementAction
  | HomeworkAction
  | FeedbackAction
  | NotificationAction
  | TeacherTimeTableAction
  | TeacherLeaveApprovalAction
  | ClassHomeworkAction
  | ClassAssignmentAction
  | ClassClassworkAction
  | TrendingChapterAction
  | LearnWithVideoAction
  | MyCoursesAction
  | RecommendedLessonsAction
  | MyStudentActions
  | SubmitComplaintStudentActions
  | ComplaintListActions
  | ExamEntriesAction
  | ExamMarksPostAction
  | ExamCategoryAction
  | ExamPlannersAction
  | ExamClassesAction
  | ExamSubjectAction
  | ClassAttendancePostAction
  | ClassAttendnaceGetAction;

/* ------------- Other ------------- */
export interface WithCallbacks {
  onSuccess?: () => void;
  onError?: () => void;
}
