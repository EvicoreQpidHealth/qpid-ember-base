import Ember from 'ember';

// Add a warning to the Ember.computed.mapBy function
export function initialize() {
  let mapFunction = Ember.computed.mapBy;

  Ember.computed.mapBy = function(...args) {
    if (parseInt(Ember.VERSION) < 2) {
      Ember.warn(`"Ember.computed.mapBy" does not always work as expected in this version of ember, write your own computed property instead. Property: "${args[0]}`);
    }
    return mapFunction(...args);
  };
}

export default {
  name: 'custom-warnings',
  initialize
};
