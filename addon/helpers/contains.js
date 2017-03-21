import Ember from 'ember';

export default Ember.Helper.helper(function([leftSide, rightSide]) {
  return Ember.$.inArray(rightSide, leftSide) !== -1 || leftSide.includes(rightSide);
});
