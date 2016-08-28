import React from 'react';
import AssignmentRow from './row';
import I18n from '../../../localization';

export default function ContactRow ({contact, ...props}) {
  return (
    <AssignmentRow
      title={I18n.t('assignments.options.contact.title')}
      icon="user-plus"
      text={contact ? contact.fullName : I18n.t('assignments.options.contact.byline')}
      completed={!!contact}
      enabled
      {...props}
    />
  );
}
