import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';
import { myCoursesRequest } from '../actions';
import { useAuthenticationSelector } from './AuthSelectors';

const myCoursesStateSelector = (state: RootState) => state.myCourses;

export const useMyCoursesSelector = () => {
  const { profile } = useAuthenticationSelector();
  const { myCourses, isLoading, error } = useSelector(myCoursesStateSelector);

  React.useEffect(() => {
    getMyCourses(profile?.classId, profile?.batchId);
  }, []);

  const getMyCourses = (classId?: number, batchId?: number) => {
    StoreService.dispatch(myCoursesRequest({ classId, batchId }));
  };

  return { myCourses, isLoading, error, getMyCourses };
};
