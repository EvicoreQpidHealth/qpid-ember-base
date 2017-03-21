import Ember from 'ember';
import layout from '../templates/components/checkbox-group';

export default Ember.Component.extend({
  layout,
  tagName: 'ul',
  asRadio: false, // pretend to be a radio group
  options: null,

  actions: {
    toggle(option) {
      if (this.get('asRadio')) {
        this.get('options').without(option).setEach('value', false);
        Ember.set(option, 'value', true);
      } else {
        Ember.set(option, 'value', !option.value);
      }
    }
  }
});
