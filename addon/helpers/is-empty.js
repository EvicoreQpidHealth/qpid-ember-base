import Ember from 'ember';

export default Ember.Helper.helper(function([leftSide]) {
  return Ember.isEmpty(leftSide);
});
