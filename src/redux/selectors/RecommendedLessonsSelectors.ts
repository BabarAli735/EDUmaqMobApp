import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';
import { recommendedLessonsRequest } from '../actions';
import { useAuthenticationSelector } from './AuthSelectors';

const recommendedLessonsStateSelector = (state: RootState) => state.recommendedLessons;

export const useRecommendedLessonsSelector = () => {
  const { profile } = useAuthenticationSelector();
  const { recommendedLessons, isLoading, error } = useSelector(recommendedLessonsStateSelector);

  React.useEffect(() => {
    getRecommendedLessons(profile?.classId, profile?.batchId);
  }, []);

  const getRecommendedLessons = (classId?: number, batchId?: number) => {
    StoreService.dispatch(recommendedLessonsRequest({ classId, batchId }));
  };

  return { recommendedLessons, isLoading, error, getRecommendedLessons };
};
