import React from 'react';
import { useSelector } from 'react-redux';
import { getClassClassworkReq, useUiSelector } from '..';
import { ClassClassworkDetail } from '../../data';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const classClassworkStateSelector = (state: RootState) => state.classClasswork;

export const useClassClassworkSelector = () => {
  const [classwork, setClasswork] = React.useState<ClassClassworkDetail[]>();
  const { isLoading, classClasswork, error } = useSelector(classClassworkStateSelector);
  const { showSnackbar } = useUiSelector();

  React.useEffect(() => {
    if (error) {
      showSnackbar(error?.error.message);
    }
  }, [error]);

  React.useEffect(() => {
    if (classClasswork && classClasswork.length > 0) {
      setClasswork(classClasswork);
    }
  }, [classClasswork]);

  React.useEffect(() => {
    StoreService.dispatch(getClassClassworkReq({}));
  }, []);

  return { classworkLoading: isLoading, classworkError: error, classwork };
};
