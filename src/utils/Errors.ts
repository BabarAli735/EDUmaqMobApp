import moment from 'moment';
import { logout } from '../redux';
import StoreService from '../redux/StoreService';

export interface ResponseError {
  error: ServerError;
  raisedAt: number;
}

export const responseError = (error: any | string): ResponseError => {
  if (typeof error === 'string') {
    return {
      raisedAt: moment.now(),
      error: {
        message: error,
        statusCode: 0,
      },
    };
  } else {
    if (error?.response?.data) {
      if (error?.response?.data?.StatusCode == 401) {
        StoreService.dispatch(logout());
      }

      return {
        raisedAt: moment.now(),
        error: {
          message: error?.response?.data?.Message ?? 'Something went wrong, Please try later.',
          statusCode: error?.response?.data?.StatusCode ?? 0,
        },
      };
    } else {
      return {
        raisedAt: moment.now(),
        error: {
          message: error.message ? error.message : 'Something went wrong, Please try later.',
          statusCode: error.status ? error.status : 0,
        },
      };
    }
  }
};

export interface ServerError {
  message: string;
  statusCode?: number;
}
