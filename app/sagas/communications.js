import {NativeModules} from 'react-native';
import {takeEvery} from 'redux-saga';
import {call, fork, select} from 'redux-saga/effects';
import {contactSelector, assignmentSelector} from '../selectors/assignment';
import * as Analytics from '../utils/analytics';
import * as Types from '../actions/types';
import Communications from 'react-native-communications';

export function* callContact ({callAction}) {
  var contact = yield select(contactSelector);
  var assignment = yield select(assignmentSelector);
  yield call(Analytics.logCallAction, assignment.id, callAction);
  yield Communications.phonecall(String(contact.phoneNumber), false);
}

export function* textContact ({textAction}) {
  var contact = yield select(contactSelector);
  var assignment = yield select(assignmentSelector);
  var {textActions} = assignment;
  var textActionMatch = textActions.filter(text => text.id === textAction);
  var message = textActionMatch.length > 0 ? textActionMatch[0].messageContent : textActions[0].messageContent;
  yield call(Analytics.logTextAction, assignment.id, textAction);
  yield Communications.text(String(contact.phoneNumber), message);
}

export function* watchCallContact () {
  yield takeEvery(Types.CALL_CONTACT, callContact);
}

export function* watchTextContact () {
  yield takeEvery(Types.TEXT_CONTACT, textContact);
}

export default function* saga () {
  yield [
    fork(watchCallContact),
    fork(watchTextContact)
  ];
}
