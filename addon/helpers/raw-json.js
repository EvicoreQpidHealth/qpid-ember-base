import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
    return JSON.stringify(params[0]);
  }
);
