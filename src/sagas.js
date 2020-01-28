import { put, all, takeEvery } from 'redux-saga/effects'
import { request } from './utils'
import {
  REQUESTING_MATH,
  SUCCESS_MATH,
  ERROR_MATH,
} from './constants'

function* sagaAction({ payload }) {
  try {
    const { data } = yield sagaApi(payload)
    yield put({ type: SUCCESS_MATH, payload: { ...data } })
  } catch (error) {
    yield put({ type: ERROR_MATH, payload: { error } })
  }
}

async function sagaApi(payload) {
  return request(
    'http://atlas-231814.appspot.com/calcula',
    payload,    
  )
}

function* saga() {
  yield takeEvery(REQUESTING_MATH, sagaAction)
}

export default function* rootSaga() {
  yield all([
    saga(),
  ])
}