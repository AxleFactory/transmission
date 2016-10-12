import * as AnalyticsEvents from '../constants/analytics';
import { Answers, Crashlytics } from 'react-native-fabric';
import Branch from 'react-native-branch';
import { Alert, Platform } from 'react-native';
import I18n from '../localization';
import * as TagActions from '../actions/tags';
import store from '../store';

const assignmentId = (id) => `assignment-${id}`;
const textActionId = (id) => `text-action-${id}`;
const callActionId = (id) => `call-action-${id}`;
const branchUniversalObject = Branch.createBranchUniversalObject('transmission');

// Listen for app opens resulting from external links
Branch.subscribe(({params, error, uri}) => {
  if (params) {
    store.dispatch(TagActions.setTags(params));
    if (params.email) {
      setUserEmail(params.email);
      Alert.alert(
        I18n.t('user.loggedInTitle'),
        I18n.t('user.loggedInMessage', {email: params.email}),
      );
    }
    logEvent(AnalyticsEvents.OPEN_BRANCH_LINK, params);
  } else {
    logEvent(AnalyticsEvents.OPEN_APP_LINK, {uri});
  }
  if (error) {
    logError(error);
  }
});

/**
 * Logs an event to Answers.
 * NOTE: Must cast numbers as strings, or otherwise the analytics will
 * display them in a graph, rather than a table
 */
export function logEvent(name, customAttributes = null) {
  Answers.logCustom(name, customAttributes);
}

export function logError(message) {
  if (Platform.OS === 'android') {
    Crashlytics.logException(message);
  } else {
    Crashlytics.recordError(message);
  }
}

export function logContentView(...args) {
  // Usage: logContentView(contentName, contentType, contentId, customAttributes)
  Answers.logContentView(...args);
}

export function logAssignment(assignment) {
  const {id, name} = assignment;
  logContentView(String(name), 'Assignment', assignmentId(id));
}

export function logTextAction(assignment, action) {
  Branch.userCompletedAction(AnalyticsEvents.TEXT_CONTACT);
  logEvent(AnalyticsEvents.TEXT_CONTACT, {
    'Assignment ID': assignmentId(assignment.id),
    'Assignment Name': String(assignment.name),
    'Text Action ID': textActionId(action.id),
    'Text Action Name': String(action.name)
  });
}

export function logCallAction(assignment, action) {
  Branch.userCompletedAction(AnalyticsEvents.CALL_CONTACT);
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

export const setUserEmail = email => {
  Branch.setIdentity(email);
  Crashlytics.setUserEmail(email);
};
