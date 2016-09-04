import {NativeModules} from 'react-native';
import * as AnalyticsEvents from '../constants/analytics';
const {AnswersModule} = NativeModules;
import branch from 'react-native-branch';

/**
 * Logs an event to Answers.
 * NOTE: Must cast numbers as strings, or otherwise the analytics will
 * display them in a graph, rather than a table
 */
export function logEvent (name, customAttributes = null) {
  // AnswersModule.logEvent(name, customAttributes);
}

export function logAssignment (id) {
  // logEvent(AnalyticsEvents.SELECT_ASSIGNMENT, {
  //   'Assignment ID': String(id)
  // });
}

export function logTextAction (assignmentId, actionId) {
  branch.userCompletedAction(AnalyticsEvents.TEXT_CONTACT);
  // logEvent(AnalyticsEvents.TEXT_CONTACT, {
  //   'Assignment ID': String(assignmentId),
  //   'Text Action ID': String(actionId)
  // });
}

export function logCallAction (assignmentId, actionId) {
  branch.userCompletedAction(AnalyticsEvents.CALL_CONTACT);
  // logEvent(AnalyticsEvents.CALL_CONTACT, {
  //   'Assignment ID': String(assignmentId),
  //   'Call Action ID': String(actionId)
  // });
}
