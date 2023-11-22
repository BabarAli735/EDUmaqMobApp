import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Strings } from '../../../../assets';
import { CalendarView, Container, DateHeaderView, HeaderView, HorizontalDivider, VerticalDivider } from '../../../../components';
import { useAttendanceTeacherSelector } from '../../../../redux/selectors/AttendanceTeacherSelectors';
import { responsiveFontSize as rf } from '../../../../common';

export function AttendanceTeacherScreen() {
  const attendance = useAttendanceTeacherSelector();

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.AttendanceTeacher.TITLE} isSearch isNotification />

        <View style={_styles.attendanceContainer}>
          <View style={_styles.attendanceHolder}>
            <View style={_styles.attendanceTitleHolder}>
              <Text style={_styles.attendanceTitle}>{Strings.Attendance.PRESENT}</Text>
            </View>
            <Text style={{ ..._styles.attendanceValue }}>{attendance.attendanceTeacher && attendance.attendanceTeacher.presentDays ? attendance.attendanceTeacher.presentDays : '0'}</Text>
          </View>
          <VerticalDivider width={2} color={Colors.GRAY} />
          <View style={{ ..._styles.attendanceHolder, marginStart: 5 }}>
            <View style={{ ..._styles.attendanceTitleHolder }}>
              <Text style={_styles.attendanceTitle}>{Strings.Attendance.ABSENT}</Text>
            </View>
            <Text style={{ ..._styles.attendanceValue }}>{attendance.attendanceTeacher && attendance.attendanceTeacher.absentDays ? attendance.attendanceTeacher.absentDays : '0'}</Text>
          </View>
          <VerticalDivider width={2} color={Colors.GRAY} />
          <View style={{ ..._styles.attendanceHolder, marginStart: 5 }}>
            <View style={{ ..._styles.attendanceTitleHolder }}>
              <Text style={_styles.attendanceTitle}>{Strings.Attendance.HOLIDAY}</Text>
            </View>
            <Text style={{ ..._styles.attendanceValue }}>{attendance.attendanceTeacher && attendance.attendanceTeacher.holidayDays ? attendance.attendanceTeacher.holidayDays : '0'}</Text>
          </View>
          <VerticalDivider width={2} color={Colors.GRAY} />
          <View style={{ ..._styles.attendanceHolder, marginStart: 5 }}>
            <View style={{ ..._styles.attendanceTitleHolder }}>
              <Text style={_styles.attendanceTitle}>{Strings.Attendance.LEAVE}</Text>
            </View>
            <Text style={{ ..._styles.attendanceValue }}>{attendance.attendanceTeacher && attendance.attendanceTeacher.leaveDays ? attendance.attendanceTeacher.leaveDays : '0'}</Text>
          </View>
        </View>

        <HorizontalDivider width={3} />
        <CalendarView
          type={'ATTENDANCE'}
          events={attendance.attendanceTeacher?.events}
          onDateSelect={date => {
            attendance.getTeacherAttendance(date);
          }}
        />
      </Container>
    </Container>
  );
}

const _styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.ACCENT,
  },
  container: {
    backgroundColor: Colors.PRIMARY,
  },
  attendanceContainer: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: Colors.CYAN,
  },
  attendanceHolder: {
    flex: 1,

    // borderRadius: 5,
    // backgroundColor: Colors.WHITE,
  },
  attendanceTitleHolder: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  attendanceTitle: {
    fontSize: rf(1.8),
    fontWeight:'bold',
    borderRadius: 5,
    textAlign: 'center',
    color: Colors.PRIMARY,
  },
  attendanceValue: {
    textAlign: 'center',
    fontSize: rf(1.8),
    fontWeight:'bold',
    paddingTop: 5,
    paddingBottom: 5,
  },
});
