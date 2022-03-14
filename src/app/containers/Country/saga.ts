import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from './actions';

export function* fetchCountry({ payload }: any) {
  const requestURL = `https://api.carerev.com/api/v1/countries/${payload}`;

  try {
    const country = yield call(request, requestURL);
    console.log({ fish: country });
    yield put(actions.fetchCountrySuccess(country));
  } catch (err: any) {
    yield put(actions.fetchCountryError(err.toString()));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* saga() {
  yield takeLatest(actions.fetchCountry.type, fetchCountry);
}
