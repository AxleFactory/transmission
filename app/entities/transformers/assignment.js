import {render} from 'mustache';

export function transformAssignmentEntity (assignment, substitutions) {
  if (!substitutions || ! substitutions.contact) {
    return assignment;
  }

  return {
    ...assignment,
    callActions: assignment.callActions.map(transformCallAction(substitutions)),
    textActions: assignment.textActions.map(transformTextAction(substitutions))
  };
}

function transformCallAction (params) {
  return callAction => ({
    ...callAction,
    callScript: render(callAction.callScript, params)
  });
}

function transformTextAction (params) {
  return textAction => ({
    ...textAction,
    messageContent: render(textAction.messageContent, params)
  });
}
