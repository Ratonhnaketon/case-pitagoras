import {
  REQUESTING_MATH,
  SUCCESS_MATH,
  ERROR_MATH,
} from './constants'

import { combineReducers } from 'redux'
 
const initialState = {
  hypotenuse: 0,
  requesting: false,
  success: false,
  error: '',
}

export function reducer(state = initialState, { payload, type }) {
  switch (type) {
    case REQUESTING_MATH:
      return {
        ...state,
        requesting: true,
        success: false,
      }
    case SUCCESS_MATH:
      return {
        ...state,
        hypotenuse: payload.hip,
        requesting: false,
        success: true,
      }
    case ERROR_MATH:
      return {
        requesting: false,
        success: false,
        error: payload.error
      }
    default:
      return state
    }
  }

  export default combineReducers({ reducer })