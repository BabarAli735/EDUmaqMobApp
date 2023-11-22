import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { attendanceRequest, useAuthenticationSelector, useUiSelector } from '..';
import { Colors } from '../../assets';
import { Event } from '../../components';
import { AttendanceResponse, AttendanceType } from '../../data';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const attendanceStateSelector = (state: RootState) => state.attendance;

export const useAttendanceSelector = () => {
  const [attendance, setAttendance] = React.useState<AttendanceResponse>();
  const { isLoading, attendances, error } = useSelector(attendanceStateSelector);
  const { profile } = useAuthenticationSelector();
  const { showSnackbar } = useUiSelector();

  React.useEffect(() => {
    const events = attendances?.monthlyAttendances?.map(item => {
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
    setAttendance({ ...attendances, events: events });
  }, [attendances]);

  React.useEffect(() => {
    getAttendance(new Date());
  }, []);

  const getAttendance = (date: Date) => {
    StoreService.dispatch(
      attendanceRequest({
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

  return { isLoading, attendance, error, getAttendance };
};
