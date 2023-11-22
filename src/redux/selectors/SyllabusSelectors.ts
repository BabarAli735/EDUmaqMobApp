import React from 'react';
import { useSelector } from 'react-redux';
import { syllabusRequest, useAuthenticationSelector } from '..';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';
import { Syllabus } from './../../data/model/Syllabus';

const syllabusStateSelector = (state: RootState) => state.syllabus;

export const useSyllabusSelector = () => {
  const { isLoading, syllabus, error } = useSelector(syllabusStateSelector);
  const { profile } = useAuthenticationSelector();

  const [syllabusDetail, setSyllabusDetail] = React.useState<Syllabus>();

  React.useEffect(() => {
    StoreService.dispatch(syllabusRequest({ id: profile?.id }));
  }, []);

  React.useEffect(() => {
    if (syllabus && syllabus.length > 0) {
      setSyllabusDetail(syllabus[0]);
    }
  }, [syllabus]);

  const retry = () => {
    StoreService.dispatch(syllabusRequest({ id: profile?.id }));
  };

  return { isLoading, syllabus, error, retry, syllabusDetail, setSyllabusDetail};
};
