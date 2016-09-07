import {NativeModules, Platform} from 'react-native';
import {takeEvery} from 'redux-saga';
import {call, fork, select} from 'redux-saga/effects';
import {contactSelector, assignmentSelector} from '../selectors/assignment';
import * as Analytics from '../utils/analytics';
import * as Types from '../actions/types';
import Communications from 'react-native-communications';

const {CommunicationsModule} = NativeModules;

export function* callContact ({callAction}) {
  const contact = yield select(contactSelector);
  const assignment = yield select(assignmentSelector);
  yield call(Analytics.logCallAction, assignment, callAction);
  if (Platform.OS === 'ios') {
    yield Communications.phonecall(String(contact.phoneNumber), false);
  } else {
    yield call(CommunicationsModule.createPhoneCall, contact.phoneNumber);
  }
}

export function* textContact ({textAction}) {
  const contact = yield select(contactSelector);
  const assignment = yield select(assignmentSelector);
  const {textActions} = assignment;
  const textActionMatch = textActions.filter(text => text.id === textAction);
  const message = textActionMatch.length > 0 ? textActionMatch[0].messageContent : textActions[0].messageContent;
  yield call(Analytics.logTextAction, assignment, textActionMatch[0]);
  if (Platform.OS === 'ios') {
    yield Communications.text(String(contact.phoneNumber), message);
  } else {
    yield call(CommunicationsModule.createSMSMessage, contact.phoneNumber, message);
  }
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
