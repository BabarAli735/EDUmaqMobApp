import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Strings } from '../../../../assets';
import { CalendarView, Container, DateHeaderView, HeaderView, HorizontalDivider } from '../../../../components';
import { useAttendanceSelector } from '../../../../redux';

export function AttendanceScreen() {
  const attendance = useAttendanceSelector();

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Attendance.TITLE} isSearch isNotification />
        <HorizontalDivider width={3} />
        <DateHeaderView />
        <HorizontalDivider width={3} />
        <CalendarView
          type={'ATTENDANCE'}
          events={attendance.attendance?.events}
          onDateSelect={date => {
            attendance.getAttendance(date);
          }}
        />
        <View style={_styles.attendanceContainer}>
          <View style={_styles.attendanceHolder}>
            <View style={_styles.attendanceTitleHolder}>
              <Text style={_styles.attendanceTitle}>{Strings.Attendance.PRESENT}</Text>
            </View>
            <Text style={{ ..._styles.attendanceValue, color: Colors.PRESENT }}>{attendance.attendance && attendance.attendance.presentDays ? attendance.attendance.presentDays : '0'}</Text>
          </View>
          <View style={{ ..._styles.attendanceHolder, marginStart: 5 }}>
            <View style={{ ..._styles.attendanceTitleHolder, backgroundColor: Colors.ABSENT }}>
              <Text style={_styles.attendanceTitle}>{Strings.Attendance.ABSENT}</Text>
            </View>
            <Text style={{ ..._styles.attendanceValue, color: Colors.ABSENT }}>{attendance.attendance && attendance.attendance.absentDays ? attendance.attendance.absentDays : '0'}</Text>
          </View>
          <View style={{ ..._styles.attendanceHolder, marginStart: 5 }}>
            <View style={{ ..._styles.attendanceTitleHolder, backgroundColor: Colors.HOLIDAY }}>
              <Text style={_styles.attendanceTitle}>{Strings.Attendance.HOLIDAY}</Text>
            </View>
            <Text style={{ ..._styles.attendanceValue, color: Colors.HOLIDAY }}>{attendance.attendance && attendance.attendance.holidayDays ? attendance.attendance.holidayDays : '0'}</Text>
          </View>
          <View style={{ ..._styles.attendanceHolder, marginStart: 5 }}>
            <View style={{ ..._styles.attendanceTitleHolder, backgroundColor: Colors.LEAVE }}>
              <Text style={_styles.attendanceTitle}>{Strings.Attendance.LEAVE}</Text>
            </View>
            <Text style={{ ..._styles.attendanceValue, color: Colors.LEAVE }}>{attendance.attendance && attendance.attendance.leaveDays ? attendance.attendance.leaveDays : '0'}</Text>
          </View>
        </View>
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
    borderRadius: 5,
    flexDirection: 'row',
    padding: 5,
    marginStart: 3,
    marginEnd: 3,
    backgroundColor: Colors.CYAN,
  },
  attendanceHolder: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
  },
  attendanceTitleHolder: {
    fontSize: 16,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    color: Colors.WHITE,
    backgroundColor: Colors.PRESENT,
  },
  attendanceTitle: {
    fontSize: 16,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  attendanceValue: {
    textAlign: 'center',
    fontSize: 50,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
