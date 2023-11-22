import React from 'react';
import { useSelector } from 'react-redux';
import { syllabusRequest, useAuthenticationSelector } from '..';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';
import { Syllabus } from './../../data/model/Syllabus';
import { examCategoryRequest, examClassesRequest, examEntriesRequest, examPlannerRequest, examSubjectRequest, marksPostRequest } from '../actions/MarksEntryActions';
import { Alert } from 'react-native';
import { MarksEntryPostReqParam } from '../../data/model/MarksEntry';

const marksEntrySelector = (state: RootState) => state.marksEntry;
const marksPlannerSelector = (state: RootState) => state.examPlanners;
const marksClassesSelector = (state: RootState) => state.examClasses;
const marksSubjectSelector = (state: RootState) => state.examSubjects;
const marksEntriesSelector = (state: RootState) => state.marksEntries;
const marksPostSelector = (state:RootState)=>state.marksPost

export const useMarksEntrySelector = () => {
  const { isLoading, categories, error } = useSelector(marksEntrySelector);



  React.useEffect(() => {
    StoreService.dispatch(examCategoryRequest({ }));
  }, []);



  return { isLoading, categories, error,};
};


export const useMarksPlannerSelector = () => {
  const { isLoading, planners, error } = useSelector(marksPlannerSelector);


  React.useEffect(() => {
    StoreService.dispatch(examPlannerRequest({ }));
  }, []);



  return { loading:isLoading, planners, Error:error,};
};



export const useMarksClassesSelector = () => {
  const { isLoading, classes, error } = useSelector(marksClassesSelector);


  const fetchClasss=({id}:{id:number}) => {
   
    StoreService.dispatch(examClassesRequest({ id:id}));
  }



  return { classLoading:isLoading, classes, ClassError:error,fetchClasss};
};



export const useMarksSubjectSelector = () => {
  const { isLoading, subjects, error } = useSelector(marksSubjectSelector);


  const fetchSubjects=() => {
   
    StoreService.dispatch(examSubjectRequest({}));
  }



  return { subjectLoading:isLoading, subjects, ClassError:error,fetchSubjects};
};



export const useMarksEntriesSelector = () => {
  const { isLoading, entries, error } = useSelector(marksEntriesSelector);


  const fetchMarks=({categoryId,examId,classId,batchId,subjectId}:{categoryId:number,examId:number,classId:number,batchId:number,subjectId:number}) => {
   
    StoreService.dispatch(examEntriesRequest({categoryId,examId,classId,batchId,subjectId}));
  }


  const resetArr = ()=>{
    StoreService.dispatch(resetMarksEntries());

  }


  return { entriesLoading:isLoading, entries, entriesError:error,fetchMarks};
};



export const useMarksPostSelector = () => {
  const { isLoading, response, error } = useSelector(marksPostSelector);


  const postMarks=(data:MarksEntryPostReqParam) => {
   
    StoreService.dispatch(marksPostRequest({marks:data}));
  }



  return { marksLoading:isLoading, response, marksError:error,postMarks};
};