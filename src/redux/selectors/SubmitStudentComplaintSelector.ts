import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';
import { useAuthenticationSelector } from './AuthSelectors';
import { complaintListReq, studentComplaintSubmitReq } from '../actions/StudentsByTeacherActions';

const submitStudentComplaintStateSelector = (state: RootState) => {
    
    return state.submitComplaintStudent};

export const useSubmitComplaintStudentSelector = () => {
  const { profile } = useAuthenticationSelector();
  const { isLoading, responseData, error } = useSelector(submitStudentComplaintStateSelector);
  
const submitComplaint=async(params)=>{
    await StoreService.dispatch(studentComplaintSubmitReq(params))
    await setTimeout(()=>{
     StoreService.dispatch(complaintListReq({ teacherid: profile?.id  }));
    },200)

 }

 return { isLoading, responseData, error, submitComplaint };
};


