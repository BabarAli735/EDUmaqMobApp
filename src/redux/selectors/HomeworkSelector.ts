import React from 'react';
import { useSelector } from 'react-redux';
import { homeworksRequest, useAuthenticationSelector } from '..';
import { HomeworkDetail } from '../../data';
import { isDocumentExtension, isImageExtension } from '../../utils';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const homeworkStateSelector = (state: RootState) => state.homework;

export const useHomeworkSelector = () => {
  const { isLoading, homeworks, error } = useSelector(homeworkStateSelector);

  const { profile } = useAuthenticationSelector();

  const [homework, setHomework] = React.useState<HomeworkDetail[]>();
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    StoreService.dispatch(homeworksRequest({ id: profile?.id }));
  }, []);

  React.useEffect(() => {
    if (homeworks && homeworks.length > 0) {
      if (tab === 0) {
        setHomework(homeworks);
      } else if (tab === 1) {
        // Add Videos
      } else if (tab === 2) {
        setHomework(homeworks.filter(item => isImageExtension(item.documentExtension)));
      } else if (tab === 3) {
        setHomework(homeworks.filter(item => isDocumentExtension(item.documentExtension)));
      } else {
      }
    }
  }, [homeworks, tab]);

  const onRetry = () => {
    StoreService.dispatch(homeworksRequest({ id: profile?.id }));
  };

  return { tab, setTab, isLoading, homework, error, onRetry };
};
