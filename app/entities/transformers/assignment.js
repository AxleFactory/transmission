const placeholders = {
  firstName: /\{\{contact\.firstName\}\}/g,
  referralUrl: /\{\{referralUrl\}\}/g
};

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

export function transformCallAction ({contact, referralUrl}) {
  return callAction => ({
    ...callAction,
    callScript: replacePlaceholders(callAction.callScript, {firstName: contact.firstName, referralUrl})
  });
}

export function transformTextAction ({contact, referralUrl}) {
  return textAction => ({
    ...textAction,
    messageContent: replacePlaceholders(textAction.messageContent, {firstName: contact.firstName, referralUrl})
  });
}

export function replacePlaceholders (content, substitutionsObject) {
  let updatedContent = content;
  Object.keys(substitutionsObject).forEach(sub => {
    if (substitutionsObject.hasOwnProperty(sub) && substitutionsObject.hasOwnProperty(sub)) {
      updatedContent = updatedContent.replace(placeholders[sub], substitutionsObject[sub]);
    }
  });
  return updatedContent;
}
