import React from 'react';
import { useSelector } from 'react-redux';
import { feedbackRequest, feedbacksRequest, useAuthenticationSelector, useUiSelector } from '..';
import { isNullOrEmpty } from '../../utils';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const feedbackStateSelector = (state: RootState) => state.feedback;

export const useFeedbacksSelector = () => {
  const { isLoading, feedbacks, error } = useSelector(feedbackStateSelector);
  const { profile } = useAuthenticationSelector();
  const { showSnackbar } = useUiSelector();

  const [isRefreshing, setRefreshing] = React.useState<boolean>(false);
  const [subject, setSubject] = React.useState<string>();
  const [message, setMessage] = React.useState<string>();

  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    StoreService.dispatch(feedbacksRequest({ id: profile?.id }));
  }, []);

  React.useEffect(() => {
    if (error) {
      showSnackbar(error?.error.message);
    }
  }, [error]);

  const onRetry = () => {
    setRefreshing(false);
    StoreService.dispatch(feedbacksRequest({ id: profile?.id }));
  };

  const onRefresh = () => {
    setRefreshing(true);
    StoreService.dispatch(feedbacksRequest({ id: profile?.id }));
  };

  const onSubmit = () => {
    if (isNullOrEmpty(subject)) {
      showSnackbar('Please enter subject.');
    } else if (isNullOrEmpty(message)) {
      showSnackbar('Please enter message.');
    } else {
      StoreService.dispatch(
        feedbackRequest({
          body: {
            Id: 0,
            Subject: subject,
            Message: message,
            SenderId: profile?.id,
          },
          onSuccess: () => {
            setModalVisible(false);
            //StoreService.dispatch(feedbacksRequest({ id: profile?.id }));
          },
        }),
      );
    }
  };

  return { isLoading, isRefreshing, feedbacks, error, onRetry, onRefresh, subject, setSubject, message, setMessage, onSubmit, isModalVisible, setModalVisible };
};
