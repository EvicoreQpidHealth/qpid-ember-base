import Ember from 'ember';
import layout from '../templates/components/modal-dialog';
import KEYCODES from '../utils/keycodes';

export default Ember.Component.extend({
  layout,

  showCloseBtn: true,

  _closeModal() {
    if (this.getAttr('on-close')) {
      this.attrs['on-close']();
    }
  },

  _closeIfEscapeKey(e) {
    if (e.keyCode === KEYCODES.ESCAPE) {
      this._closeModal();
    }
  },

  didInsertElement() {
    $(document).on('keyup', Ember.$.proxy(this._closeIfEscapeKey, this));
    if (this.getAttr('on-reveal')) {
      this.attrs['on-reveal'](this);
    }
  },

  willDestroyElement() {
    $(document).off('keyup', Ember.$.proxy(this._closeIfEscapeKey, this));
  },

  actions: {
    closeModal() {
      this._closeModal();
    },
    noAction() {
      return false;
    }
  }
});
