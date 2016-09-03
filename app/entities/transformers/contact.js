import {PhoneNumberUtil} from 'google-libphonenumber';
const phoneUtil = PhoneNumberUtil.getInstance();

export function transformContactEntity (contact) {
  return {
    id: contact.recordID,
    firstName: contact.givenName,
    lastName: contact.familyName,
    fullName: `${contact.givenName || ''} ${contact.familyName || ''}`,
    emailAddresses: contact.emailAddresses,
    phoneNumbers: contact.phoneNumbers.map(cleanPhoneNumber)
  };
}

function cleanPhoneNumber (phoneNumberEntry) {
  let formattedNumber = null;

  try {
    const phoneNumber = phoneUtil.parse(phoneNumberEntry.number, 'US');
    formattedNumber = phoneUtil.format(phoneNumber, 'US');
  } catch (e) {
    formattedNumber = phoneNumberEntry.number.replace(/[^0-9.]/g, '');
  }
  return {
    ...phoneNumberEntry,
    formattedNumber
  };
}
