import React from 'react';
import { useSelector } from 'react-redux';
import { getClassAssignmentReq, useUiSelector } from '..';
import { ClassAssignmentDetail } from '../../data';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';

const classAssignmentStateSelector = (state: RootState) => state.classAssignment;

export const useClassAssignmentSelector = () => {
  const [assignment, setAssignment] = React.useState<ClassAssignmentDetail[]>();
  const { isLoading, classAssignment, error } = useSelector(classAssignmentStateSelector);
  const { showSnackbar } = useUiSelector();

  React.useEffect(() => {
    if (error) {
      showSnackbar(error?.error.message);
    }
  }, [error]);

  React.useEffect(() => {
    if (classAssignment && classAssignment.length > 0) {
      setAssignment(classAssignment);
    }
  }, [classAssignment]);

  React.useEffect(() => {
    StoreService.dispatch(getClassAssignmentReq({}));
  }, []);

  return { assignmentLoading: isLoading, assignmentError: error, assignment };
};
