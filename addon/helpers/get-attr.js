import Ember from 'ember';

export default Ember.Helper.helper(function([leftSide, rightSide]) {
  if (rightSide) {
    if (leftSide.get && leftSide.get(rightSide)) {
      return leftSide.get(rightSide);
    } else {
      return leftSide[rightSide];
    }
  } else {
    return leftSide;
  }
});