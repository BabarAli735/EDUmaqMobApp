import React from 'react';
import { useSelector } from 'react-redux';
import { getClassHomeworkReq, useUiSelector } from '..';
import { ClassHomeworkDetail } from '../../data';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const classHomeworkStateSelector = (state: RootState) => state.classHomework;

export const useClassHomeworkSelector = () => {
  const [homework, setHomework] = React.useState<ClassHomeworkDetail[]>();
  const { isLoading, classHomework, error } = useSelector(classHomeworkStateSelector);
  const { showSnackbar } = useUiSelector();

  React.useEffect(() => {
    if (error) {
      showSnackbar(error?.error.message);
    }
  }, [error]);

  React.useEffect(() => {
    if (classHomework && classHomework.length > 0) {
      setHomework(classHomework);
    }
  }, [classHomework]);

  React.useEffect(() => {
    StoreService.dispatch(getClassHomeworkReq({}));
  }, []);

  return { homeworkLoading: isLoading, homeworkError: error, homework };
};
