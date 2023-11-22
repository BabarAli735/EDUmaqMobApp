import React from 'react';
import { useSelector } from 'react-redux';
import { eventsRequest, useUiSelector } from '..';
import { Event } from '../../data';
import { isSameMonthYear } from '../../utils';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const eventStateSelector = (state: RootState) => state.event;

export const useHolidaySelector = () => {
  const [holiday, setHoliday] = React.useState<Event[]>();
  const { isLoading, events, error } = useSelector(eventStateSelector);
  const { showSnackbar } = useUiSelector();

  React.useEffect(() => {
    if (error) {
      showSnackbar(error?.error.message);
    }
  }, [error]);

  React.useEffect(() => {
    if (events && events.length > 0) {
      const event = events.filter(item => isSameMonthYear(new Date(), new Date(item.startDate)) && item.eventType === 'Holiday');
      setHoliday(event ? event : []);
    }
  }, [events]);

  React.useEffect(() => {
    StoreService.dispatch(eventsRequest({}));
  }, []);

  const filter = (date: Date) => {
    if (events && events.length > 0) {
      const event = events.filter(item => isSameMonthYear(date, new Date(item.startDate)) && item.eventType === 'Holiday');
      setHoliday(event ? event : []);
    }
  };

  return { isLoading, error, holiday, filter };
};

export const useEventSelector = () => {
  const [event, setEvent] = React.useState<Event[]>();
  const { isLoading, events, error } = useSelector(eventStateSelector);
  const { showSnackbar } = useUiSelector();

  React.useEffect(() => {
    if (error) {
      showSnackbar(error?.error.message);
    }
  }, [error]);

  React.useEffect(() => {
    if (events && events.length > 0) {
      const event = events.filter(item => isSameMonthYear(new Date(), new Date(item.startDate)));
      setEvent(event ? event : []);
    }
  }, [events]);

  React.useEffect(() => {
    StoreService.dispatch(eventsRequest({}));
  }, []);

  const filter = (date: Date) => {
    if (events && events.length > 0) {
      const event = events.filter(item => isSameMonthYear(date, new Date(item.startDate)));
      setEvent(event ? event : []);
    }
  };

  return { isLoading, error, event, filter };
};
