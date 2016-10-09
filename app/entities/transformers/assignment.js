import mustache from 'mustache';
mustache.escape = (value) => value;  // override mustache's escape function to allow unescaped URLs

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
    callScript: mustache.render(callAction.callScript, params)
  });
}

function transformTextAction (params) {
  return textAction => ({
    ...textAction,
    messageContent: mustache.render(textAction.messageContent, params)
  });
}
