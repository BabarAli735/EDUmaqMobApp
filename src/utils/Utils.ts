import { Icons } from '../assets';
import { TeacherIcons } from '../assets/teacher_icons';
import { PicketItem, Screens } from '../screens';

export const AcademicModules = [
  { id: Screens.HOMEWORK, title: 'Homework', icon: Icons.IC_HOMEWORK, color: '#D98880' },
  { id: Screens.ATTENDANCE, title: 'Attendance', icon: Icons.IC_ATTENDANCE, color: '#F7DC6F' },
  { id: Screens.FEES_DETAIL, title: 'Fee Details', icon: Icons.IC_FEE_DETAILS, color: '#85C1E9' },
  { id: Screens.TIME_TABLE, title: 'Time Table', icon: Icons.IC_TIME_TABLE, color: '#EB984E' },

  { id: Screens.EVENTS, title: 'Events', icon: Icons.IC_EVENTS, color: '#C39BD3' },
  { id: Screens.SYLLABUS, title: 'Syllabus', icon: Icons.IC_SYLLABUS, color: '#F0B27A' },
  { id: Screens.RESULTS, title: 'Results', icon: Icons.IC_RESULTS, color: '#73C6B6' },
  { id: Screens.ANNOUNCEMENTS, title: 'Announcement', icon: Icons.IC_ANNOUNCEMENTS, color: '#AF7AC5' },

  { id: Screens.BUS_TRACKING, title: 'Bus Tracking', icon: Icons.IC_BUS_TRACK, color: '#7FB3D5' },
  { id: Screens.STUDENT_TRACKING, title: 'Student Track', icon: Icons.IC_STUDENT_TRACK, color: '#F1948A' },
  { id: Screens.LEAVE_REQUEST, title: 'Leaves', icon: Icons.IC_LEAVES, color: '#F8C471' },
  { id: Screens.PROGRESS_REPORT, title: 'Progress', icon: Icons.IC_PROGRESS, color: '#48C9B0' },

  { id: Screens.LIVE_CLASS, title: 'Live Class', icon: Icons.IC_LIVE_CLASS, color: '#76D7C4' },
  { id: Screens.INTERACTIVE_CLASS, title: 'Interactive Class', icon: Icons.IC_INTERACTIVE_CLASS, color: '#BB8FCE' },
  { id: Screens.HOSTEL, title: 'Hostel', icon: Icons.IC_HOSTEL, color: '#E59866' },
  { id: Screens.LIBRARY, title: 'Library', icon: Icons.IC_LIBRARY, color: '#5DADE2' },
];


export const TeacherModules = [
  { id: Screens.CLASS_ATTENDANCE, title: 'Class Attendance', icon: TeacherIcons.IC_CLASS_ATTENDANCE, color: '#D98880' },
  { id: Screens.TEACHER_LEAVE_APPROVAL, title: 'Leave Approval', icon: TeacherIcons.IC_LEAVE_APPROVAL, color: '#F7DC6F' },
  { id: Screens.CLASS_HOME_WORK, title: 'Home Work', icon: TeacherIcons.IC_HOME_WORK, color: '#85C1E9' },
  
  { id: Screens.ATTENDANCE_TEACHER, title: 'Leave Application', icon: TeacherIcons.IC_LEAVE_APPLICATION, color: '#F0B27A' },
  { id: Screens.ATTENDANCE_TEACHER, title: 'My Attendance', icon: TeacherIcons.IC_MY_ATTENDANCE, color: '#EB984E' },
  { id: Screens.TEACHER_STUDENT_COMPLAINT, title: 'Student Complaint', icon: TeacherIcons.IC_STUDENT_COMPLAINT, color: '#C39BD3' },
  

  { id: Screens.MARKS_ENTRY, title: 'Marks Entry', icon: TeacherIcons.IC_MARKS_ENTRY, color: '#73C6B6' },
  { id: Screens.ATTENDANCE_TEACHER, title: 'My Time Table', icon: TeacherIcons.IC_MY_TIMETABLE, color: '#AF7AC5' },
  { id: Screens.ATTENDANCE_TEACHER, title: 'Interactive Class', icon: TeacherIcons.IC_INTERACTIVE_CLASS, color: '#7FB3D5' },

  { id: Screens.ATTENDANCE_TEACHER, title: 'My Student', icon: TeacherIcons.IC_MY_STUDENTS, color: '#73C6B6' },
  { id: Screens.ATTENDANCE_TEACHER, title: 'LMS', icon: TeacherIcons.IC_LMS, color: '#AF7AC5' },
  { id: Screens.TEACHER_EVENTS, title: 'Event Calender', icon: TeacherIcons.IC_EVENT_CALENDER, color: '#7FB3D5' },

  
];

export const StudentIntro = ['Track Academic Record & Performance.', 'Pay fee Online.', 'Stay Connected with School & Teacher 24/7.', 'Live Tracking, Live Classes and many more...'];

