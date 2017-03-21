import Ember from 'ember';

export default Ember.Helper.helper(function([leftSide, rightSide]) {
  return rightSide.indexOf(leftSide) > -1;
});
