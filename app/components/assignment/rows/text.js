import React from 'react';
import AssignmentRow from './row';
import I18n from '../../../localization';

export default function TextRow ({contact, ...props}) {
  const contactName = contact ? contact.firstName : I18n.t('assignments.nameFallback');
  return (
    <AssignmentRow
      title={I18n.t('assignments.options.text.title', {contactName})}
      icon="comment"
      {...props}
    />
  );
}
