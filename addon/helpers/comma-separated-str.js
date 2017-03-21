import Ember from 'ember';

/*
 *  arr       : array of items to join with commas
 *  emptyText : text to display if there is nothing to join
 */
export function commaSeparatedStr([arr, emptyText]) {
  if (Ember.typeOf(arr) !== 'array') {
    console.error('helper:comma-separated-str: first parameter must be an array. Recieved:', arr);
    return;
  }
  return arr.join(', ') || emptyText || '';
}

export default Ember.Helper.helper(commaSeparatedStr);
