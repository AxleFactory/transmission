// const BASE_URL = 'https://organize.berniesanders.com';

// export function getAssignments () {
//   return fetch(`${BASE_URL}/contact-assignments.json?platform=android`)
//   .then(response => response.json());
// }

import mock from '../../mock/assignments.json';
export function getAssignments () {
  return new Promise(resolve => {
    setTimeout(() => resolve(mock), 200);
  });
}
