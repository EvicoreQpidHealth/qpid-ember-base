import Ember from 'ember';
import isVisible from '../mixins/is-visible';
import layout from '../templates/components/simple-infinite-scroll';

export default Ember.Component.extend(isVisible, {
  layout,

  enteredViewport() {
    this.sendAction('onEnter');
  },

  exitedViewport() {
    this.sendAction('onExit');
  },

  isVisible() {
    this.sendAction('onVisible');
  }
});
