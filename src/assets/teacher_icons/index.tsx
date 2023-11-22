import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

export const TeacherIcons = {
  IC_CLASS_ATTENDANCE: require('./ic_class_ttendance.png'),
  IC_LEAVE_APPROVAL: require('./ic_leave_approval.png'),
  IC_HOME_WORK: require('./ic_homeworks.png'),
  IC_LEAVE_APPLICATION: require('./ic_leave_application.png'),
  IC_MY_ATTENDANCE: require('./ic_attendance.png'),
  IC_STUDENT_COMPLAINT: require('./ic_complaint.png'),
  IC_MARKS_ENTRY: require('./ic_marks_entry.png'),
  IC_MY_TIMETABLE: require('./ic_time_table.png'),
  IC_INTERACTIVE_CLASS: require('./ic_intractive_class.png'),

  IC_MY_STUDENTS: require('./ic_my_student.png'),
  IC_LMS: require('./ic_LMS.png'),
  IC_EVENT_CALENDER: require('./ic_event_calander.png'),
};

interface Props {
  size: number;
  icon: ImageSourcePropType;
  color?: string;
  rotation?: '45deg' | '90deg' | '135deg' | '180deg' | '225deg' | '270deg' | '315deg' | '360deg';
}

export function Icon({ size, icon, rotation }: Props) {
  return <Image source={icon} style={{ width: size, height: size, transform: [{ rotate: rotation ? rotation : '0deg' }] }} />;
}
