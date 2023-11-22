import AsyncStorage from '@react-native-async-storage/async-storage';
import { mapValues } from 'lodash';
import { combineReducers } from 'redux';
import { getStoredState, persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { PersistConfig } from 'redux-persist/es/types';
import { RootAction, RootState } from './RootTypes';
import { LOG_OUT } from './constants';
import {
  AnnouncementReducer,
  AttendanceReducer,
  AuthReducer,
  EventReducer,
  FeedbackReducer,
  HomeworkReducer,
  InstituteReducer,
  LearnWithVideoReducer,
  LeaveReducer,
  MasterReducer,
  MobileReducer,
  MyCoursesReducer,
  NotificationReducer,
  RecommendedLessonsReducer,
  SiblingReducer,
  SyllabusReducer,
  TimeTableReducer,
  TrendingChapterReducer,
  UiReducer,
  ClassHomeworkReducer,
  ClassAssignmentReducer,
  ClassClassworkReducer
} from './reducers';
import { AttendanceTeacherReducer } from './reducers/AttendanceTeacherReducer';
import { TeacherLeaveApprovalReducer } from './reducers/TeacherLeaveApprovalReducer';
import { TeacherTimeTableReducer } from './reducers/TeacherTimeTableReducer';
import {  complaintListReducers,MyStudentsReducer, submitStudentComplaintReducer } from './reducers/StudentsByTecherReducer';
import { ExamClassesReducer, ExamPlannersReducer, ExamSubjectReducer, MarksEntriesReducer, MarksExamReducer, MarksPostReducer } from './reducers/MarksEntryReducer';
import { ClassAttendanceGetReducer, classAttendancePostReducer } from './reducers/ClassAttendnaceReducer';
// import { RootAction, RootState } from './RootTypes';


/* ------------- Type ------------- */
type ReducersKey = keyof typeof reducers | keyof PersistPartial;

/* ------------- Reducers ------------- */
const reducers = {
  ui: UiReducer,
  institute: InstituteReducer,
  auth: AuthReducer,
  attendance: AttendanceReducer,
  attendanceTeacher: AttendanceTeacherReducer,
  event: EventReducer,
  leave: LeaveReducer,
  syllabus: SyllabusReducer,
  master: MasterReducer,
  mobile: MobileReducer,
  siblings: SiblingReducer,
  timeTable: TimeTableReducer,
  teacherTimeTable: TeacherTimeTableReducer,
  teacherLeaveApproval: TeacherLeaveApprovalReducer,
  announcement: AnnouncementReducer,
  homework: HomeworkReducer,
  feedback: FeedbackReducer,
  notification: NotificationReducer,
  trendingChapter: TrendingChapterReducer,
  learnWithVideo: LearnWithVideoReducer,
  myCourses: MyCoursesReducer,
  recommendedLessons: RecommendedLessonsReducer,
  myStudents:MyStudentsReducer,
  submitComplaintStudent:submitStudentComplaintReducer,
  complaintList:complaintListReducers,
  marksEntry:MarksExamReducer,
  examPlanners:ExamPlannersReducer,
  examClasses:ExamClassesReducer,
  examSubjects:ExamSubjectReducer,
  marksEntries:MarksEntriesReducer,
  marksPost:MarksPostReducer,
  classAttendances:ClassAttendanceGetReducer,
  classAttendancePost:classAttendancePostReducer,
  classHomework: ClassHomeworkReducer,
  classAssignment: ClassAssignmentReducer,
  classClasswork: ClassClassworkReducer
};

const combinedReducers = combineReducers(reducers);

/* ------------- Persist Reducer ------------- */
const rootConfig = {
  storage: AsyncStorage,
  version: 2,
  key: 'root',
  whitelist: ['auth'],
  getStoredState: async (persistConfig: PersistConfig<any>) => {
    const storedState: any = await getStoredState(persistConfig);
    const isSamePersistVersion = storedState?._persist?.version === persistConfig?.version;
    return isSamePersistVersion ? storedState : ({} as any);
  },
};

export const persistedReducer = persistReducer(rootConfig, combinedReducers);

const persistReducersAfterLogoutKeys: Partial<ReducersKey>[] = ['_persist'];

const logoutReducer = (inputState: RootState, action: RootAction): RootState => {
  const isLogoutAction = action.type === LOG_OUT;
  if (!isLogoutAction) {
    return inputState;
  }

  const state = mapValues(inputState, (reducer, key: ReducersKey) => {
    const tempPersistReducer = persistReducersAfterLogoutKeys.includes(key);
    return tempPersistReducer ? reducer : undefined;
  });

  return state as unknown as RootState;
};

export const rootReducer = (inputState: RootState, action: RootAction) => {
  const state = logoutReducer(inputState, action);
  return persistedReducer(state, action as any);
};
