import { PicketItem } from './main/modal/picker/index';
export * from './auth';
export * from './main';
export * from './splash';

export enum Screens {
  SPLASH = 'SPLASH_SCREEN',
  WELCOME = 'WELCOME_SCREEN',
  INTRO = 'INTRO_SCREEN',
  VERIFY_INSTITUTE = 'VERIFY_INSTITUTE',
  LOGIN = 'LOGIN_SCREEN',
  MOBILE = 'MOBILE_SCREEN',
  OTP_VERIFY = 'OTP_VERIFY',
  REGISTER = 'REGISTER_SCREEN',
  MAIN = 'MAIN_SCREEN',
  DRAWER = 'DRAWER_SCREEN',
  INTERACT = 'INTERACT_SCREEN',
  HOMEWORK = 'HOMEWORK_SCREEN',
  ATTENDANCE = 'ATTENDANCE_SCREEN',
  
  FEES_DETAIL = 'FEES_DETAIL_SCREEN',
  TIME_TABLE = 'TIME_TABLE_SCREEN',
  EVENTS = 'EVENTS_SCREEN',

  SYLLABUS = 'SYLLABUS_SCREEN',
  RESULTS = 'RESULTS_SCREEN',
  ANNOUNCEMENTS = 'ANNOUNCEMENTS_SCREEN',
  BUS_TRACKING = 'BUS_TRACKING_SCREEN',
  STUDENT_TRACKING = 'STUDENT_TRACKING_SCREEN',
  LEAVE_REQUEST = 'LEAVE_REQUEST_SCREEN',
  PROGRESS_REPORT = 'PROGRESS_REPORT_SCREEN',
  VIEW_ALL_TRENDING = 'VIEW_ALL_TRENDING_SCREEN',
  COURSE_INFORMATION = 'COURSE_INFORMATION',
  LIVE_CLASS = 'LIVE_CLASS_SCREEN',
  INTERACTIVE_CLASS = 'INTERACTIVE_CLASS_SCREEN',
  HOSTEL = 'HOSTEL_SCREEN',
  LIBRARY = 'LIBRARY_SCREEN',
  SEARCH = 'SEARCH_SCREEN',
  NOTIFICATION = 'NOTIFICATION_SCREEN',
  PROFILE = 'PROFILE_SCREEN',
  ABOUT_APP = 'ABOUT_APP_SCREEN',
  SCHOOL_PROFILE = 'SCHOOL_PROFILE_SCREEN',
  SWITCH_PROFILE = 'SWITCH_PROFILE_SCREEN',
  SETTINGS = 'SETTINGS_SCREEN',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD_SCREEN',
  HOME = 'HOME_TAB',
  LEARN = 'LEARN_TAB',
  HELP = 'HELP_TAB',
  MORE = 'MORE_TAB',
  FEEDBACK = 'FEEDBACK_SCREEN',
  WEB = 'WEB_SCREEN',
  PAYMENT_HISTORY = 'PAYMENT_HISTORY',
  CUSTOMER_CARE = 'CUSTOMER_CARE',
  TERMS = 'TERMS',
  VIDEO_CLASSES = 'VIDEO_CLASSES',
  OTP_SCREEN = 'OTP_SCREEN',
  HOMEWORK_DETAIL_SCREEN = 'HOMEWORK_DETAIL_SCREEN',

//Teacher

TEACHER_HOME = 'HOME_TAB',
TEACHER_PROFILE='TEACHER_PROFILE',
TEACHER_EVENTS = 'TEACHER_EVENTS_SCREEN',
ATTENDANCE_TEACHER = 'ATTENDANCE_TEACHER_SCREEN',
TEACHER_HELP = 'TEACHER_HELP',
TEACHER_STUDENTS='My Students',
TEACHER_TIMETABLE='My Timetable',
TEACHER_MORE_INTRACT = 'MORE',
TEACHER_STUDENT_COMPLAINT='Complaint',
TEACHER_LEAVE_APPROVAL='LEAVE_STATUS_APPROVAL',
MARKS_ENTRY = 'MARKS_ENTRY',
CLASS_ATTENDANCE = 'CLASS_ATTENDANCE',
CLASS_HOME_WORK = 'CLASS_HOME_WORK'

}

export enum Modals {
  ITEM_ICKER = 'ITEM_PICKER_MODAL',
}

export type ModalParamsList = {
  [Modals.ITEM_ICKER]: { items: PicketItem[]; title?: string; selected?: PicketItem; onSelect?: (item: PicketItem) => void };
};

export type AuthParamsList = {
  [Screens.LOGIN]: undefined;
  [Screens.REGISTER]: undefined;
  [Screens.VERIFY_INSTITUTE]: undefined;
  [Screens.WELCOME]: undefined;
  [Screens.INTRO]: undefined;
  [Screens.MOBILE]: undefined | { code?: string; onMobileVerified?: (mobile?: string) => void };
};

export type MainParamsList = {
  [Screens.DRAWER]: undefined;
  [Screens.HOMEWORK]: undefined;
  [Screens.ATTENDANCE]: undefined;
  [Screens.FEES_DETAIL]: undefined;
  [Screens.TIME_TABLE]: undefined;
  [Screens.EVENTS]: undefined;
  [Screens.SYLLABUS]: undefined;
  [Screens.RESULTS]: undefined;
  [Screens.LIVE_CLASS]: undefined;
  [Screens.INTERACTIVE_CLASS]: undefined;
  [Screens.LEAVE_REQUEST]: undefined;
  [Screens.SEARCH]: undefined;
  [Screens.NOTIFICATION]: undefined;
  [Screens.PROFILE]: undefined;
  [Screens.ABOUT_APP]: undefined;
  [Screens.SCHOOL_PROFILE]: undefined;
  [Screens.SWITCH_PROFILE]: undefined;
  [Screens.SETTINGS]: undefined;
  [Screens.CHANGE_PASSWORD]: undefined;
  [Screens.FEEDBACK]: undefined;
  [Screens.PROGRESS_REPORT]: undefined;
  [Screens.VIEW_ALL_TRENDING]: undefined;
  [Screens.FEES_DETAIL]: undefined;
  [Screens.HOMEWORK_DETAIL_SCREEN]: undefined;

  [Screens.COURSE_INFORMATION]: undefined;
  [Screens.OTP_SCREEN]: undefined;
  [Screens.WEB]: { title?: string; url?: string };

  [Screens.ATTENDANCE_TEACHER]: undefined;
  [Screens.TEACHER_EVENTS]: undefined;
  [Screens.TEACHER_PROFILE]: undefined;
  [Screens.TEACHER_LEAVE_APPROVAL]: undefined;
  [Screens.TEACHER_STUDENT_COMPLAINT]: undefined;
  // [Screens.WEB]: { title?: string; url?: string | undefined };
  [Screens.PAYMENT_HISTORY]: { title?: string };
  [Screens.CUSTOMER_CARE]: { title?: string };
  [Screens.TERMS]: { title?: string };
  [Screens.MARKS_ENTRY]: undefined;
  [Screens.CLASS_ATTENDANCE]: undefined;

};
