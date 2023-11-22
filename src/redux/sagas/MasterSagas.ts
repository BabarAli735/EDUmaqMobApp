import { call, put } from 'redux-saga/effects';
import { CityResponse, CountryResponse, getCities, getCountries, getStates, StateResponse } from '../../data';
import { responseError } from '../../utils';
import { masterFailed, MasterRequest, masterSuccess } from '../actions';

export function* masterSaga({ onSuccess, onError }: MasterRequest) {
  try {
    const country: CountryResponse = yield call(getCountries);
    const states: StateResponse = yield call(getStates);
    const cities: CityResponse = yield call(getCities);

    yield put(masterSuccess(country ? country : [], states ? states : [], cities ? cities : []));
    onSuccess && onSuccess();
  } catch (error: any) {
    yield put(masterFailed(responseError(error)));
    onError && onError();
  }
}
