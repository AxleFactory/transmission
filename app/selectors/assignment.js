import {createSelector} from 'reselect';
import {transformAssignmentEntity} from '../entities/transformers/assignment';
import {transformContactEntity} from '../entities/transformers/contact';

const currentUserSelector = state => state.user;
const tagsSelector = state => state.tags;
const assignmentEntitiesSelector = state => state.entities.assignment;
const contactEntitiesSelector = state => state.entities.contact;
const selectedAssignmentSelector = state => state.assignment.assignment;
const selectedContactSelector = state => state.assignment.contact;
const selectedContactNumberSelector = state => state.assignment.contactNumber;
const historySelector = state => state.assignmentHistory;

export const contactSelector = createSelector(
  contactEntitiesSelector,
  selectedContactSelector,
  selectedContactNumberSelector,
  (contactEntities, selectedContact, phoneNumber) => {
    var contact = contactEntities[selectedContact];
    if (contact) {
      return {
        ...transformContactEntity(contact),
        phoneNumber
      };
    }
    return null;
  }
);

export const assignmentSelector = createSelector(
  assignmentEntitiesSelector,
  selectedAssignmentSelector,
  contactSelector,
  currentUserSelector,
  tagsSelector,
  (assignmentEntities, selectedAssignment, contact, user, tags) => {
    var assignment = assignmentEntities[selectedAssignment];
    if (assignment) {
      console.log({...user, ...tags});
      return transformAssignmentEntity(assignment, {...tags, ...user, contact});
    }
    return null;
  }
);

export const completedCallActionsSelector = createSelector(
  contactSelector,
  assignmentSelector,
  historySelector,
  (contact, assignment, history) => {
    const assignmentHistory = history[assignment.id] || {};
    if (contact && assignmentHistory[contact.id]) {
      return Object.keys(assignmentHistory[contact.id].callActions);
    }
    return [];
  }
);

export const completedTextActionsSelector = createSelector(
  contactSelector,
  assignmentSelector,
  historySelector,
  (contact, assignment, history) => {
    const assignmentHistory = history[assignment.id] || {};
    if (contact && assignmentHistory[contact.id]) {
      return Object.keys(assignmentHistory[contact.id].textActions);
    }
    return [];
  }
);

export default createSelector(
  assignmentSelector,
  contactSelector,
  completedCallActionsSelector,
  completedTextActionsSelector,
  (assignment, contact, completedCalls, completedTexts) => ({assignment, contact, completedCalls, completedTexts})
);
