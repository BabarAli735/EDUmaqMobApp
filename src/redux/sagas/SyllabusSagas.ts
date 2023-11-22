import { call, put } from 'redux-saga/effects';
import { getSyllabus, SyllabusResponse } from '../../data';
import { responseError } from '../../utils';
import { syllabusFailed, SyllabusRequest, syllabusSuccess } from '../actions';

export function* syllabusSaga({ id, onSuccess, onError }: SyllabusRequest) {
  try {
    const response: SyllabusResponse = yield call(getSyllabus, { id: id });
    if (response && response.length > 0) {
      yield put(syllabusSuccess(response));
      onSuccess && onSuccess();
    } else {
      yield put(syllabusFailed(responseError('Syllabus not available.')));
      onError && onError();
    }
  } catch (error: any) {
    yield put(syllabusFailed(responseError(error)));
    onError && onError();
  }
}
