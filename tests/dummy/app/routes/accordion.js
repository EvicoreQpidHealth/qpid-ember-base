import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      activeSection: 'item2'
    };
  }
});
