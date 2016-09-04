import {createSelector} from 'reselect';
import {transformContactEntity} from '../entities/transformers/contact';
import {LETTERS} from '../constants/letters';
import {uniqBy} from 'lodash/array';

const contactEntitiesSelector = state => state.entities.contact;

const contactsSelector = createSelector(
  contactEntitiesSelector,
  (contactEntities) => {
    let result = Object.keys(contactEntities)
    // map the collection of entities into transformed contact objects
    .map(contactId => transformContactEntity(contactEntities[contactId]))
    // flatten the collection into contacts-by-number
    .reduce((contacts, contact) => {
      const byNumber = contact.phoneNumbers.map(({label, formattedNumber}) => ({
        ...contact,
        label,
        phoneNumber: formattedNumber
      }));
      return contacts.concat(byNumber);
    }, []);
    // Remove duplicate phone numbers
    result = uniqBy(result, 'phoneNumber')
    // sort the collection by name
    .sort((a, b) => {
      if (a.firstName > b.firstName) {
        return 1;
      }
      if (a.firstName < b.firstName) {
        return -1;
      }
      if (a.lastName > b.lastName) {
        return 1;
      }
      if (a.lastName < b.lastName) {
        return -1;
      }
      return 0;
    })
    // transform the collection into a letter map
    .reduce((contactsByName, contact) => {
      let letter = contact.fullName.charAt(0);
      if (letter) {
        letter = letter.toUpperCase();
      }

      if (LETTERS.indexOf(letter) === -1) {
        letter = '#';
      }

      const contactsAtLetter = contactsByName[letter] || [];

      return {
        ...contactsByName,
        [letter]: [...contactsAtLetter, contact]
      };
    }, {});

    return result;
  }
);

export default createSelector(
  contactsSelector,
  (contacts) => ({contacts})
);
