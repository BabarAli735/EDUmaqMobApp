import { SagaIterator } from 'redux-saga';
import { all, takeLatest } from 'redux-saga/effects';
import {
  AFTER_REHYDRATE,
  ANNOUNCEMENTS_REQUEST,
  ATTENDANCE_REQUEST,
  EVENTS_REQUEST,
  FEEDBACKS_REQUEST,
  FEEDBACK_REQUEST,
  HOMEWORKS_REQUEST,
  INSTITUTE_PROFILE_REQUEST,
  LEARN_WITH_VIDEO_REQUEST,
  LEAVES_REQUEST,
  LEAVE_REQUEST,
  LOGIN_MOBILE_REQUEST,
  LOGIN_REQUEST,
  LOG_OUT,
  MASTER_REQUEST,
  MY_COURSE_REQUEST,
  NOTIFICATIONS_REQUEST,
  PROFILE_REQUEST,
  RECOMMENDED_LESSONS_REQUEST,
  REGISTER_INSTITUTE_REQUEST,
  SAVE_INSTITUTE,
  SEND_OTP_REQUEST,
  SIBLINGS_REQUEST,
  SWITCH_SIBLINGS_REQ,
  SYLLABUS_REQUEST,
  TEACHER_PROFILE_REQUEST,
  TIME_TABLE_REQUEST,
  TRENDING_CHAPTER_REQUEST,
  VERIFY_INSTITUTE_REQUEST,
  VERIFY_OTP_REQUEST,
  CLASS_HOMEWORK_GET_REQ,
  CLASS_CLASSWORK_GET_REQ,
  CLASS_ASSIGNMENT_GET_REQ,
} from './constants';
import { ATTENDANCE_TEACHER_REQUEST } from './constants/AttendanceTeacherConstants';
import { TEACHER_LEAVE_APPROVAL_REQUEST } from './constants/TeacherLeaveApprovalConstant';
import { TEACHER_TIME_TABLE_REQUEST } from './constants/TeacherTimeTableConstants';
import {
  afterRehydrateSaga,
  announcementsSaga,
  attendanceSaga,
  eventsSaga,
  feedbackSaga,
  feedbacksSaga,
  homeworksSaga,
  instituteSaga,
  learnWithVideoSaga,
  leaveSaga,
  leavesSaga,
  logOutSaga,
  loginMobileSaga,
  loginSaga,
  masterSaga,
  myCoursesSaga,
  notificationsSaga,
  profileSaga,
  recommendedLessonsSaga,
  registerSaga,
  saveSaga,
  sendOTPSaga,
  siblingsSaga,
  switchSiblingProfile,
  syllabusSaga,
  teacherProfileSaga,
  teacherTimeTablesSaga,
  timeTablesSaga,
  trendingChapterSaga,
  verifyOTPSaga,
  verifySaga,
  classHomeworkSaga,
  classAssignmentSaga,
  classClassworkSaga
} from './sagas';
import { attendanceTeacherSaga } from './sagas/AttendanceTeacherSagas';
import { teacherLeaveApprovalSaga } from './sagas/TeacherLeaveApprovalSagas';
import { COMPLAINT_LIST_REQ, STUDENT_LIST_REQUEST, SUB_STUDENT_COMPLAINT_REQ } from './constants/StudentByTeacherConstant';
import { myComplaintList, myStudentsSaga, submitStudentComplaintSaga } from './sagas/StudentsByTeacherSagas';
import { CLASS_ATTENDANCE_GET_REQ, CLASS_ATTENDANCE_POST_REQ, EXM_CATEGORY_REQUEST, EXM_CLASS_REQUEST, EXM_ENTRIES_REQUEST, EXM_EXAMINATION_REQUEST, EXM_POST_ENTRIES_REQUEST, EXM_SUBJECT_REQUEST } from './constants/MarksEntryConstants';
import { marksEntriesSaga, marksEntryCategoriesSaga, marksEntryClassesSaga, marksEntryPlannersSaga, marksEntrySubjectsSaga, marksPostSaga } from './sagas/MarksEntrySagas';
import { classAttendanceGetSaga, classAttendancePostSaga } from './sagas/classAttendanceSaga';

