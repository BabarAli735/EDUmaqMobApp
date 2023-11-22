import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import {useAuthenticationSelector, useUiSelector } from '..';
import { Colors } from '../../assets';
import { Event } from '../../components';
import {AttendanceTeacherResponse, AttendanceType } from '../../data';
import { attendanceTeacherRequest } from '../actions/AttendanceTeacherActions';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const attendanceTeacherStateSelector = (state: RootState) => state.attendanceTeacher;

export const useAttendanceTeacherSelector = () => { 
  const { profile } = useAuthenticationSelector();
  const { showSnackbar } = useUiSelector();
  const [attendanceTeacher, setTeacherAttendance] = React.useState<AttendanceTeacherResponse>();
  const { isLoading, attendancesTeacher, error } = useSelector(attendanceTeacherStateSelector);
  
  React.useEffect(() => {
    const events = attendancesTeacher?.monthlyAttendances?.map(item => {
      if (item.currentDateType === AttendanceType.HOLIDAY) {
        return { date: new Date(item.currentDate), color: Colors.HOLIDAY } as Event;
      } else if (item.currentDateType === AttendanceType.ABSENT) {
        return { date: new Date(item.currentDate), color: Colors.ABSENT } as Event;
      } else if (item.currentDateType === AttendanceType.PRESENT) {
        return { date: new Date(item.currentDate), textColor: Colors.PRESENT } as Event;
      } else if (item.currentDateType === AttendanceType.LEAVE) {
        return { date: new Date(item.currentDate), color: Colors.LEAVE } as Event;
      } else {
        return { date: new Date(item.currentDate) } as Event;
      }
    });
    setTeacherAttendance({ ...attendancesTeacher, events: events });
  }, [attendancesTeacher]);

  React.useEffect(() => {
    getTeacherAttendance(new Date());
  }, []);

  const getTeacherAttendance = (date: Date) => {
    StoreService.dispatch(
      attendanceTeacherRequest({
        id: profile?.id,
        date: moment(date).format('YYYY-MM'),
        onError: () => {
          if (error) {
            showSnackbar(error?.error.message);
          }
        },
      }),
    );
  };

  return { isLoading, attendanceTeacher, error, getTeacherAttendance };
};
