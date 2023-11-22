import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';
import { trendingChapterRequest } from '../actions';
import { useAuthenticationSelector } from './AuthSelectors';

const trendingChapterStateSelector = (state: RootState) => state.trendingChapter;

export const useTrendingChapterSelector = () => {
  const { profile } = useAuthenticationSelector();
  const { trendingChapters, isLoading, error } = useSelector(trendingChapterStateSelector);

  React.useEffect(() => {
    getTrendingChapter(profile?.classId, profile?.batchId);
  }, []);

  const getTrendingChapter = (classId?: number, batchId?: number) => {
    StoreService.dispatch(trendingChapterRequest({ classId, batchId }));
  };

  return { trendingChapters, isLoading, error, getTrendingChapter };
};