export const TeacherIntro = ['Manage Online Classes.', 'Manage Examination.', 'Manage Homework & Assignments.', 'Manage Student Attendance.'];

export const AdminIntro = ['Manage Organization', 'Manage Students & Academic', 'Manage Employee & Performance.', 'Analytics & Financial Summary.'];

export const SchoolMedium: PicketItem[] = [
  { id: 0, value: 'English' },
  { id: 1, value: 'Hindi' },
];

export const InstituteType: PicketItem[] = [
  { id: 0, value: 'Pre School' },
  { id: 1, value: 'School' },
  { id: 2, value: 'College' },
  { id: 3, value: 'University' },
];

export const AffiliationType: PicketItem[] = [
  { id: 0, value: 'CBSE' },
  { id: 1, value: 'ICSE' },
  { id: 2, value: 'State Board' },
  { id: 3, value: 'Other' },
];

export const DummyTrendingChapters = [
  {
    id: 0,
    name: 'English',
    faculty: 'Nirav',
    image: 'https://i.pinimg.com/236x/4e/45/88/4e458893b1fdc033508016e09fa5553c.jpg',
    title: 'Articles, Tense',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    isLive: true,
    dateTime: '2021-09-26 13:30',
  },
  {
    id: 1,
    name: 'Biology',
    faculty: 'Mayank',
    image: 'https://i.pinimg.com/236x/4e/45/88/4e458893b1fdc033508016e09fa5553c.jpg',
    title: 'Human Body',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    isLive: true,
    dateTime: '2021-09-26 14:30',
  },
  {
    id: 2,
    name: 'Maths',
    faculty: 'Avinash',
    image: 'https://i.pinimg.com/236x/4e/45/88/4e458893b1fdc033508016e09fa5553c.jpg',
    title: 'Time & Work',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    isLive: false,
    dateTime: '2021-09-26 15:30',
  },
  {
    id: 3,
    name: 'Physics',
    faculty: 'Jackey',
    image: 'https://i.pinimg.com/236x/4e/45/88/4e458893b1fdc033508016e09fa5553c.jpg',
    title: 'Speed',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    isLive: false,
    dateTime: '2021-09-26 16:30',
  },
  {
    id: 4,
    name: 'Chemistry',
    faculty: 'Vishal',
    image: 'https://i.pinimg.com/236x/4e/45/88/4e458893b1fdc033508016e09fa5553c.jpg',
    title: 'Aside Base',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    isLive: false,
    dateTime: '2021-09-26 17:30',
  },
  {
    id: 5,
    name: 'History',
    faculty: 'Pragnesh',
    image: 'https://i.pinimg.com/236x/4e/45/88/4e458893b1fdc033508016e09fa5553c.jpg',
    title: 'Indian History',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    isLive: false,
    dateTime: '2021-09-26 18:30',
  },
];

export const DummyVideoClasses = [
  {
    id: 0,
    name: 'Mathematics',
    image: Icons.IC_MATHS,
    color: '#2980B9',
  },
  {
    id: 1,
    name: 'Physics',
    image: Icons.IC_PHYSICS,
    color: '#C0392B',
  },
  {
    id: 2,
    name: 'Chemistry',
    image: Icons.IC_CHEMISTRY,
    color: '#F39C12',
  },
  {
    id: 3,
    name: 'Biology',
    image: Icons.IC_BIOLOGY,
    color: '#16A085',
  },
  {
    id: 4,
    name: 'English',
    image: Icons.IC_ENGLISH,
    color: '#D35400',
  },
  {
    id: 5,
    name: 'Social Science',
    image: Icons.IC_SOCIAL_SCIENCE,
    color: '#2ECC71',
  },
];

export const MoreMenus = [
  {
    id: 0,
    name: 'School Website',
    icon: Icons.IC_INTERNET,
  },
  {
    id: 1,
    name: 'Local Library',
    icon: Icons.IC_FOLDER,
  },
  {
    id: 2,
    name: 'Payment History',
    icon: Icons.IC_RUPEES,
    navigate: Screens.PAYMENT_HISTORY,
  },
  {
    id: 3,
    name: 'Customer Care',
    icon: Icons.IC_HEADPHONE,
    navigate: Screens.CUSTOMER_CARE,
  },
  {
    id: 4,
    name: 'Terms & Policy',
    icon: Icons.IC_CHECKBOX,
    navigate: Screens.TERMS,
  },
  {
    id: 5,
    name: 'Change Language',
    icon: Icons.IC_INTERNET,
  },
];

export function getRandomColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + randomColor;
}

export function padLeadingZeros(num: number, size: number) {
  var value = num + '';
  while (value.length < size) value = '0' + value;
  return value;
}

export function isImageExtension(extension?: string): boolean {
  return extension && (extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg' || extension.toLowerCase() === 'png') ? true : false;
}

export function isDocumentExtension(extension?: string): boolean {
  return extension && (extension.toLowerCase() === 'doc' || extension.toLowerCase() === 'docx' || extension.toLowerCase() === 'pdf') ? true : false;
}
