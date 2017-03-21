import Ember from 'ember';

const { assert } = Ember;

export function timeFormat(/*params, hash*/) {
  assert('{{time-format}} has been removed, switch to {{moment-format}}.');
  return;
}

export default Ember.Helper.helper(timeFormat);
