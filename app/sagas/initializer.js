import {takeEvery} from 'redux-saga';
import {fork, put} from 'redux-saga/effects';
import * as AssignmentActions from '../actions/assignments';
import * as ContactActions from '../actions/contacts';
import * as UserActions from '../actions/user';

export function* loadContacts () {
  yield put(ContactActions.getContacts());
}

export function* loadAssignments () {
  yield put(AssignmentActions.getAssignments());
}

export function* loadUser () {
  yield put(UserActions.getReferralUrl());
}

export function* initialize () {
  yield [
    fork(loadContacts),
    fork(loadAssignments),
    fork(loadUser)
  ];
}

export default function* saga () {
  yield takeEvery('REDUX_STORAGE_LOAD', initialize);
}
