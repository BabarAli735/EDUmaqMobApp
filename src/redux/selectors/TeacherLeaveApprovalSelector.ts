
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {useAuthenticationSelector, useUiSelector } from '..';
import { ApiEndpoints, getInstitute, getToken } from '../../data';
import { putAcceptReject } from '../../data/services/teacher/LeaveApprovalService';
import { teacherLeaveApprovalRequest } from '../actions/TeacherLeaveApprovalActions';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const teacherLeaveApprovalStateSelector = (state: RootState) => state.teacherLeaveApproval;

export const useTeacherLeaveApprovalSelector = () => {

  
 
  const { isLoading, teacherLeaveApproval, error } = useSelector(teacherLeaveApprovalStateSelector);
  const { profile } = useAuthenticationSelector();
  const {showSnackbar} = useUiSelector();
  const [acceptLoading,setAccept]=useState(false);
  const [rejectLoading,setReject]=useState(false);
  // profile?.classId ??
  // profile?.batchId ??
 
  React.useEffect(() => {
    StoreService.dispatch(teacherLeaveApprovalRequest({ classId:  profile?.classId, batchId:  profile?.batchId }));
  }, []);


  const acceptReject = async (id,leaveStatus,reason,remarks) => {
   leaveStatus=='Accepted'?setAccept(true):setReject(true);
    let obj ={
      "id": id,
      "reason": reason, 
      "remarks": remarks,
      "leaveStatus": leaveStatus
      }

      putAcceptReject(obj).then(res=>{
            setAccept(false);
             setReject(false);
             console.log(res);
             onRetry();
      }).catch(err=>{
        setAccept(false)
        setReject(false)
      })
      // const token = await getToken();
      // getInstitute().then(institute =>
      //   {
      //    const headers= { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' }
      //    axios.put(ApiEndpoints.BASE_API_URL + ApiEndpoints.TEACHER_LEAVE_ACCEPT_REJECT+'/'+id, obj,{ headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token ?? '', ...headers }})
      //    .then(response => {
      //      setAccept(false)
      //      setReject(false)
      //      console.log(response)
      //          // onRetry();
      //    })
      //    .catch(error => {
      //      setAccept(false)
      //      setReject(false)
      //        console.log(error)
      //        if (error) {
      //            // showSnackbar(error?.error.message);
      //        }
      //    });
      //   }

      // );

 
};

  

  const onRetry = () => {
    StoreService.dispatch(teacherLeaveApprovalRequest({ classId:  profile?.classId, batchId:  profile?.batchId }));
  };

  return { isLoading, teacherLeaveApproval,acceptReject,acceptLoading,rejectLoading, error, onRetry };
};
