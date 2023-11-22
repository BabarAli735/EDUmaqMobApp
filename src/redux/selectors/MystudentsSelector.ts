import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';
import { useAuthenticationSelector } from './AuthSelectors';
import { complaintListReq, mystudentsRequest,  } from '../actions/StudentsByTeacherActions';
import { myComplaintList } from '../sagas/StudentsByTeacherSagas';

const myStudentsStateSelector = (state: RootState) => state.myStudents;
const complaintListSelector = (state: RootState) => state.complaintList;

export const useMyStudentSelector = () => {
  const { profile } = useAuthenticationSelector();
  const { isLoading, myStudents, error, } = useSelector(myStudentsStateSelector);

  React.useEffect(() => {

    StoreService.dispatch(mystudentsRequest({ teacherid: profile?.id  }));
  }, []);

  const onRetry = () => {

    StoreService.dispatch(mystudentsRequest({ teacherid: profile?.id ?? 0 }));
  };


  return { isLoading, myStudents, error, onRetry};
};


export const useComplaintsSelector = () => {
  const { profile } = useAuthenticationSelector();
  const { loading, complaints, err } = useSelector(complaintListSelector);

  React.useEffect(() => {

    StoreService.dispatch(complaintListReq({ teacherid: profile?.id  }));
  }, []);

  const onRetry = () => {

    StoreService.dispatch(complaintListReq({ teacherid: profile?.id ?? 0 }));
  };


  return { loading, complaints, err,onRetry};
};



