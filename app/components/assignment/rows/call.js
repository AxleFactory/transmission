import React from 'react';
import AssignmentRow from './row';
import I18n from '../../../localization';

export default function CallRow ({contact, callAction, ...props}) {
  const contactName = contact ? contact.firstName : I18n.t('assignments.nameFallback');
  return (
    <AssignmentRow
      title={I18n.t('assignments.options.call.title', {contactName})}
      text={contact ? callAction.callScript : callAction.name}
      icon="phone"
      enabled={!!contact}
      {...props}
    />
  );
}
