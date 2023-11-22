import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { timeTableRequest, useAuthenticationSelector } from '..';
import { getWeekDates, weekDays } from '../../utils';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const timeTableStateSelector = (state: RootState) => state.timeTable;

export const useTimeTableSelector = () => {
  const [date, setDate] = React.useState<Date>(moment(new Date()).toDate());
  const dates = getWeekDates();

  const { isLoading, timeTable, error } = useSelector(timeTableStateSelector);
  const { profile } = useAuthenticationSelector();

  React.useEffect(() => {
    StoreService.dispatch(timeTableRequest({ id: profile?.id ?? 0, day: weekDays[date.getDay()] }));
  }, [date, setDate]);

  React.useEffect(() => {
    if (date.getDay() == 0) {
      setDate(dates[0]);
    }
  }, [dates]);

  const onRetry = () => {
    StoreService.dispatch(timeTableRequest({ id: profile?.id ?? 0, day: weekDays[date.getDay()] }));
  };

  return { date, dates, setDate, isLoading, timeTable, error, onRetry };
};
