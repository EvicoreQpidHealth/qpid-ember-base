import Ember from 'ember';

export default Ember.Helper.helper(function([action, delay]) {
  if (!delay && delay !== 0) {
    delay = 1000;
  }
  return () => {
    return Ember.run.debounce(this, action, delay);
  };
});
