import Ember from 'ember';

export default Ember.Helper.helper(function([params]) {
  return params.charAt(0).toUpperCase() + params.slice(1);
});