export function* rootSaga(): SagaIterator {
  yield all([
    takeLatest(AFTER_REHYDRATE, afterRehydrateSaga),
    takeLatest(VERIFY_INSTITUTE_REQUEST, verifySaga),
    takeLatest(REGISTER_INSTITUTE_REQUEST, registerSaga),
    takeLatest(SAVE_INSTITUTE, saveSaga),
    takeLatest(LOGIN_REQUEST, loginSaga),
    takeLatest(LOG_OUT, logOutSaga),
    takeLatest(ATTENDANCE_REQUEST, attendanceSaga),
    takeLatest(ATTENDANCE_TEACHER_REQUEST, attendanceTeacherSaga),
    takeLatest(EVENTS_REQUEST, eventsSaga),
    takeLatest(LEAVES_REQUEST, leavesSaga),
    takeLatest(LEAVE_REQUEST, leaveSaga),
    takeLatest(SYLLABUS_REQUEST, syllabusSaga),
    takeLatest(MASTER_REQUEST, masterSaga),
    takeLatest(SEND_OTP_REQUEST, sendOTPSaga),
    takeLatest(VERIFY_OTP_REQUEST, verifyOTPSaga),
    takeLatest(SIBLINGS_REQUEST, siblingsSaga),
    takeLatest(TIME_TABLE_REQUEST, timeTablesSaga),
    takeLatest(TEACHER_TIME_TABLE_REQUEST, teacherTimeTablesSaga),
    takeLatest(ANNOUNCEMENTS_REQUEST, announcementsSaga),
    takeLatest(LOGIN_MOBILE_REQUEST, loginMobileSaga),
    takeLatest(HOMEWORKS_REQUEST, homeworksSaga),
    takeLatest(FEEDBACKS_REQUEST, feedbacksSaga),
    takeLatest(FEEDBACK_REQUEST, feedbackSaga),
    takeLatest(PROFILE_REQUEST, profileSaga),
    takeLatest(TEACHER_PROFILE_REQUEST, teacherProfileSaga),
    takeLatest(INSTITUTE_PROFILE_REQUEST, instituteSaga),
    takeLatest(NOTIFICATIONS_REQUEST, notificationsSaga),

    takeLatest(TEACHER_LEAVE_APPROVAL_REQUEST, teacherLeaveApprovalSaga),

    takeLatest(TRENDING_CHAPTER_REQUEST, trendingChapterSaga),
    takeLatest(LEARN_WITH_VIDEO_REQUEST, learnWithVideoSaga),
    takeLatest(MY_COURSE_REQUEST, myCoursesSaga),
    takeLatest(RECOMMENDED_LESSONS_REQUEST, recommendedLessonsSaga),
    takeLatest(SWITCH_SIBLINGS_REQ, switchSiblingProfile),
    takeLatest(STUDENT_LIST_REQUEST, myStudentsSaga),
    takeLatest(SUB_STUDENT_COMPLAINT_REQ, submitStudentComplaintSaga),
    takeLatest(COMPLAINT_LIST_REQ, myComplaintList),
    takeLatest(EXM_CATEGORY_REQUEST, marksEntryCategoriesSaga),
    takeLatest(EXM_EXAMINATION_REQUEST, marksEntryPlannersSaga),
    takeLatest(EXM_CLASS_REQUEST, marksEntryClassesSaga),
    takeLatest(EXM_SUBJECT_REQUEST, marksEntrySubjectsSaga),
    takeLatest(EXM_ENTRIES_REQUEST, marksEntriesSaga),
    takeLatest(EXM_POST_ENTRIES_REQUEST, marksPostSaga),
    takeLatest(CLASS_ATTENDANCE_GET_REQ, classAttendanceGetSaga),
    takeLatest(CLASS_ATTENDANCE_POST_REQ, classAttendancePostSaga),
    takeLatest(CLASS_HOMEWORK_GET_REQ, classHomeworkSaga),
    takeLatest(CLASS_ASSIGNMENT_GET_REQ, classAssignmentSaga),
    takeLatest(CLASS_CLASSWORK_GET_REQ, classClassworkSaga)
  ]);
}
