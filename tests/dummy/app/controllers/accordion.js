import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    activateAccordionSection(section) {
      this.set('model.activeSection', section.get('id'));
      // apps would call resize logic here if needed
    }
  }
});
