import Ember from 'ember';
import refreshLogic from '../utils/resize';
import layout from '../templates/components/input-dropdown';

export default Ember.Component.extend({
  layout,

  foundation: Ember.inject.service('foundationService'),

  didInsertElement() {
    Ember.$(`#input-${this.elementId}`).click(this.refresh);
    Ember.$(`#input-${this.elementId}`).keyup(() => {
      // TODO: Should be scheduled in the run loop
      // TODO: Ember.$() --> this.$()
      let txt = Ember.$(`#input-${this.elementId}`).val();
      this.set('value', txt);
      this.sendAction('valueChanged', txt);
    });
    this.get('foundation').reflow('dropdown');
  },

  refresh() {
    Ember.run.scheduleOnce('afterRender', this, refreshLogic);
  },

  state: Ember.observer('isOpen', function() {
    if (this.get('isOpen')) {
      // TODO: should be this.$() unless the element in question is not
      // within this component (which would be an encapsulation concern)
      if (!Ember.$(`#drop-${this.elementId}`).hasClass('open')) {
        Ember.$(`#input-${this.elementId}`).trigger('click');
      }
    } else {
      // TODO: should be this.$() unless the element in question is not
      // within this component (which would be an encapsulation concern)
      if (Ember.$(`#drop-${this.elementId}`).hasClass('open')) {
        Ember.$(`#input-${this.elementId}`).trigger('click');
      }
    }
  })
});
