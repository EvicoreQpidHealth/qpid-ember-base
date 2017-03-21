import Ember from 'ember';
import layout from '../templates/components/radio-button-list';

export default Ember.Component.extend({
  layout,

  actions: {
    selectRadio(option) {
      this.attrs.selectRadio(option);
    }
  }
});
