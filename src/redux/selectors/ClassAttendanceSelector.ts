import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { syllabusRequest, useAuthenticationSelector } from '..';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';
import ModalDropdown from 'react-native-modal-dropdown';
import { ClassAttendnaceParams } from '../../data/model/ClassAttendance';
import { classAttendancePostRequest, getClassAttendanceReq } from '../actions/ClassAttendanceActions';
import moment from 'moment';

const classAttendanceGetSelector = (state: RootState) => state.classAttendances;
const classAttendancePostSelector = (state:RootState)=>state.classAttendancePost

export const useClassAttendanceGetSelector = () => {
  const { isLoading, attendances, error } = useSelector(classAttendanceGetSelector);
  
  const [listData, setListData] = useState<any>([]);
  const [isAscending, setIsAscending] = useState(true);
  const ref = useRef<ModalDropdown>();
  const [selectedOption, setSelectedoption] = React.useState<String>('Sort By');
  const fetchAttendances=({classId,batchId}:{classId:number|string,batchId:string|number}) => {
    StoreService.dispatch(getClassAttendanceReq({classId,batchId }));
  }
  const sortNameOrder = () => {
    const sortedList = [...listData].filter(item => item.studentName !== null).sort((a, b) => {
      if (isAscending) {
        return a.studentName.localeCompare(b.studentName);
      } else {
        return b.studentName.localeCompare(a.studentName);
      }
    });

    setListData(sortedList);
    setIsAscending(!isAscending);
  };
  const sortRollNoOrder = () => {
    const sortedList = [...listData].filter(item => item.rollNo !== null).sort((a, b) => {
      if (isAscending) {
        return a.rollNo.localeCompare(b.rollNo);
      } else {
        return b.rollNo.localeCompare(a.rollNo);
      }
    });

    setListData(sortedList);
    setIsAscending(!isAscending);
  };

  const handleSelected = (data: any) => {
    ref.current.hide();
    setSelectedoption(data);
    console.log('====================================');
    if(data==='Sort By Name')sortNameOrder()
    
    if(data==='Sort By Roll No')sortRollNoOrder()
  };
  



  return { isLoading,ref, attendances, error,isAscending,listData,selectedOption,handleSelected, setListData, setIsAscending,fetchAttendances};
};

export const useClassAttendancePostSelector = () => {
  const { isLoading, response, error } = useSelector(classAttendancePostSelector);


  const postAttendance=(data:ClassAttendnaceParams) => {
   
    StoreService.dispatch(classAttendancePostRequest({params:data}));
  }



  return { Loading:isLoading, response, sError:error,postAttendance};
};