import Ember from 'ember';
import layout from '../templates/components/toggle-button';

export default Ember.Component.extend({
  layout,
  tagName: 'button',
  classNameBindings: ['valueIsFalse:outline-only', 'size'],
  attributeBindings: ['title'],
  valueIsFalse: Ember.computed('value', function() {
    return this.get('value') === null || this.get('value') === false;
  }),
  click() {
    if (this.get('valueIsFalse')) {
      this.set('value', true);
    } else {
      this.set('value', false);
    }
    if (this.attrs.change) {
      this.attrs.change();
    }
  }
});
