import {
    REQUESTING_MATH,
} from './constants'

export default function action(payload) {
  return {
    type: REQUESTING_MATH,
    payload,
  }   
}