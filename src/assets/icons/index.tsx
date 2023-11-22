import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { Colors } from '..';

export const Icons = {
  IC_GRAPH: require('./ic_graph.png'),
  IC_HOME: require('./ic_home.png'),
  IC_LEARN: require('./ic_learn.png'),
  IC_ASK: require('./ic_ask.png'),
  IC_MORE: require('./ic_more.png'),
  IC_ARROW_LEFT: require('./ic_arrow_left.png'),
  IC_ARROW_DOWN: require('./ic_arrow_down.png'),
  IC_FORBIDDEN: require('./ic_forbidden.png'),
  IC_SORT: require('./ic_sort.png'),
  IC_MENU_DRAWER: require('./ic_menu_drawer.png'),
  IC_MENU_SIDE: require('./ic_side_menu.png'),
  IC_SEARCH: require('./ic_search.png'),
  IC_CANCEL_SEARCH: require('./ic_cancel_search.png'),
  IC_NOTIFICATION: require('./ic_notification.png'),
  IC_HOMEWORK: require('./ic_homework.png'),
  IC_ATTENDANCE: require('./ic_attendance.png'),
  IC_FEE_DETAILS: require('./ic_fee_details.png'),
  IC_TIME_TABLE: require('./ic_time_table.png'),
  IC_EVENTS: require('./ic_events.png'),
  IC_SYLLABUS: require('./ic_syllabus.png'),
  IC_RESULTS: require('./ic_results.png'),
  IC_ANNOUNCEMENTS: require('./ic_announcements.png'),
  IC_BUS_TRACK: require('./ic_bust_tracking.png'),
  IC_STUDENT_TRACK: require('./ic_student_tracking.png'),
  IC_LEAVES: require('./ic_leave.png'),
  IC_PROGRESS: require('./ic_progress.png'),
  IC_LIVE_CLASS: require('./ic_live_class.png'),
  IC_CLOCK: require('./ic_clock.png'),
  IC_INTERACTIVE_CLASS: require('./ic_interactive_class.png'),
  IC_HOSTEL: require('./ic_hostel.png'),
  IC_LIBRARY: require('./ic_library.png'),
  IC_CALENDAR: require('./ic_calendar.png'),
  IC_PARTNER: require('./ic_partner.png'),
  IC_PROTECTED: require('./ic_protected.png'),
  IC_SEGMENT: require('./ic_segment.png'),
  IC_PLUS: require('./ic_plus.png'),
  IC_ATTACHMENT: require('./ic_attached.png'),
  IC_USER: require('./ic_user.png'),
  PLAY_BUTTON: require('./play_button.png'),
  PAUSE_BUTTON: require('./pause_btn.png'),
  IC_LIVE: require('./ic_live.png'),
  IC_ABOUT_APP: require('./ic_about_app.png'),
  IC_APP_SETTINGS: require('./ic_app_settings.png'),
  IC_LOGOUT: require('./ic_logout.png'),
  IC_PROFILE: require('./ic_profile.png'),
  IC_SCHOOL_PROFILE: require('./ic_school_profile.png'),
  IC_SWITCH_PROFILE: require('./ic_switch_profile.png'),
  IC_WRITE_TO_SCHOOL: require('./ic_write_to_school.png'),
  IC_BIOLOGY: require('./ic_biology.png'),
  IC_CHEMISTRY: require('./ic_chemistry.png'),
  IC_ENGLISH: require('./ic_english.png'),
  IC_MATHS: require('./ic_maths.png'),
  IC_PHYSICS: require('./ic_physics.png'),
  IC_SOCIAL_SCIENCE: require('./ic_social_science.png'),
  IC_FACEBOOK: require('./ic_facebook.png'),
  IC_LINKED_IN: require('./ic_linkedin.png'),
  IC_PLAY: require('./ic_play.png'),
  IC_EMAIL: require('./ic_email.png'),
  IC_INTERNET: require('./ic_internet.png'),
  IC_PHONE: require('./ic_phone.png'),
  IC_MAP: require('./ic_map.png'),
  IC_LOCK: require('./ic_lock.png'),
  IC_SHARE: require('./ic_share.png'),
  IC_STAR: require('./ic_star.png'),
  IC_PLACEHOLDER: require('./ic_placeholder.png'),
  IC_FOLDER: require('./ic_folder.png'),
  IC_CHECKBOX: require('./ic_checkbox.png'),
  IC_HEADPHONE: require('./ic_headphones.png'),
  IC_RUPEES: require('./ic_rupees.png'),
  IC_CAMERA: require('./ic_camera.png'),
  IC_GALLERY: require('./ic_gallery.png'),
  IC_PDF: require('./ic_pdf.png'),
};

interface Props {
  size: number;
  icon: ImageSourcePropType;
  color?: string;
  rotation?: '45deg' | '90deg' | '135deg' | '180deg' | '225deg' | '270deg' | '315deg' | '360deg';
}

export function Icon({ size, icon, color, rotation }: Props) {
  return <Image source={icon} style={{ width: size, height: size, tintColor: color ? color : Colors.BLACK, transform: [{ rotate: rotation ? rotation : '0deg' }] }} />;
}
