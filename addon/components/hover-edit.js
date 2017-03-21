import Ember from 'ember';
import layout from '../templates/components/hover-edit';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'span',
  enabled: true,

  inputId: computed(function() {
    return `${this.elementId}-input`;
  }),

  actions: {
    startEditing() {
      if (this.get('enabled')) {
        this.set('originalValue', this.get('value'));
        this.set('editing', true);
        Ember.run.scheduleOnce('afterRender', this, function() {
          this.$(`#${this.get('inputId')}`).select();
        });
      }
    },
    stopEditing() {
      if (this.get('enabled')) {
        this.set('editing', false);
        this.sendAction('change', this.get('value'));
      }
    },
    cancelEditing() {
      this.set('editing', false);
      this.set('value', this.get('originalValue'));
    }
  }
});
