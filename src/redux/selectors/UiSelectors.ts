import React from 'react';
import { useSelector } from 'react-redux';
import { clearMessage, introduction, showMessage } from '..';
import { isIntroduction as isIntro, setIntroduction } from '../../data';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const uiStateSelector = (state: RootState) => state.ui;

export const useUiSelector = () => {
  const { message, isError, isIntroduction } = useSelector(uiStateSelector);

  const showSnackbar = (message: string, isError?: boolean) => {
    StoreService.dispatch(showMessage({ message: message, isError: isError }));
  };

  const hideSnackbar = () => {
    StoreService.dispatch(clearMessage());
  };

  React.useEffect(() => {
    if (!isIntroduction) {
      isIntro().then(value => {
        StoreService.dispatch(introduction({ isIntroduction: value }));
      });
    }
  }, []);

  const finishIntro = async () => {
    await setIntroduction(true);
    StoreService.dispatch(introduction({ isIntroduction: true }));
  };

  return { message, isSnackbar: !!message, isError, showSnackbar, hideSnackbar, isIntroduction, finishIntro };
};
