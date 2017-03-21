import Ember from 'ember';
import layout from '../templates/components/ember-select';

export default Ember.Component.extend({
  layout,
  content: null,
  selectedValue: null,

  didInitAttrs(/*attrs*/) {
    this._super(...arguments);
    let content = this.get('content');
    if (!content) {
      this.set('content', Ember.A([]));
    }
  },

  contentChange: Ember.on('init', Ember.observer('content', function() {
    if (this.get('content.length') > 0 && !this.get('selectedValue')) {
      this.set('selectedValue', this.get('content').objectAt(0));
      this.sendAction('change', this.get('selectedValue'));
    }
  })),

  actions: {
    change() {
      const [selectedEl] = this.$('select').toArray();
      const { selectedIndex } = selectedEl;
      const content = this.get('content');
      const selectedValue = content.objectAt(selectedIndex);
      this.set('selectedValue', selectedValue);
      this.sendAction('change', selectedValue);
    }
  }
});
