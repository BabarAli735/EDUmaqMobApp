import React from 'react';
import { useSelector } from 'react-redux';
import { notificationsRequest } from '..';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const notificationStateSelector = (state: RootState) => state.notification;

export const useNotificationSelector = () => {
  const { isLoading, notifications, error } = useSelector(notificationStateSelector);

  React.useEffect(() => {
    StoreService.dispatch(notificationsRequest({}));
  }, []);

  const onRetry = () => {
    StoreService.dispatch(notificationsRequest({}));
  };

  return { isLoading, notifications, error, onRetry };
};
