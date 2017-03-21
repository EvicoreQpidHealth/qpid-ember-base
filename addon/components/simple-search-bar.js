import Ember from 'ember';
import layout from '../templates/components/simple-search-bar';

export default Ember.Component.extend({
  layout,

  showClearButton: Ember.computed.gt('value.length', 0)
});
