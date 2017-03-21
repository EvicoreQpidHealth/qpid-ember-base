import Ember from 'ember';
import layout from '../templates/components/q-hoverable';

export default Ember.Component.extend({
  layout,
  disabled: false,

  click() {
    this.sendAction();
  },

  mouseEnter() {
    if (!this.get('disabled')) {
      this.sendAction('hoverOver', this.$());
    }
  },

  mouseLeave() {
    if (!this.get('disabled')) {
      this.sendAction('hoverOff', this.$());
    }
  }
});
