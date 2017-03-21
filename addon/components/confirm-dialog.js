import Ember from 'ember';
import layout from '../templates/components/confirm-dialog';

export default Ember.Component.extend({
  layout,

  preventBubbling: false,
  title: 'Confirm',
  bubblesText: Ember.computed('preventBubbling', function() {
    return this.get('preventBubbling') ? 'bubbles=false' : '';
  }),
  bubblingActionText: Ember.computed('preventBubbling', function() {
    return this.get('preventBubbling') ? '{{action \'noAction\' bubbles=false}}' : '';
  }),

  actions: {
    noAction() {
      return false;
    },
    closeModal() {
      this.sendAction('onConfirmNo');
    },
    onConfirmNo() {
      this.sendAction('onConfirmNo');
    },
    onConfirmYes() {
      this.sendAction('onConfirmYes');
    }
  }
});
