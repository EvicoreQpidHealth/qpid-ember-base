import Ember from 'ember';
import layout from '../templates/components/checkbox-group-dropdown';

export default Ember.Component.extend({
  layout,
  options: null,
  selectedOptions: Ember.computed.filterBy('options', 'value', true),
  selectedNames: Ember.computed('selectedOptions.[]', function() {
    return this.get('selectedOptions').map((option) => option.key);
  })
});
