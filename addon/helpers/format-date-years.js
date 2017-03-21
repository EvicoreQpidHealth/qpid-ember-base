import Ember from 'ember';
import moment from 'moment';

export default Ember.Helper.helper(function([value]) {
  if (value) {
    return -moment({
      y: value.year,
      M: value.monthOfYear,
      d: value.dayOfMonth
    }).diff(moment(), 'years');
  } else {
    return '?';
  }
});
