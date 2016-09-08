import * as AnalyticsEvents from '../constants/analytics';
import {Answers} from 'react-native-fabric';
import branch from 'react-native-branch';
import {Alert} from 'react-native';

const assignmentId = (id) => `assignment-${id}`;
const textActionId = (id) => `text-action-${id}`;
const callActionId = (id) => `call-action-${id}`;
const branchUniversalObject = branch.createBranchUniversalObject('transmission');

// Listen for app opens resulting from external links
branch.subscribe(({params}) => {
  if (params && params.email) {
    setIdentity(params.email);
    Alert.alert(
      'Email Updated!',
      `You are logged in as ${params.email}.`,
    );
  }
});

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

export function logTextAction (assignment, action) {
  branch.userCompletedAction(AnalyticsEvents.TEXT_CONTACT);
  logEvent(AnalyticsEvents.TEXT_CONTACT, {
    'Assignment ID': assignmentId(assignment.id),
    'Assignment Name': String(assignment.name),
    'Text Action ID': textActionId(action.id),
    'Text Action Name': String(action.name)
  });
}

export function logCallAction (assignment, action) {
  branch.userCompletedAction(AnalyticsEvents.CALL_CONTACT);
  logEvent(AnalyticsEvents.CALL_CONTACT, {
    'Assignment ID': assignmentId(assignment.id),
    'Assignment Name': String(assignment.name),
    'Call Action ID': callActionId(action.id),
    'Call Action Name': String(action.name)
  });
}

export const getBranchReferralLink = () => branchUniversalObject.generateShortUrl({
  feature: 'referral',
  // alias: null,
  channel: 'In-App Invite'
});

export const setIdentity = (identity) => branch.setIdentity(identity);
