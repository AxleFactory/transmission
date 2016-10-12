import { SET_TAGS } from '../actions/types';

const initialState = {};

export default function tagReducer(state = initialState, action) {
  if (action.type == SET_TAGS) {
    return {
      ...state,
      ...action.tags
    };
  }
  else {
    return state
  }
}
