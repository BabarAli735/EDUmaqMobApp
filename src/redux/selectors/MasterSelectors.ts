import React from 'react';
import { useSelector } from 'react-redux';
import { masterRequest } from '..';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const masterStateSelector = (state: RootState) => state.master;

export const useMasterSelector = () => {
  const { isLoading, country, state, city, error } = useSelector(masterStateSelector);

  React.useEffect(() => {
    if (!isLoading && (!country || !state || !city)) {
      StoreService.dispatch(masterRequest({}));
    }
  }, []);

  return { country, state, city };
};
