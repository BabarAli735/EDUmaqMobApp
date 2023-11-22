import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';
import { learnWithVideoRequest } from '../actions';
import { useAuthenticationSelector } from './AuthSelectors';

const learnWithVideoStateSelector = (state: RootState) => state.learnWithVideo;

export const useLearnWithVideoSelector = () => {
  const { profile } = useAuthenticationSelector();
  const { learnWithVideos, isLoading, error } = useSelector(learnWithVideoStateSelector);

  React.useEffect(() => {
    if (!learnWithVideos) {
      getLearnWithVideo(profile?.classId);
    }
  }, []);

  const getLearnWithVideo = (classId?: number) => {
    StoreService.dispatch(learnWithVideoRequest({ classId }));
  };

  return { learnWithVideos, isLoading, error, getLearnWithVideo };
};
