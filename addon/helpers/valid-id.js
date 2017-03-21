import Ember from 'ember';

// Alter a text string ensure it's a Valid HTML ID or Name string, AND selector safe.
// This is important because many DOM queries won't work with invalid characters
export function validId([str]) {
  if (!/^[A-Za-z]+[\w\-\:\.]*$/.test(str)) {
    // Remove illegal characters
    return str.replace(/^[^a-z]+|[^\w-]+/gi, '');
  }
  return str;
}

export default Ember.Helper.helper(validId);
