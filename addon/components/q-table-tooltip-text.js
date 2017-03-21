import Ember from 'ember';
import layout from '../templates/components/q-table-tooltip-text';

export default Ember.Component.extend({
  layout,

  displayText: Ember.computed('this.data', function() {
    let { property, limit } = this.additionalParams;
    let name = this.data.get(property);
    let isTooLong = name.length > limit;
    if (isTooLong) {
      name = name.substring(0, limit - 1);
      name = name.substring(0, name.lastIndexOf(' '));
    }
    return isTooLong ? `${name}...` : name;
  }),

  tooltipText: Ember.computed('this.data', function() {
    return this.data.get(this.additionalParams.property);
  })
});