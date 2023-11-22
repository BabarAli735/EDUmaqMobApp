import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Container } from '../components';
import {
  AboutAppScreen,
  AnnouncementsScreen,
  AttendanceScreen,
  ChangePassword,
  CourseInformation,
  CustomerCareScreen,
  DrawerNavigator,
  EventsScreen,
  FeedbackScreen,
  FeesDetailsScreen,
  HomeWorkDetails,
  HomeworkScreen,
  HostelScreen,
  InteractiveClassesScreen,
  ItemPicker,
  LeaveScreen,
  LibraryScreen,
  LiveClassesScreen,
  Modals,
  NotificationScreen,
  OtpScreen,
  PaymentHistoryScreen,
  ProfileScreen,
  ProgressScreen,
  ResultsScreen,
  SchoolProfileScreen,
  Screens,
  SearchScreen,
  SettingsScreen,
  SwitchProfileScreen,
  SyllabusScreen,
  TermsScreen,
  TimeTableScreen,
  VideoClasses,
  ViewAllTrending,
  WebViewScreen,
} from '../screens';
import { AttendanceTeacherScreen } from '../screens/main/teacher/attendance';
import { TeacherComplaints } from '../screens/main/teacher/complaints';
import { TeacherEventsScreen } from '../screens/main/teacher/events';
import { TeacherProfileScreen } from '../screens/main/teacher/profile';
import { TeacherLeavesApprovalStudents } from '../screens/main/teacher/studentLeaves';
import { MarksEntry } from '../screens/main/teacher/marksEntry';
import { ClassAttendance } from '../screens/main/teacher/classAttendance';
import { ClassHomeWorkScreen } from '../screens/main/teacher/homeWork';

const Stack = createNativeStackNavigator();

function DummyScreen() {
  return <Container />;
}

export function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ animation: 'fade', headerShown: false }} initialRouteName={Screens.DRAWER}>
      <Stack.Group>
        <Stack.Screen name={Screens.DRAWER} component={DrawerNavigator} />
        <Stack.Screen name={Screens.HOMEWORK} component={HomeworkScreen} />
        <Stack.Screen name={Screens.ATTENDANCE} component={AttendanceScreen} />
        <Stack.Screen name={Screens.ATTENDANCE_TEACHER} component={AttendanceTeacherScreen} />
        <Stack.Screen name={Screens.FEES_DETAIL} component={FeesDetailsScreen} />
        <Stack.Screen name={Screens.HOMEWORK_DETAIL_SCREEN} component={HomeWorkDetails} />
        <Stack.Screen name={Screens.VIEW_ALL_TRENDING} component={ViewAllTrending} />
        <Stack.Screen name={Screens.COURSE_INFORMATION} component={CourseInformation} />
        <Stack.Screen name={Screens.TIME_TABLE} component={TimeTableScreen} />
        <Stack.Screen name={Screens.EVENTS} component={EventsScreen} />
        <Stack.Screen name={Screens.TEACHER_EVENTS} component={TeacherEventsScreen} />
        <Stack.Screen name={Screens.TEACHER_LEAVE_APPROVAL} component={TeacherLeavesApprovalStudents} />
        <Stack.Screen name={Screens.TEACHER_STUDENT_COMPLAINT} component={TeacherComplaints} />
        <Stack.Screen name={Screens.SYLLABUS} component={SyllabusScreen} />
        <Stack.Screen name={Screens.RESULTS} component={ResultsScreen} />
        <Stack.Screen name={Screens.ANNOUNCEMENTS} component={AnnouncementsScreen} />
        <Stack.Screen name={Screens.BUS_TRACKING} component={DummyScreen} />
        <Stack.Screen name={Screens.STUDENT_TRACKING} component={DummyScreen} />
        <Stack.Screen name={Screens.LEAVE_REQUEST} component={LeaveScreen} />
        <Stack.Screen name={Screens.PROGRESS_REPORT} component={ProgressScreen} />
        <Stack.Screen name={Screens.LIVE_CLASS} component={LiveClassesScreen} />
        <Stack.Screen name={Screens.INTERACTIVE_CLASS} component={InteractiveClassesScreen} />
        <Stack.Screen name={Screens.HOSTEL} component={HostelScreen} />
        <Stack.Screen name={Screens.LIBRARY} component={LibraryScreen} />
        <Stack.Screen name={Screens.SEARCH} component={SearchScreen} />
        <Stack.Screen name={Screens.NOTIFICATION} component={NotificationScreen} />
        <Stack.Screen name={Screens.PROFILE} component={ProfileScreen} />
        <Stack.Screen name={Screens.TEACHER_PROFILE} component={TeacherProfileScreen} />
        <Stack.Screen name={Screens.SCHOOL_PROFILE} component={SchoolProfileScreen} />
        <Stack.Screen name={Screens.SWITCH_PROFILE} component={SwitchProfileScreen} />
        <Stack.Screen name={Screens.ABOUT_APP} component={AboutAppScreen} />
        <Stack.Screen name={Screens.SETTINGS} component={SettingsScreen} />
        <Stack.Screen name={Screens.CHANGE_PASSWORD} component={ChangePassword} />
        <Stack.Screen name={Screens.FEEDBACK} component={FeedbackScreen} />
        <Stack.Screen name={Screens.WEB} component={WebViewScreen} />
        <Stack.Screen name={Screens.PAYMENT_HISTORY} component={PaymentHistoryScreen} />
        <Stack.Screen name={Screens.CUSTOMER_CARE} component={CustomerCareScreen} />
        <Stack.Screen name={Screens.TERMS} component={TermsScreen} />
        <Stack.Screen name={Screens.VIDEO_CLASSES} component={VideoClasses} />
        <Stack.Screen name={Screens.OTP_SCREEN} component={OtpScreen} />
        <Stack.Screen name={Screens.MARKS_ENTRY} component={MarksEntry} />
        <Stack.Screen name={Screens.CLASS_ATTENDANCE} component={ClassAttendance} />
        <Stack.Screen name={Screens.CLASS_HOME_WORK} component={ClassHomeWorkScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
        <Stack.Screen name={Modals.ITEM_ICKER} component={ItemPicker} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
