import React from 'react';
import { useSelector } from 'react-redux';
import { leaveRequest, leavesRequest, useAuthenticationSelector, useUiSelector } from '..';
import { LeaveDetail, LeaveRequestParams, LeaveStatus } from '../../data';
import { format, getDays } from '../../utils';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';
import moment from 'moment';

const leaveStateSelector = (state: RootState) => state.leave;

export const useLeaveSelector = () => {
  const { isLoading, leaves, error } = useSelector(leaveStateSelector);
  const { profile } = useAuthenticationSelector();
  const { showSnackbar } = useUiSelector();

  const [isRefreshing, setRefreshing] = React.useState<boolean>(false);

  const [status, setStatus] = React.useState<LeaveStatus>(LeaveStatus.TOTAL);
  const [leave, setLeave] = React.useState<LeaveDetail[]>();
  const [count, setCount] = React.useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  React.useEffect(() => {
    if (error) {
      showSnackbar(error?.error.message);
    }
  }, [error]);

  React.useEffect(() => {
    if (leaves && leaves.length > 0) {
      setCount({
        total: leaves.length,
        pending: leaves.filter(item => item.leaveStatus === LeaveStatus.PENDING).length,
        approved: leaves.filter(item => item.leaveStatus === LeaveStatus.APPROVED).length,
        rejected: leaves.filter(item => item.leaveStatus === LeaveStatus.REJECTED).length,
      });

      const leave = status !== LeaveStatus.TOTAL ? leaves.filter(item => item.leaveStatus === status) : leaves;
      setLeave(leave);
    }
  }, [leaves, status]);

  React.useEffect(() => {
    StoreService.dispatch(leavesRequest({ id: profile?.id }));
  }, []);

  const filter = (status: LeaveStatus) => {
    setStatus(status);
  };

  const onRetry = () => {
    setRefreshing(false);
    StoreService.dispatch(leavesRequest({ id: profile?.id }));
  };

  const onRefresh = () => {
    setRefreshing(true);
    StoreService.dispatch(leavesRequest({ id: profile?.id }));
  };

  return { isLoading, error, leave, status, count, filter, onRetry, onRefresh, isRefreshing, setRefreshing };
};

export const useLeaveRequestSelector = () => {
  const { isLoading } = useSelector(leaveStateSelector);
  const { profile } = useAuthenticationSelector();
  const { showSnackbar } = useUiSelector();

  const [fromDate, setFromDate] = React.useState<string>();
  const [toDate, setToDate] = React.useState<string>();
  const [duration, setDuration] = React.useState<string>();
  const [reason, setReason] = React.useState<string>();

  React.useEffect(() => {
    setFromDate(undefined);
    setToDate(undefined);
    setDuration(undefined);
    setReason(undefined);
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      setFromDate(undefined);
      setToDate(undefined);
      setDuration(undefined);
      setReason(undefined);
    }
  }, [isLoading]);

  React.useEffect(() => {
    if (fromDate && toDate) {
      var admission = moment(fromDate, 'DD-MM-YYYY');
      var discharge = moment(toDate, 'DD-MM-YYYY');
      var abc = discharge.diff(admission, 'days');
      setDuration(abc + '');
    }
  }, [fromDate, toDate]);

  const apply = () => {
    if (!fromDate) {
      showSnackbar('Please select start date.');
    } else if (!toDate) {
      showSnackbar('Please select end date.');
    } else if (!duration) {
      showSnackbar('End date should not be same as start date.');
    } else if (!reason || reason.length === 0) {
      showSnackbar('Please enter reason for leave.');
    } else {
      const leave: LeaveRequestParams = {
        admissionId: profile?.id,
        fromDate: fromDate,
        toDate: toDate,
        requiredDays: duration,
        reason: reason,
        source: 'Mobile',
      };

      StoreService.dispatch(
        leaveRequest({
          leave: leave,
          onSuccess: () => {
            StoreService.dispatch(leavesRequest({ id: profile?.id }));
          },
        }),
      );
    }
  };

  return { isLoading, fromDate, setFromDate, toDate, setToDate, duration, reason, setReason, apply };
};
