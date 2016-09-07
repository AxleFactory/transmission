import {GET_REFERRAL_URL} from '../actions/types';

const initialState = {};

export default function assignmentsReducer (state = initialState, action) {
  if (action.type !== GET_REFERRAL_URL) {
    return state;
  }
  switch (action.status) {
    case 'request':
      return {
        ...state,
      };
    case 'success':
      return {
        ...state,
        referralUrl: action.response.url
      };
    case 'failure':
      return {
        ...state,
        referralUrl: null
      };
    default:
      return state;
  }
}
