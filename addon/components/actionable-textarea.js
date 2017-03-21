import Ember from 'ember';
import layout from '../templates/components/actionable-textarea';

export default Ember.Component.extend({
  layout,

  actions: {
    taButtonClick(buttonParam) {
      this.sendAction('taButtonClick', buttonParam);
    },

    taFocusOut() {
      this.sendAction('taFocusOut');
    }
  }
});
