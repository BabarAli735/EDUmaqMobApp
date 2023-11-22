import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import {useAuthenticationSelector } from '..';
import { getWeekDates, weekDays } from '../../utils';
import { teacherTimeTableRequest } from '../actions/TeacherTimeTableActions';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const teacherTimeTableStateSelector = (state: RootState) => state.teacherTimeTable;

export const useTeacherTimeTableSelector = () => {
  const [date, setDate] = React.useState<Date>(moment(new Date()).toDate());
  const dates = getWeekDates();

  const { isLoading, teacherTimeTable, error } = useSelector(teacherTimeTableStateSelector);
  const { profile } = useAuthenticationSelector();
  React.useEffect(() => {
    StoreService.dispatch(teacherTimeTableRequest({ id: profile?.id ?? 0, day: weekDays[date.getDay()] }));
  }, [date, setDate]);

  // React.useEffect(() => {
  //   if (date.getDay() == 0) {
  //     setDate(dates[0]);
  //   }
  // }, [dates]);

  const onRetry = () => {
    StoreService.dispatch(teacherTimeTableRequest({ id: profile?.id ?? 0, day: weekDays[date.getDay()] }));
  };

  return { date, dates, setDate, isLoading, teacherTimeTable, error, onRetry };
};
