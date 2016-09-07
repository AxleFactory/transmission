import * as AnalyticsEvents from '../constants/analytics';
import {Answers} from 'react-native-fabric';
import branch from 'react-native-branch';

const assignmentId = (id) => `assignment-${id}`;

/**
 * Logs an event to Answers.
 * NOTE: Must cast numbers as strings, or otherwise the analytics will
 * display them in a graph, rather than a table
 */
export function logEvent (name, customAttributes = null) {
  Answers.logCustom(name, customAttributes);
}

export function logContentView (...args) {
  // Usage: logContentView(contentName, contentType, contentId, customAttributes)
  Answers.logContentView(...args);
}

export function logAssignment (assignment) {
  const {id, name} = assignment;
  logContentView(String(name), 'Assignment', assignmentId(id));
}

export function logTextAction (assignmentId, actionId) {
  branch.userCompletedAction(AnalyticsEvents.TEXT_CONTACT);
  logEvent(AnalyticsEvents.TEXT_CONTACT, {
    'Assignment ID': String(assignmentId),
    'Text Action ID': String(actionId)
  });
}

export function logCallAction (assignmentId, actionId) {
  branch.userCompletedAction(AnalyticsEvents.CALL_CONTACT);
  logEvent(AnalyticsEvents.CALL_CONTACT, {
    'Assignment ID': String(assignmentId),
    'Call Action ID': String(actionId)
  });
}
